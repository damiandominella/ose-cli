// ------------------------------------------------------------------------
//                      e x t e r n a l   m o d u l e s
// ------------------------------------------------------------------------
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const _helper = require('../utils/helper');

// ------------------------------------------------------------------------
//                      d e f a u l t   j s o n   c o n f i g
// ------------------------------------------------------------------------
const DEFAULT_CONFIG = {
    routine: {
        type: 'service',
        session_timeout: 30000,
        max_instances: -1,
        max_concurrent: 5,
        interval_ms: 1000,
        run: []
    },
    options: {
        url: '',
        proxy: {
            enabled: false,
            protocol: 'ssl',
            ip: '',
            port: -1
        },
        browser: {
            name: 'none',
            capabilities: {
                is_headless: false,
                hide_toolbars: true,
                window_size: '800,600',
                window_position: '0,0'
            }
        }
    }
};

// ------------------------------------------------------------------------
//                      c o m m a n d   m o d u l e
// ------------------------------------------------------------------------
const _add = {

    // --------------------------------------------------------------------
    //                  i n f o
    // --------------------------------------------------------------------
    $info: {
        name: 'add',
        description: 'Add a new microservice (module) to the current OSE project',
    },

    // --------------------------------------------------------------------
    //                  m e t h o d s
    // --------------------------------------------------------------------

    // ask questions to user
    getConfig: () => {
        const questions = [
            {
                name: 'name',
                type: 'input',
                message: 'Name of the module:',
                validate: (value) => {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a valid module name.';
                    }
                }
            },
            {
                name: 'enabled',
                type: 'confirm',
                message: 'Enabled:',
                default: true,
            },
            {
                name: 'version',
                type: 'input',
                message: 'Version:',
                default: '1.0.0'
            },
            {
                name: 'log_level',
                type: 'list',
                message: 'Log level:',
                default: 'info',
                choices: ['info', 'debug', 'error']
            },
            {
                name: 'published',
                type: 'confirm',
                message: 'Published:',
                default: 'Y'
            },
            {
                name: 'routine.type',
                type: 'list',
                message: 'Module type:',
                default: 'service',
                choices: ['service, program']
            }
        ];

        return inquirer.prompt(questions);
    },

    // edit the main typescript file of the module 
    setupMainFile: async (file, name) => {
        const buffer = await fs.readFile(file, 'utf-8');
        await fs.writeFile(file, buffer.replace(/_MODULE_NAME_/g, name));
    },

    setupFolder: async (config) => {
        try {
            // create module folder
            await fs.mkdir('src/' + config.name, { recursive: true });

            // create the package.json based on prompted config and base config
            await fs.writeJSON(
                'src/' + config.name + '/package.json',
                { ...DEFAULT_CONFIG, ...config }, // merge objects
                { spaces: '\t' } // to indent json
            );

            // add the main typescript class to the module folder and setup it
            await fs.copy(path.join(__dirname, '../base/template/module.ts'), 'src/' + config.name + '/' + config.name + '.ts');
            await _add.setupMainFile('src/' + config.name + '/' + config.name + '.ts', config.name);

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    // --------------------------------------------------------------------
    //                  e x e c u t i o n
    // --------------------------------------------------------------------
    run: async () => {
        if (!(await _helper.isOSEProject())) {
            // display error
            console.log(
                chalk.red('\nOSE Project not found, you cannot generate modules in the current folder')
            );
            return false;
        }

        console.log('\nAdding a new module for the project ' + chalk.green.bold(path.basename(path.resolve())) + '\n')

        // manage input settings
        const config = await _add.getConfig();

        // setup folder structure 
        if (await _add.setupFolder(config)) {
            // display message
            console.log(chalk.green('\nModule ' + chalk.bold(config.name) + ' generated successfully!'));
            return true;
        }

        // display error
        console.log(
            chalk.red('\nModule ' + chalk.bold(config.name) + ' cannot be generated')
        );
        return false;
    },
};

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
module.exports = _add;