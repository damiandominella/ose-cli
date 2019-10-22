// ------------------------------------------------------------------------
//                      e x t e r n a l   m o d u l e s
// ------------------------------------------------------------------------
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');

// ------------------------------------------------------------------------
//                      m o d u l e
// ------------------------------------------------------------------------
const _new = {

    getConfig: () => {
        const questions = [
            {
                name: 'projectName',
                type: 'input',
                message: 'Project name:',
                default: 'org_ose_project',
                validate: (value) => {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a valid project name.';
                    }
                }
            },
            {
                name: 'author',
                type: 'input',
                message: 'Author:',
                default: 'Botika',
                validate: (value) => {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a valid author.';
                    }
                }
            },
            {
                name: 'oseInstallPath',
                type: 'input',
                message: 'OSE install path (absolute path where the modules will be installed):',
                default: 'C:/ose/workspace/files/install/',
                validate: (value) => {
                    if (value.length) { // TODO: concrete validation
                        return true;
                    } else {
                        return 'Please enter a valid path.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },

    setupFolder: async (projectName) => {
        try {
            await fs.copy('base/project', projectName);
        } catch (err) {
            console.error(err);
        }
    },

    setConfig: async (config) => {
        const file = config.projectName + '/package.json';
        try {
            const package = await fs.readJson(file);

            package.name = config.projectName;
            package.author = config.author;
            package.oseInstallPath = config.oseInstallPath;
            
            await fs.writeJSON(file, package, {spaces: '\t'});
        } catch (err) {
            console.error(err);
        }
    },

    run: async () => {
        console.log('\nYou are generating a new OSE Project\n');

        // manage input settings
        const config = await _new.getConfig();

        // setup folder structure 
        await _new.setupFolder(config.projectName); // TODO: handle error

        // write configurations to files
        await _new.setConfig(config); // TODO: handle error

        // display message
        console.log(
            chalk.green('\nProject: ' + config.projectName + ' generated successfully!')
        );

        return true;
    },
};

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
module.exports = _new;