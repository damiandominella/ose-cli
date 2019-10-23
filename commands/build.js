// ------------------------------------------------------------------------
//                      e x t e r n a l   m o d u l e s
// ------------------------------------------------------------------------
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const exec = require('child_process').exec;

const _helper = require('./../utils/helper');

// ------------------------------------------------------------------------
//                      c o m m a n d   m o d u l e
// ------------------------------------------------------------------------
const _build = {

    // --------------------------------------------------------------------
    //                  i n f o
    // --------------------------------------------------------------------
    $info: {
        name: 'build',
        description: 'Build typescript modules with webpack and get ready to deploy',
    },

    // --------------------------------------------------------------------
    //                  m e t h o d s
    // --------------------------------------------------------------------

    // read list of modules from the src/ directory
    getModules: async () => {
        try {
            const files = await fs.readdir('src', { withFileTypes: true });
            return files.filter((file) => file.isDirectory()).map((file) => file.name);
        } catch (err) {
            return null;
        }
    },

    // ask questions to user 
    getConfig: (modules) => {
        const questions = [
            {
                name: 'modules',
                type: 'checkbox',
                message: 'Select module(s) to build:',
                choices: modules
            }
        ];

        return inquirer.prompt(questions);
    },

    // compile module using webpack
    compile: (module) => {
        return new Promise((resolve, reject) => {
            console.log('\nBuilding module ' + chalk.green.bold(module) + ', please wait...');

            fs.pathExists('node_modules/webpack', (err, exists) => {
                if (err || !exists) {
                    reject('webpack not found, did you forget to run `npm install`?');
                } else {
                    let command = 'npm run build ' + module;
                    // let command = 'node_modules/.bin/webpack --config webpack.prod.js --module ' + module;
                    exec(command, (err, stdout, stderr) => {
                        if (err) {
                            console.log(err, stderr);
                            reject(module + ': build failed');
                        } else {
                            console.log(stdout);
                            console.log(chalk.green(chalk.bold(module) + ': build completed'));
                            resolve();
                        }
                    });
                }
            });
        });
    },

    // --------------------------------------------------------------------
    //                  e x e c u t i o n
    // --------------------------------------------------------------------
    run: async () => {
        if (!(await _helper.isOSEProject())) {
            // display error
            console.log(
                chalk.red('\nOSE Project not found, you cannot build modules from the current folder')
            );
            return false;
        }

        // check for deployable modules
        const modules = await _build.getModules();

        if (!modules || !modules.length) {
            // display error message
            console.log(chalk.red('\nNo modules found. To create modules plase see `ose add`'));
            return false;
        }

        // manage input settings
        console.log('\n');
        const config = await _build.getConfig(modules);

        if (!config.modules || !config.modules.length) {
            // display warn message
            console.log(chalk.yellow('\nNo modules selected to deploy'));
            return true;
        }

        // build modules (exec promises in sequence)
        let errors = [];
        config.modules.reduce((p, module) => {
            return p
                .then(() => _build.compile(module))
                .catch((err) => {
                    errors.push(err);
                })
        }, Promise.resolve()).finally(() => {
            if (errors.length > 0) {
                console.log('\n' + chalk.red(errors.join('\n')));
                return false;
            } else {
                console.log(chalk.green('\nAll modules builded successfully!'));
            }

            return true;
        });
    },
};

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
module.exports = _build;