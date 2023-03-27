# Hangman Game

This is a Hangman Game application built using `React`.

## :scroll: Description

Hangman is a word recognition game where the player has to guess the secret word by suggesting letters and having a certain number of attempts. The game selects a random word from a predefined list and displays it as a row of empty boxes. If the player guesses a letter from the word, it replaces the corresponding empty box. Otherwise, the player loses experience and fills in part of the human figurine, starting with the head. In my version of the game, the man has 6 pieces that must be filled before you lose. The player wins if he succeeds in guessing all the letters of the word before exhausting all the attempts, and loses if he exhausts all the attempts before he guesses all the letters.

## :briefcase: Technologies used

- React
- TypeScript
- PHP
- HTML5
- SCSS

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

The build is minified and the file names include the hashes.
The app is ready to be deployed!

#### `npm run format`

Automatically formats files using prettier.

#### `npm run check-format`

Validates code formatting using prettier. Won't change any files. Prints out a list of files with bad formatting.

#### `npm run ts-lint`

Runs linting on TypeScript and JavaScript files.

#### `npm run ts-validate`

Performs type-checking on the TypeScript files. In combination with the `--noEmit` option the compiler will not generate JavaScript files.

#### `npm run validate`

The `validate` script runs the `npm-run-all` package with the `--parallel` flag to run the specified scripts in parallel, meaning that they will all be run at the same time and it will result in less validation processing time. The scripts being run in parallel are `check-format`, `ts-lint`, `ts-validate` and `cy:run`.

#### `npm run cy:open`

Opens a graphical user interface for testing web applications in a browser.

#### `npm run cy:run`

Runs Cypress tests to completion.By default, all tests run headlessly.
