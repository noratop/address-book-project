//Command-line address book program

var inquirer = require("inquirer");

inquirer.prompt([{
        type: 'list',
        name: 'mainMenu',
        message: 'What do you want to do?',
        choices: ['Create a new address book entry','Search for existing address book entries','Exit the program']
    }],function(answers){
        console.log(answers);
});