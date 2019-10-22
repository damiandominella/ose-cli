// ------------------------------------------------------------------------
//                      e x t e r n a l   m o d u l e s
// ------------------------------------------------------------------------
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const zip = require('zip-a-folder');

// ------------------------------------------------------------------------
//                      m o d u l e
// ------------------------------------------------------------------------
const _deploy = {

    getDeployableModules: async () => {
        try {
            return await fs.readdir('dist');
        } catch (err) {
            return null;
        }
    },

    getConfig: (modules) => {
        const questions = [
            {
                name: 'modules',
                type: 'checkbox',
                message: 'Select module(s) to deploy:',
                choices: modules
            }
        ];

        return inquirer.prompt(questions);
    },

    execute: (module) => {
        return new Promise((resolve, reject) => {
            let moduleZip = module + '.zip';
            zip.zipFolder('dist/' + module, moduleZip, (err) => {
                if (err) {
                    console.log(err);
                    reject('Error during ' + moduleZip + ' generation');
                }

                const OSE_INSTALL_PATH = JSON.parse(fs.readFileSync('package.json')).oseInstallPath;
                
                fs.copy(moduleZip, OSE_INSTALL_PATH + moduleZip, (err) => {
                    if (err) {
                        console.log(err);
                        reject('Error during copy ' + moduleZip);
                    }
                    fs.unlink(moduleZip, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(chalk.green('Module ' + module + ' deployed successfully!'));
                        resolve();
                    });
                });
            });
        });
    },

    run: async () => {
        console.log('\nYou are deploying a new module for the project: ' + process.cwd() + '\n');

        // check for deployable modules
        const modules = await _deploy.getDeployableModules();

        if (!modules || !modules.length) {
            // display error message
            console.log(chalk.red('No deployable modules! You have to build your modules before (Please see: `npm run build _module_`'));
            return false;
        }

        // manage input settings
        const config = await _deploy.getConfig(modules);

        if (!config.modules || !config.modules.length) {
            // display warn message
            console.log(chalk.yellow('\nNo modules selected to deploy'));
            return true;
        }

        // deploy modules
        config.modules.reduce((p, module) => {
            return p.then(() => _deploy.execute(module));
        }, Promise.resolve());

        return true;
    }
};

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
module.exports = _deploy;