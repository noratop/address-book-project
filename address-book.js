//Command-line address book program
//var Promise = require('bluebird');
var inquirer = require("inquirer");
//var inquirerPromise = Promise.promisifyAll(inquirer);

var Table = require('cli-table');


function AddressBook(){}

function Entry(firstName,lastName,birthday,homeAddress,workAddress,otherAddress,homePhone,workPhone,otherPhone,homeEmail,workEmail,otherEmail) {
    this.name = firstName+' '+lastName;
    this.value = this;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.homeAddress = homeAddress;
    this.workAddress = workAddress;
    this.otherAddress = otherAddress;
    this.homePhone = homePhone;
    this.workPhone = workPhone
    this.otherPhone = otherPhone;
    this.homeEmail = homeEmail;
    this.workEmail = workEmail;
    this.otherEmail = otherEmail;
}

function Address(line1,line2,city,province,postalCode,country){
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.province = province;
    this.postalCode = postalCode;
    this.country = country;
}

function Phone(number,type){
    this.number = number;
    this.type = type;
}



function exit(aBook) {console.log(aBook);};

function searchEntry(aBook) {
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
        
        for (var entry in aBook){
            //console.log(entry);
            var searchScope = aBook[entry].firstName + aBook[entry].firstName + aBook[entry].homeEmail + aBook[entry].workEmail + aBook[entry].otherEmail;
            if (searchScope.search(nameToSearch) != -1) {
                foundEntries.push(aBook[entry]);
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
            if (typeof result.choice === 'object') displayEntry(aBook, result.choice);
        });
    });
}

function createOrEditEntry(abook, entry) {
    //console.log(abook);
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
        name: 'home',
        message: 'Do you want to enter a home address?'
    },
    {
        type: 'input',
        name: 'homeAddressLine1',
        message: 'Address line 1:',
        when: function(data){return data.home},
        default: function(){if(entry) return entry.homeAddress.line1},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homeAddressLine2',
        message: 'Address line 2:',
        when: function(data){return data.home},
        default: function(){if(entry) return entry.homeAddress.line2},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homeCity',
        message: 'City:',
        when: function(data){return data.home},
        default: function(){if(entry) return entry.homeAddress.city},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homeProvince',
        message: 'Province:',
        when: function(data){return data.home},
        default: function(){if(entry) return entry.homeAddress.province},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homePostalCode',
        message: 'Postal code:',
        when: function(data){return data.home},
        default: function(){if(entry) return entry.homeAddress.postalCode},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homeCountry',
        message: 'Country:',
        when: function(data){return data.home},
        default: function(){if(entry) return entry.homeAddress.country},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'work',
        message: 'Do you want to enter a work address?'
    },
    {
        type: 'input',
        name: 'workAddressLine1',
        message: 'Address line 1:',
        when: function(data){return data.work},
        default: function(){if(entry) return entry.workAddress.line1},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workAddressLine2',
        message: 'Address line 2:',
        when: function(data){return data.work},
        default: function(){if(entry) return entry.workAddress.line2},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workCity',
        message: 'City:',
        when: function(data){return data.work},
        default: function(){if(entry) return entry.workAddress.city},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workProvince',
        message: 'Province:',
        when: function(data){return data.work},
        default: function(){if(entry) return entry.workAddress.province},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workPostalCode',
        message: 'Postal code:',
        when: function(data){return data.work},
        default: function(){if(entry) return entry.workAddress.postalCode},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workCountry',
        message: 'Country:',
        when: function(data){return data.work},
        default: function(){if(entry) return entry.workAddress.country},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'other',
        message: 'Do you want to enter another address?'
    },
    {
        type: 'input',
        name: 'otherAddressLine1',
        message: 'Address line 1:',
        when: function(data){return data.other},
        default: function(){if(entry) return entry.otherAddress.line1},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherAddressLine2',
        message: 'Address line 2:',
        when: function(data){return data.other},
        default: function(){if(entry) return entry.otherAddress.line2},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherCity',
        message: 'City:',
        when: function(data){return data.other},
        default: function(){if(entry) return entry.otherAddress.city},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherProvince',
        message: 'Province:',
        when: function(data){return data.other},
        default: function(){if(entry) return entry.otherAddress.province},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherPostalCode',
        message: 'Postal code:',
        when: function(data){return data.other},
        default: function(){if(entry) return entry.otherAddress.postalCode},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherCountry',
        message: 'Country:',
        when: function(data){return data.other},
        default: function(){if(entry) return entry.otherAddress.country},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'home',
        message: 'Do you want to enter home phone number?'
    },
    {
        type: 'input',
        name: 'homePhone',
        when: function(data){return data.home},
        default: function(){if(entry) return entry.homePhone.number},
        message: 'Phone number:'
    },
    {
        type: 'input',
        name: 'homePhoneType',
        when: function(data){return data.home},
        default: function(){if(entry) {return entry.homePhone.number;} else {return ['landline','cellular','fax']}},
        message: 'Phone type:'
    },
    {
        type: 'confirm',
        name: 'work',
        message: 'Do you want to enter work phone number?'
    },
    {
        type: 'input',
        name: 'workPhone',
        when: function(data){return data.work},
        default: function(){if(entry) return entry.workPhone.number},
        message: 'Phone number:'
    },
    {
        type: 'input',
        name: 'workPhoneType',
        when: function(data){return data.work},
        default: function(){if(entry) {return entry.workPhone.number;} else {return ['landline','cellular','fax']}},
        message: 'Phone type:'
    },
    {
        type: 'confirm',
        name: 'other',
        message: 'Do you want to enter another phone number?'
    },
    {
        type: 'input',
        name: 'otherPhone',
        when: function(data){return data.other},
        default: function(){if(entry) return entry.otherPhone.number},
        message: 'Phone number:'
    },
    {
        type: 'input',
        name: 'otherPhoneType',
        when: function(data){return data.other},
        default: function(){if(entry) {return entry.otherPhone.number;} else {return ['landline','cellular','fax']}},
        message: 'Phone type:'
    },
    {
        type: 'confirm',
        name: 'home',
        message: 'Do you want to enter a home email address?'
    },
    {
        type: 'input',
        name: 'homeEmail',
        when: function(data){return data.home},
        default: function(){if(entry) return entry.homeEmail},
        message: 'Email:'
    },
    {
        type: 'confirm',
        name: 'work',
        message: 'Do you want to enter a work email address?'
    },
    {
        type: 'input',
        name: 'workEmail',
        when: function(data){return data.work},
        default: function(){if(entry) return entry.workEmail},
        message: 'Email:'
    },
    {
        type: 'confirm',
        name: 'other',
        message: 'Do you want to enter another email address?'
    },
    {
        type: 'input',
        name: 'otherEmail',
        when: function(data){return data.other},
        default: function(){if(entry) return entry.otherEmail},
        message: 'Email:'
    }
    ],function(data){
        //console.log(data);
        if (entry) {
            for (var prop in data){
                entry[prop] = data[prop];
            }
        displayEntry(abook,entry);
        }
        else {
            console.log(data.home);
            var newEntry = new Entry(data.firstName,data.lastName,data.birthday,data.workEmail);
            var entryKey = data.firstName+data.lastName;
            addressBook[entryKey] = newEntry;
            displayEntry(abook, newEntry);
        }
    });
}

function displayEntry(abook, entry){
    //console.log(entry);

    //code that display the table for this entry
    var table = new Table();

    table.push({"First" : entry.firstName},{"Last" : entry.lastName});
    
    if (entry.birthday) table.push({"Birth" : entry.birthday});
    
    
// {"Email address" : entry.workEmail}
    

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
        result.choice(abook,entry);
    });
}


function deleteMenuEntry(abook, entry){
    delete abook[entry.firstName+entry.lastName];
    mainMenu();
}


//start the prompt to the user
function mainMenu(aBook){
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
        result.choice(aBook);
    });
}

var addressBook = new AddressBook();
mainMenu(addressBook);