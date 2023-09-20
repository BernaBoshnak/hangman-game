# Hangman Game

This is a Hangman Game application built using `React`.

Demo [link](https://hangman-game-88c4d.web.app/)

## :scroll: Description

Hangman is a word recognition game where the player has to guess the secret word by suggesting letters and having a certain number of attempts. The game selects a random word from a predefined list and displays it as a row of empty boxes. If the player guesses a letter from the word, it replaces the corresponding empty box. Otherwise a part of the human body gets filled, starting with the head. In this version of the game, the man has 6 pieces. The player wins if they succeeds in guessing all the letters of the word before exhausting all the attempts, and loses if otherwise.

## :briefcase: Technologies used

- React
- TypeScript
- PHP
- HTML5
- SCSS (CSS modules)
- ESlint
- Cypress

## :pencil: Technical details

This web application, built with React, utilizes an external `API endpoint written in PHP` to generate a random word based on selected settings. The endpoint accepts the following query parameters:

- `minLength` - Specifies the minimum length of the word to generate.
- `maxLength` - Specifies the maximum length of the word to generate.
- `startsWith` - Specifies that the generated word must start with the provided string.
- `endsWith` - Specifies that the generated word must end with the provided string.
- `contains` - Specifies that the generated word must contain the provided string.

The API endpoint filters the list of English nouns based on the provided query parameters and returns a random word that matches the selected criteria. In case of an error, it will return an error message with status code 400. Additionally, the API can be used in other projects depending on the specific needs.
The API endpoint uses an `AbortController` to cancel any pending requests in case the user navigates away from the page or initiates a new request before the previous one has completed. This helps to prevent unnecessary network requests and improve the overall performance of the application.

In the project, `mixins` are used to maintain a responsive design, reduce code duplication, and make the code more efficient and easier to maintain in the future.
Additionally, the project supports `screen readers` for people with disabilities, ensuring equal access to information for all users, including those with visual or hearing impairments.
The project uses `Bootstrap` reboot module to provide normalization of CSS styles and better compatibility between different web browsers.
Additionally, the separation of styles into smaller and more maintainable files through `SCSS` makes the project more organized and manageable.

The `classnames` helper function is useful when working with React components because it provides an easy way to concatenate and match the classes of HTML elements in components. The function concatenates only those arguments that have the value true, putting a space between them, making the generated class list more precise and easier to understand.

In the added rules "react-hooks/rules-of-hooks" and "react-hooks/exhaustive-deps" use `exhaustive`, which ensures that all dependencies used in hooks are clearly declared for each component. This helps avoid potential bugs and unwanted side effects by ensuring that components are properly optimized and will function predictably.

Different environment variables are used for different stages of `development`, `testing`, and `production`, enhancing the flexibility and security of the application.

## :sparkles: Testing

The tests for this application are written using `Cypress`, a popular end-to-end testing framework for web applications. I chose Cypress because it can write both component and end-to-end tests, which allowes doing an in-depth application testing.

Component tests tests individual components of the application, ensuring that each component works as expected. End-to-end tests test the entire application by simulating user interactions, and ensuring that the application behaves as expected. Both types were used to ensure comprehensive testing of the application.

## :woman_juggling: Available Scripts

You need to have [NodeJS](https://nodejs.org/en/) installed to run the scripts. To install the dependencies, run `npm install` first.

#### `npm start`

Runs the app in the development mode on the local server.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Runs the application tests.

#### `npm run build`

Runs validation, builds the app for production to the `build` folder.
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
