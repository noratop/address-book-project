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