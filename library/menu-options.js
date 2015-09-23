var inquirer = require("inquirer");
var Table = require('cli-table');
var constructors = require('./constructors');

var Entry = constructors.Entry;
var Address = constructors.Address;
var Phone = constructors.Phone;

module.exports = {
    mainMenu: mainMenu
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
        message: 'Do you want to enter/update a home address?',
    },
    {
        type: 'input',
        name: 'homeline1',
        message: 'Address line 1:',
        when: function(data){return data.home},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.line1}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homeline2',
        message: 'Address line 2:',
        when: function(data){return data.home},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.line2}},
    },
    {
        type: 'input',
        name: 'homecity',
        message: 'City:',
        when: function(data){return data.home},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.city}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homeprovince',
        message: 'Province:',
        when: function(data){return data.home},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.province}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homepostalCode',
        message: 'Postal code:',
        when: function(data){return data.home},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.postalCode}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homecountry',
        message: 'Country:',
        when: function(data){return data.home},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.country}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'work',
        message: 'Do you want to enter/update a work address?',
    },
    {
        type: 'input',
        name: 'workline1',
        message: 'Address line 1:',
        when: function(data){return data.work},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.line1}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workline2',
        message: 'Address line 2:',
        when: function(data){return data.work},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.line2}},
    },
    {
        type: 'input',
        name: 'workcity',
        message: 'City:',
        when: function(data){return data.work},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.city}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workprovince',
        message: 'Province:',
        when: function(data){return data.work},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.province}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workpostalCode',
        message: 'Postal code:',
        when: function(data){return data.work},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.postalCode}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workcountry',
        message: 'Country:',
        when: function(data){return data.work},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.country}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'other',
        message: 'Do you want to enter/update another address?',
    },
    {
        type: 'input',
        name: 'otherline1',
        message: 'Address line 1:',
        when: function(data){return data.other},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.line1}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherline2',
        message: 'Address line 2:',
        when: function(data){return data.other},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.line2}},
    },
    {
        type: 'input',
        name: 'othercity',
        message: 'City:',
        when: function(data){return data.other},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.city}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherprovince',
        message: 'Province:',
        when: function(data){return data.other},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.province}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherpostalCode',
        message: 'Postal code:',
        when: function(data){return data.other},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.postalCode}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'othercountry',
        message: 'Country:',
        when: function(data){return data.other},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.country}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'home',
        message: 'Do you want to enter a home phone number?',
    },
    {
        type: 'input',
        name: 'homephone',
        when: function(data){if(entry) {return !entry.homePhone;} else return data.home},
        default: function(){if(entry) {if(entry.homePhone) return entry.homePhone.number}},
        message: 'Phone number:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'hometype',
        when: function(data){if(entry) {return !entry.homePhone;} else return data.home},
        default: function(){if(entry) {if(entry.homePhone) {return entry.homePhone.number;}} else {return ['landline','cellular','fax']}},
        message: 'Phone type:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'work',
        message: 'Do you want to enter a work phone number?',
    },
    {
        type: 'input',
        name: 'worknumber',
        when: function(data){if(entry) {return !entry.workPhone;} else return data.work},
        default: function(){if(entry) {if(entry.workPhone) return entry.workPhone.number}},
        message: 'Phone number:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'worktype',
        when: function(data){if(entry) {return !entry.workPhone;} else return data.work},
        default: function(){if(entry) {if(entry.workPhone) {return entry.workPhone.number;}} else {return ['landline','cellular','fax']}},
        message: 'Phone type:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'other',
        message: 'Do you want to enter another phone number?'
    },
    {
        type: 'input',
        name: 'othernumber',
        when: function(data){if(entry) {return !entry.otherPhone;} else return data.other},
        default: function(){if(entry) {if(entry.otherPhone) return entry.otherPhone.number}},
        message: 'Phone number:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'othertype',
        when: function(data){if(entry) {return !entry.otherPhone;} else return data.other},
        default: function(){if(entry) {if(entry.otherPhone) {return entry.otherPhone.number;}} else {return ['landline','cellular','fax']}},
        message: 'Phone type:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'home',
        message: 'Do you want to enter a home email address?',
    },
    {
        type: 'input',
        name: 'homeEmail',
        when: function(data){if(entry) {return !entry.homeEmail;} else return data.home},
        default: function(){if(entry) return entry.homeEmail},
        message: 'Email:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'work',
        message: 'Do you want to enter a work email address?',
    },
    {
        type: 'input',
        name: 'workEmail',
        when: function(data){if(entry) {return !entry.workEmail;} else return data.work},
        default: function(){if(entry) return entry.workEmail},
        message: 'Email:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'other',
        message: 'Do you want to enter another email address?',
    },
    {
        type: 'input',
        name: 'otherEmail',
        when: function(data){if(entry) {return !entry.otherEmail;} else return data.other},
        default: function(){if(entry) return entry.otherEmail},
        message: 'Email:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    }
    ],function(data){
        //console.log(data);
        if (entry) {
            for (var key in data){
                if (entry[key] instanceof Address) {
                    for (var addKey in entry[key]){
                        if (data.home) entry[key][addKey] = data["home"+addKey];
                        if (data.work) entry[key][addKey] = data["work"+addKey];
                        if (data.other)entry[key][addKey] = data["other"+addKey];
                    }
                }                
                if (entry[key] instanceof Phone) {
                    for (var addKey in entry[key]){
                        if (data.home) entry[key][addKey] = data["home"+addKey];
                        if (data.work) entry[key][addKey] = data["work"+addKey];
                        if (data.other)entry[key][addKey] = data["other"+addKey];
                    }
                }
                else entry[key] = data[key];
            }
        displayEntry(abook,entry);
        }
        else {
            var newEntry = new Entry(
                data.firstName,
                data.lastName,
                data.birthday,
                data.homeEmail,
                data.workEmail,
                data.otherEmail
                );
                
            if (data.home) newEntry.homeAddress = new Address(data.homeline1,data.homeline2,data.homecity,data.homeprovince,data.homepostalCode,data.homecountry);
            if (data.work) newEntry.workAddress = new Address(data.workline1,data.workline2,data.workcity,data.workprovince,data.workpostalCode,data.workcountry);
            if (data.other) newEntry.otherAddress = new Address(data.otherline1,data.otherline2,data.othercity,data.otherprovince,data.otherpostalCode,data.othercountry);
            if (data.home) newEntry.homePhone = new Phone(data.homenumber,data.hometype);
            if (data.work) newEntry.workPhone = new Phone(data.worknumber,data.worktype);
            if (data.other) newEntry.otherPhone = new Phone(data.othernumber,data.othertype);
            
            //console.log(newEntry.homeAddress);
            var aBookKey = data.firstName+data.lastName;
            abook[aBookKey] = newEntry;
            displayEntry(abook, newEntry);
        }
    });
}

function displayEntry(abook, entry){
    //console.log(entry);

    //code that display the table for this entry
    var table = new Table();

    table.push({"First Name" : entry.firstName},{"Last Name" : entry.lastName});
    
    if (entry.birthday) table.push({"Birthday" : entry.birthday});
    
    var address;
    var phone;
    var email;
    if (entry.homeAddress) {
        address = entry.homeAddress.line1 + '/r' + entry.homeAddress.line2 + '/r' + entry.homeAddress.city + '/r' + 
        entry.homeAddress.province + '/r' + entry.homeAddress.postalCode + '/r' + entry.homeAddress.country + '/r';
    }
    if (entry.workAddress) {
        address = entry.homeAddress.line1 + '/r' + entry.homeAddress.line2 + '/r' + entry.homeAddress.city + '/r' + 
        entry.homeAddress.province + '/r' + entry.homeAddress.postalCode + '/r' + entry.homeAddress.country + '/r';
    }
    if (entry.otherAddress) {
        address = entry.homeAddress.line1 + '/r' + entry.homeAddress.line2 + '/r' + entry.homeAddress.city + '/r' + 
        entry.homeAddress.province + '/r' + entry.homeAddress.postalCode + '/r' + entry.homeAddress.country + '/r';
    }
    // table.push({"Addresses" : address};
    // if (entry.homePhone) table.push({"
    // if (entry.workPhone) table.push({"
    // if (entry.otherPhone) table.push({"
    // if (entry.homeEmail) table.push({"Home Email" : entry.homeEmail});
    // if (entry.workEmail) table.push({"Work Email" : entry.workEmail});
    // if (entry.otherEmail) table.push({"Other Email" : entry.homeEmail});


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
    mainMenu(abook);
}

