// ------------------------------------------------------------------------
//                      e x t e r n a l   m o d u l e s
// ------------------------------------------------------------------------
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

// ------------------------------------------------------------------------
//                      d e f a u l t   m o d u l e   c o n f i g
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
//                      m o d u l e
// ------------------------------------------------------------------------
const _add = {
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
        ];

        return inquirer.prompt(questions);
    },

    setupMainFile: async (file, name) => {
        const buffer = await fs.readFile(file, 'utf-8');
        await fs.writeFile(file, buffer.replace(/_MODULE_NAME_/g, name));
    },

    setupFolder: async (config) => {
        try {
            await fs.mkdir('src/' + config.name, { recursive: true });
            await fs.writeJSON(
                'src/' + config.name + '/package.json',
                { ...DEFAULT_CONFIG, ...config }, // merge objects
                { spaces: '\t' }
            );
            await fs.copy(path.join(__dirname, '../base/template/module.ts'), 'src/' + config.name + '/' + config.name + '.ts');
            await _add.setupMainFile('src/' + config.name + '/' + config.name + '.ts', config.name);

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    run: async () => {
        console.log('\nYou are creating a new module for the project: ' + process.cwd() + '\n');

        // manage input settings
        const config = await _add.getConfig();

        // setup folder structure 
        if (await _add.setupFolder(config)) {
            // display message
            console.log(
                chalk.green('\nModule: ' + config.name + ' generated successfully!')
            );
            return true;
        }

         // display error
         console.log(
            chalk.green('\nModule: ' + config.name + ' cannot be generated')
        );
        return false;
    },
};

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
module.exports = _add;