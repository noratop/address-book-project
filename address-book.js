//Command-line address book program
//var Promise = require('bluebird');
var inquirer = require("inquirer");
//var inquirerPromise = Promise.promisifyAll(inquirer);

var Table = require('cli-table');


function Entry(firstName,lastName,birthday,workEmail) {
    this.name = firstName+' '+lastName;
    this.value = this;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.workEmail = workEmail
}

var addressBook = {};


function exit() {console.log(addressBook);};

function searchEntry() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'nameToSearch',
        message: 'Enter the name you are looking for:'
    }
    ],function(nameToSearch){
    
        var foundEntries = [];
        
        // addressBook.forEach(function(elt){
        //     var searchScope = elt.firstName + elt.lastName;
        //     if (searchScope.search(nameToSearch) != -1) {
        //         foundEntries.push(elt);
        //     }
        // });
        
        for (var entry in addressBook){
            //console.log(entry);
            var searchScope = addressBook[entry].firstName + addressBook[entry].lastname + addressBook[entry].workEmail;
            if (searchScope.search(nameToSearch) != -1) {
                foundEntries.push(addressBook[entry]);
            }
        }
        
        var doAnotherSearch = {
        name : 'Go back and do another search',
        value : searchEntry
        };
        var doBackToMenu = {
        name : 'Go back to the main menu',
        value : mainMenu
        };
        
        var menuOptions = [new inquirer.Separator(), doAnotherSearch,doBackToMenu];
        var options = foundEntries.concat(menuOptions);
        //console.log(result);
        
        inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select the name you are looking for or choose another option',
            choices: options
        }
        ], function(result){
            if (typeof result.choice === 'function') result.choice();
            if (typeof result.choice === 'object') displayEntry(result.choice);
        });
    });
}

function createOrEditEntry(entry) {
    //console.log(entry);
    inquirer.prompt([
        {
        type: 'input',
        name: 'firstName',
        message: 'First Name:',
        default: function(){if(entry) return entry.firstName},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Last Name:',
        default: function(){if(entry) return entry.lastName},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'birthday',
        default: function(){if(entry) return entry.birthday},
        message: 'Birthday:'
    },
    {
        type: 'confirm',
        name: 'hasHome',
        message: 'Do you want to enter a home address?'
    },
    {
        type: 'input',
        name: 'workEmail',
        default: function(){if(entry) return entry.workEmail},
        message: 'Email:'
    },
    ],function(data){
        //console.log(data);
        if (entry) {
            for (var prop in data){
                entry[prop] = data[prop];
            }
        displayEntry(entry);
        }
        else {
            var newEntry = new Entry(data.firstName,data.lastName,data.birthday,data.workEmail);
            var entryKey = data.firstName+data.lastName;
            addressBook[entryKey] = newEntry;
            displayEntry(newEntry);
        }
    });
}

function displayEntry(entry){
    //console.log(entry);

    //code that display the table for this entry
    var table = new Table();

    table.push(
        {"First" : entry.firstName},
        {"Last" : entry.lastName},
        {"Birth" : entry.birthday},
        {"Email address" : entry.workEmail}
    );

    console.log(table.toString());

    var doEditEntry = {name : 'Edit the current entry', value : createOrEditEntry};
    var doDeleteEntry = {name : 'Delete the current entry',value : deleteMenuEntry};
    var doBacktoMainMenu = {name : 'Go back to the main menu',value : mainMenu};

    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'choose an option',
            choices: [doEditEntry,doDeleteEntry,doBacktoMainMenu]
        }
    ], function(result){
        result.choice(entry);
    });
}

function editEntry(entry){
}

function deleteMenuEntry(entry){
    delete addressBook[entry.firstName+entry.lastName];
    mainMenu();
}


//start the prompt to the user
function mainMenu(){
    //Main menu options
    var doCreateEntry = {name : 'Create a new address book entry', value : createOrEditEntry};
    var doSearchEntry = {name : 'Search for existing address book entries',value : searchEntry};
    var doExit = {name : 'Exit the program',value : exit};

    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Main menu: choose an option',
            choices: [doCreateEntry,doSearchEntry,doExit]
        }
    ], function(result){
        result.choice();
    });
}

mainMenu();