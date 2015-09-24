//Command-line address book program
var constructors = require('./library/address-book');

var AddressBook = constructors.AddressBook;

var myAddressBook = new AddressBook();

myAddressBook.mainMenu();
