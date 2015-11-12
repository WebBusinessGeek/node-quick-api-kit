#Getting Started

1. Install the packages

    npm install

2. Use gulp to setup the project

    node_modules/.bin/gulp setup

3. Add the secret variables to the private project files.
    * In databaseSecrets.js...

    exports.databaseUri = "your uri should go here";

    * In appSecrets.js...

    exports.databaseUri = "your uri should go here";

4. Run tests
    npm test
