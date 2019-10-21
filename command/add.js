// ------------------------------------------------------------------------
//                      e x t e r n a l   m o d u l e s
// ------------------------------------------------------------------------
const fs = require('fs-extra');
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
                choices: [
                    { name: 'info' }, { name: 'debug' }, { name: 'error' }
                ]
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

    setupFolder: async (config) => {
        try {
            await fs.mkdir('src/' + config.name, { recursive: true });
            await fs.writeJSON(
                'src/' + config.name + '/package.json',
                { ...DEFAULT_CONFIG, ...config }, // merge objects
                { spaces: '\t' }
            );
            await fs.ensureFile('src/' + config.name + '/' + config.name + '.ts')

        } catch (err) {
            console.error(err);
        }
    },

    run: async () => {
        console.log('\nYou are creating a new module for the project: ' + process.cwd() + '\n');

        // Manage input settings
        const config = await _add.getConfig();

        // Setup folder structure 
        await _add.setupFolder(config);

        // Display message
        console.log(
            chalk.green('\nModule: ' + config.name + ' generated successfully!')
        );

        return true;
    },
};

// ------------------------------------------------------------------------
//                      e x p o r t s
// ------------------------------------------------------------------------
module.exports = _add;