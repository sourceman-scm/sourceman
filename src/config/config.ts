#!/usr/bin/env node
/*
 * Sourceman, the easiest way to manage software versioning!
 * Copyright (C) 2020  BadBoyHaloCat
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import inquirer from 'inquirer';
import { program } from 'commander';
import * as fs from 'fs/promises';
import * as os from 'os';
import chalk from 'chalk';
import './configTools';

export default function config(): void {
    program
        .command('config')
        .description('Manage Sourceman config')
        .action(async () => {
            // Check that ~/.sourcemanconfig exists
            const home = os.homedir();
            const config = await fs.readFile(`${home}/.sourcemanconfig`, 'utf8').catch((e) => {
                if (e.code === 'ENOENT') {
                    console.error(chalk.red('ERROR:'), `${home}/.sourcemanconfig is not present!`);
                    console.error(chalk.blue('HINT:'), `Try ${chalk.bgWhite.black('sourceman config init')}?`);
                    process.exit(1);
                } else {
                    console.error(chalk.red('ERROR:'), e);
                    process.exit(2);
                }
            });

            // Log
            console.log(config);
        })
        .command('init')
        .description('Initialize your .sourcemanconfig file')
        .action(async () => {
            // Check that ~/.sourcemanconfig doesn't exist
            const home = os.homedir();
            await fs.readFile(`${home}/.sourcemanconfig`).catch(async (e) => {
                if (e.code === 'ENOENT') {
                    // Safe to write to
                    await fs.writeFile(
                        `${home}/.sourcemanconfig`,
                        `# Sourceman Config
# Autogenerated by Sourceman.

# add your rules here...`
                    );
                    process.exit();
                } else {
                    console.error(chalk.red('ERROR:'), e);
                    process.exit(3);
                }
            });
            console.error(chalk.red('ERROR:'), `${home}/.sourcemanconfig exists!`);
            process.exit(4);
        });
}