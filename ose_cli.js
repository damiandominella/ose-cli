#!/usr/bin/env node

// ------------------------------------------------------------------------
//                      e x t e r n a l   m o d u l e s
// ------------------------------------------------------------------------
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const _new = require('./command/new');
const _add = require('./command/add');

// ------------------------------------------------------------------------
//                      c o n s t
// ------------------------------------------------------------------------
const CLI_NAME = 'OSE CLI';

// ------------------------------------------------------------------------
//                      f u n c t i o n s
// ------------------------------------------------------------------------
const displayTitle = () => {
    console.log(
        chalk.yellow(
            figlet.textSync(CLI_NAME, { horizontalLayout: 'full' })
        )
    );
}

const run = async () => {
    const command = process.argv[2];
    switch (command) {
        case 'new': {
            displayTitle();
            _new.run();
        } break;
        case 'add': {
            _add.run();
        } break;
        default: {
            console.log(chalk.red('[ERROR] Command not found'));
        } break;
    }
};

// clear the console before everything
clear();

// start cli
run();