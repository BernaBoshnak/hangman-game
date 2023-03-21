# Hangman Game

This is a Hangman Game application built using `React`.

## :scroll: Description

Hangman is a word recognition game where the player has to guess the secret word by suggesting letters and having a certain number of attempts. The game selects a random word from a predefined list and displays it as a row of empty boxes. If the player guesses a letter from the word, it replaces the corresponding empty box. Otherwise, the player loses experience and fills in part of the human figurine, starting with the head. In my version of the game, the man has 6 pieces that must be filled before you lose. The player wins if he succeeds in guessing all the letters of the word before exhausting all the attempts, and loses if he exhausts all the attempts before he guesses all the letters.

## :briefcase: Technologies used

[![Technologies](https://skills.thijs.gg/icons?i=react,ts,php,html,scss)](https://skills.thijs.gg)

## :woman_juggling: Available Scripts

You need to have [NodeJS](https://nodejs.org/en/) installed to run the scripts. To install the dependencies, run `npm install` first.

#### `npm start`

Runs the app in the development mode on the local server.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Runs the application tests.

#### `npm run build`

Runs validate, builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

#### `npm run format`

Automatically formats files using prettier with the `--write` flag

#### `npm run check-format`

Validates code formatting using prettier. Won't change any files. Prints out a list of files with bad formatting.

#### `npm run ts-lint`

Validates all TypeScript files in the current directory and its subdirectories using the ESLint linting tool.

#### `npm run ts-validate`

Performs type-checking on the TypeScript files. In combination with the `--noEmit` option the compiler will not generate JavaScript files.

#### `npm run validate`

The `validate` script runs the `npm-run-all` package with the `--parallel` flag to run the specified scripts in parallel, meaning that they will all be run at the same time and it will result in less validation processing time. The scripts being run in parallel are `check-format`, `ts-lint`, `ts-validate` and `cy:run`.

#### `npm run cy:open`

Opens a graphical user interface for testing web applications in a browser.

#### `npm run cy:run`

Runs Cypress tests to completion.By default, all tests run headlessly.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
