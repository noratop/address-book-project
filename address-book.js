//Command-line address book program
var Promise = require('bluebird');
var inquirer = require("inquirer");
var inquirerPromise = Promise.promisifyAll(inquirer);
var Table = require('cli-table');

var addressBook = [];

function Entry(firstName,lastName,birthday) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
}

var me = new Entry('Nora','Top','2015/03/28');
console.log(typeof me);

function displayEntry(entry){
    //console.log(entry);

    //code that display the table for this entry
    var table = new Table();

    table.push(
        {"First" : entry.firstName},
        {"Last" : entry.lastName},
        {"Birth" : entry.birthday}
    );

    console.log(table.toString());


    //return to the main menu
    //startProgram();
}

displayEntry(me);
//start the prompt to the user
function startProgram(){
    
    inquirerPromise.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Main menu: choose an option',
            choices: ['Create a new address book entry','Search for existing address book entries','Exit the program']
        }
    ]).then(function(mainMenuAnswer){
        //console.log(mainMenuAnswer);
        
//Main menu: if answer to the main menu is 'Create a new address book entry'
            if (mainMenuAnswer.mainMenu === 'Create a new address book entry') {
            //console.log(mainMenuAnswer);
            
            inquirerPromise.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'First Name:',
                    validate: function(input){if(input) return true; else return 'Please enter a value';}
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Last Name:',
                    validate: function(input){if(input) return true; else return 'Please enter a value';}
                },
                {
                    type: 'input',
                    name: 'birthday',
                    message: 'Birthday:'
                },
                {
                    type: 'confirm',
                    name: 'hasHome',
                    message: 'Do you want to enter a home address?'
                }
            ]).then(function(newEntrydata){
                //console.log(newEntrydata);
                
                displayEntry(newEntrydata);
                //return to the main menu
            });
        }
    
    //Main menu: if answer to the main menu is 'Search for existing address book entries'
        if (mainMenuAnswer.mainMenu === 'Search for existing address book entries') {
            //console.log(mainMenuAnswer);
            inquirerPromise.prompt([
            {
                type: 'input',
                name: 'nameToSearch',
                message: 'Enter the name you are looking for:'
            }
            ]).then(function(nameToSearch){
            
                var result = [];
                addressBook.forEach(function(elt){
                    var foundEntries = [];
                    if (elt.firstName.search(nameToSearch) != -1 || elt.lastName.search(nameToSearch) != -1) {
                        foundEntries.push(elt);
                    }
                });
                
                return inquirerPromise.prompt(result);
            });
        }
        
//if answer to the main menu is Exit the program, nothing is done

    });
}

//startProgram();