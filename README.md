#Getting Started

1. Install the packages

    `npm install`

2. Use gulp to setup the project

    `node_modules/.bin/gulp setup`

3. Add the secret variables to the private project files.
    * In the databaseSecrets.js file:

    `exports.databaseUri = "your uri should go here";`

    * In the appSecrets.js file:

    `exports.tokenSecret = "your jwt secret should go here";`

4. Run tests

    `npm test`
