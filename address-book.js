//Command-line address book program

var inquirer = require("inquirer");

//start the prompt to the user
function startProgram(){
    
    inquirer.prompt([{
        type: 'list',
        name: 'mainMenu',
        message: 'Main menu: choose an option',
        choices: ['Create a new address book entry','Search for existing address book entries','Exit the program']
    }],function(mainMenuAnswer){
        //console.log(mainMenuAnswer);
        
//Main menu: if answer to the main menu is 'Create a new address book entry'
        if (mainMenuAnswer.mainMenu === 'Create a new address book entry') {
            //console.log(mainMenuAnswer);
            
            inquirer.prompt([{
                    type: 'input',
                    name: 'firstName',
                    message: 'First Name',
                    validate: function(input){if(input) return true; else return 'Please enter a value';}
                }],function(newEntrydata){
                
                console.log(newEntrydata);
                //return to the main menu
                startProgram();
            });
        }

//Main menu: if answer to the main menu is 'Search for existing address book entries'
        if (mainMenuAnswer.mainMenu === 'Search for existing address book entries') {
            console.log(mainMenuAnswer);
            
            //return to the main menu
            startProgram();
        }
        
        //if answer to the main menu is Exit the program, nothing is done
})}

startProgram();