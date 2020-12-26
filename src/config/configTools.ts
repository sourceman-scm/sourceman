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

namespace Compiler {
    export function tokenize(config: string) {
        // FIXME: gets stuck on newlines
        let cur = 0;
        let tokens: { type: string; value?: any }[] = [];
        while (config[cur]) {
            let char = config[cur];

            if (/\w/g.test(char) && !(config[cur + 1] !== ' ' && char !== ' ')) {
                cur++;
            } else if (char === '[') {
                char = config[++cur]; // skip the opening token

                let body = '';

                while (char !== ']') {
                    body += char;

                    char = config[++cur];
                }

                // Skip the closing token
                cur++;

                // Append to the tokens list
                tokens.push({ type: 'ParentSelector', value: body });
            } else if (config[cur + 1] === ' ' && char === ' ') {
                char = config[(cur += 2)]; // skip the indents

                // skip extra indents
                while (char === ' ') {
                    cur++;
                }
                char = config[cur];

                // Read the names
                let varName = '';
                while (char !== '=') {
                    varName += char;

                    char = config[++cur];
                }
                // Skip the =
                char = config[++cur];

                // Read the value
                let val = '';
                while (char !== '\n') {
                    val += char;
                    char = config[++cur];
                }
            }
        }
    }
}

export function parse(config: string) {}
