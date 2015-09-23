//Command-line address book program
var constructors = require('./library/constructors');
var menu = require('./library/menu-options');

var addressBook = new constructors.AddressBook();
menu.mainMenu(addressBook);