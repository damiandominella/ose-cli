#!/usr/bin/env node

// ------------------------------------------------------------------------
//                      e x t e r n a l   m o d u l e s
// ------------------------------------------------------------------------
const fs = require('fs-extra');
const chalk = require('chalk');
const figlet = require('figlet');
const yargs = require('yargs');

// ------------------------------------------------------------------------
//                      c o m m a n d s
// ------------------------------------------------------------------------
const _new = require('./commands/new');
const _add = require('./commands/add');
const _deploy = require('./commands/deploy');

// ------------------------------------------------------------------------
//                      c o n s t s
// ------------------------------------------------------------------------
const package = fs.readJsonSync('package.json');
const CLI_NAME = 'OSE Modules CLI';

// ------------------------------------------------------------------------
//                      f u n c t i o n s
// ------------------------------------------------------------------------
const displayTitle = () => {
    console.log(chalk.yellow(figlet.textSync(CLI_NAME, { horizontalLayout: 'full' })));
}

// default output when no options
const displayInfo = () => {
    displayTitle();
    console.log('Name: ' + chalk.bold(package.name));
    console.log('Version: ' + package.version);
    console.log('Description: ' + package.description);
    console.log('Repository: ' + chalk.underline(package.repository.url));

    console.log('\nPlease see --help for usage.');
}

const run = async (command) => {
    switch (command) {
        case _new.$info.name: {
            await _new.run();
        } break;
        case _add.$info.name: {
            await _add.run();
        } break;
        case _deploy.$info.name: {
            await _deploy.run();
        } break;
        default: {
            console.log(chalk.red('Command ' + command + ' not found'));
            console.log('Please see --help for usage.');
        } break;
    }
};

// ------------------------------------------------------------------------
//                      u s e r   i n t e r f a c e
// ------------------------------------------------------------------------
const argv = yargs
    .locale('en')

    .usage('Usage: $0 <command> | [options]')

    // commands
    .command(_new.$info.name, _new.$info.description)
    .command(_add.$info.name, _add.$info.description)
    .command(_deploy.$info.name, _deploy.$info.description)

    // aliases for options
    .alias('h', 'help')
    .alias('v', 'version')
    .argv;

const command = argv._[0];

if (command) {
    run(command);
} else {
    // if no arguments 
    if (Object.keys(argv).length === 2) {
        displayInfo();
    }
}