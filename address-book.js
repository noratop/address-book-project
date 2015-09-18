//Command-line address book program

var inquirer = require("inquirer");

//start the prompt to the user
inquirer.prompt([{
        type: 'list',
        name: 'mainMenu',
        message: 'What do you want to do?',
        choices: ['Create a new address book entry','Search for existing address book entries','Exit the program']
    }],function(mainMenuAnswer){
        
        //if answer to the main menu is 'Create a new address book entry'
        if (mainMenuAnswer.mainMenu === 'Create a new address book entry') {
           console.log(mainMenuAnswer);
        }

        //if answer to the main menu is 'Search for existing address book entries'
        if (mainMenuAnswer.mainMenu === 'Search for existing address book entries') {
           console.log(mainMenuAnswer);
        }
        
        //if answer to the main menu is Exit the program, nothing is done
});