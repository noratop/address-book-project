module.exports = {
    AddressBook: AddressBook,
    Entry : Entry,
    Address : Address,
    Phone : Phone
}

function AddressBook(){}

function Entry(firstName,lastName,birthday,homeEmail,workEmail,otherEmail) {
    this.name = firstName+' '+lastName;
    this.value = this;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
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

