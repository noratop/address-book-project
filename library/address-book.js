var inquirer = require("inquirer");
var Table = require('cli-table');

module.exports = {
    AddressBook : AddressBook
}
    
function AddressBook(){
    
}

AddressBook.prototype = {
    exit : exit,
    searchEntry : searchEntry,
    createOrEditEntry : createOrEditEntry,
    displayEntry : displayEntry,
    deleteMenuEntry: deleteMenuEntry,
    mainMenu : mainMenu
}

function exit() {console.log(this);}

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
        
        for (var entry in this){
            //console.log(entry);
            var searchScope = this[entry].firstName + this[entry].firstName + this[entry].homeEmail + this[entry].workEmail + this[entry].otherEmail;
            if (searchScope.search(nameToSearch) != -1) {
                foundEntries.push(this[entry]);
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
            if (typeof result.choice === 'object') this.displayEntry(result.choice);
        });
    });
}

function createOrEditEntry(entry) {
    //console.log(this);
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
        default: function(entry){if(entry) return entry.birthday},
        message: 'Birthday:'
    },
    {
        type: 'confirm',
        name: 'homeAdd',
        message: 'Do you want to enter/update a home address?',
    },
    {
        type: 'input',
        name: 'homeline1',
        message: 'Address line 1:',
        when: function(data){return data.homeAdd},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.line1}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homeline2',
        message: 'Address line 2:',
        when: function(data){return data.homeAdd},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.line2}},
    },
    {
        type: 'input',
        name: 'homecity',
        message: 'City:',
        when: function(data){return data.homeAdd},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.city}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homeprovince',
        message: 'Province:',
        when: function(data){return data.homeAdd},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.province}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homepostalCode',
        message: 'Postal code:',
        when: function(data){return data.homeAdd},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.postalCode}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'homecountry',
        message: 'Country:',
        when: function(data){return data.homeAdd},
        default: function(){if(entry) {if(entry.homeAddress) return entry.homeAddress.country}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'workAdd',
        message: 'Do you want to enter/update a work address?',
    },
    {
        type: 'input',
        name: 'workline1',
        message: 'Address line 1:',
        when: function(data){return data.workAdd},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.line1}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workline2',
        message: 'Address line 2:',
        when: function(data){return data.workAdd},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.line2}},
    },
    {
        type: 'input',
        name: 'workcity',
        message: 'City:',
        when: function(data){return data.workAdd},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.city}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workprovince',
        message: 'Province:',
        when: function(data){return data.workAdd},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.province}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workpostalCode',
        message: 'Postal code:',
        when: function(data){return data.workAdd},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.postalCode}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'workcountry',
        message: 'Country:',
        when: function(data){return data.workAdd},
        default: function(){if(entry) {if(entry.workAddress) return entry.workAddress.country}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'otherAdd',
        message: 'Do you want to enter/update another address?',
    },
    {
        type: 'input',
        name: 'otherline1',
        message: 'Address line 1:',
        when: function(data){return data.otherAdd},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.line1}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherline2',
        message: 'Address line 2:',
        when: function(data){return data.otherAdd},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.line2}},
    },
    {
        type: 'input',
        name: 'othercity',
        message: 'City:',
        when: function(data){return data.otherAdd},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.city}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherprovince',
        message: 'Province:',
        when: function(data){return data.otherAdd},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.province}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'otherpostalCode',
        message: 'Postal code:',
        when: function(data){return data.otherAdd},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.postalCode}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'othercountry',
        message: 'Country:',
        when: function(data){return data.otherAdd},
        default: function(){if(entry) {if(entry.otherAddress) return entry.otherAddress.country}},
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'homePh',
        message: 'Do you want to enter/update a home phone number?',
    },
    {
        type: 'input',
        name: 'homephone',
        when: function(data){return data.homePh},
        default: function(){if(entry) {if(entry.homePhone) return entry.homePhone.number}},
        message: 'Phone number:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'hometype',
        when: function(data){return data.homePh},
        default: function(){if(entry) {if(entry.homePhone) {return entry.homePhone.number;}} else {return ['landline','cellular','fax']}},
        message: 'Phone type:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'workPh',
        message: 'Do you want to enter/update a work phone number?',
    },
    {
        type: 'input',
        name: 'worknumber',
        when: function(data){return data.workPh},
        default: function(){if(entry) {if(entry.workPhone) return entry.workPhone.number}},
        message: 'Phone number:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'worktype',
        when: function(data){return data.workPh},
        default: function(){if(entry) {if(entry.workPhone) {return entry.workPhone.number;}} else {return ['landline','cellular','fax']}},
        message: 'Phone type:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'otherPh',
        message: 'Do you want to enter/update another phone number?'
    },
    {
        type: 'input',
        name: 'othernumber',
        when: function(data){return data.otherPh},
        default: function(){if(entry) {if(entry.otherPhone) return entry.otherPhone.number}},
        message: 'Phone number:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'input',
        name: 'othertype',
        when: function(data){return data.otherPh},
        default: function(){if(entry) {if(entry.otherPhone) {return entry.otherPhone.number;}} else {return ['landline','cellular','fax']}},
        message: 'Phone type:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'homeEm',
        message: 'Do you want to enter/update a home email address?',
    },
    {
        type: 'input',
        name: 'homeEmail',
        when: function(data){return data.homeEm},
        default: function(){if(entry) return entry.homeEmail},
        message: 'Email:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'workEm',
        message: 'Do you want to enter/update a work email address?',
    },
    {
        type: 'input',
        name: 'workEmail',
        when: function(data){return data.workEm},
        default: function(){if(entry) return entry.workEmail},
        message: 'Email:',
        validate: function(input){if(input) return true; else return 'Please enter a value';}
    },
    {
        type: 'confirm',
        name: 'otherEm',
        message: 'Do you want to enter/update another email address?',
    },
    {
        type: 'input',
        name: 'otherEmail',
        when: function(data){return data.otherEm},
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
                        if (data.homeAdd) entry[key][addKey] = data["home"+addKey];
                        if (data.workAdd) entry[key][addKey] = data["work"+addKey];
                        if (data.otherAdd)entry[key][addKey] = data["other"+addKey];
                    }
                }                
                if (entry[key] instanceof Phone) {
                    for (var addKey in entry[key]){
                        if (data.homePh) entry[key][addKey] = data["home"+addKey];
                        if (data.workPh) entry[key][addKey] = data["work"+addKey];
                        if (data.otherPh)entry[key][addKey] = data["other"+addKey];
                    }
                }
                else entry[key] = data[key];
            }
        this.displayEntry(entry);
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
                
            if (data.homeAdd) newEntry.homeAddress = new Address(data.homeline1,data.homeline2,data.homecity,data.homeprovince,data.homepostalCode,data.homecountry);
            if (data.workAdd) newEntry.workAddress = new Address(data.workline1,data.workline2,data.workcity,data.workprovince,data.workpostalCode,data.workcountry);
            if (data.otherAdd) newEntry.otherAddress = new Address(data.otherline1,data.otherline2,data.othercity,data.otherprovince,data.otherpostalCode,data.othercountry);
            if (data.homePh) newEntry.homePhone = new Phone(data.homenumber,data.hometype);
            if (data.workPh) newEntry.workPhone = new Phone(data.worknumber,data.worktype);
            if (data.otherPh) newEntry.otherPhone = new Phone(data.othernumber,data.othertype);
            
            console.log(newEntry);
            var abEntry = data.firstName+data.lastName;
            this[abEntry] = newEntry;
            this.displayEntry(newEntry);
        }
    });
}


function displayEntry(entry){
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
    table.push({"Addresses" : address});
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
        this.result.choice(entry);
    });
}



function deleteMenuEntry(entry){
    delete this[entry.firstName+entry.lastName];
    this.mainMenu();
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
            name: 'do',
            message: 'Main menu: choose an option',
            choices: [doCreateEntry,doSearchEntry,doExit]
        }
    ], function(result){
        this.result.do();
    });
}