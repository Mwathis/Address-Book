class Contact {
  constructor(firstName,lastName,phoneNumber) {
    this.firstName=firstName;
    this.lastName=lastName;
    this.phoneNumber=phoneNumber;
  }
}

$(document).ready(function(){
  //Define empty array to hold contact objects
  var allContacts=[];

  $("form#new-contact").submit(function(event){
    event.preventDefault();
    // gets values from input fields
    var firstName=$("#first-name").val();
    var lastName=$("#last-name").val();
    var phoneNumber=$("#phone-number").val();

    // create new contact object
    var newContact=new Contact(firstName,lastName,phoneNumber);
    // Add new contact to allContacts array
    allContacts.push(newContact);
    // clear values from form input fields
    //document.getElementById("new-contact").reset();
    $(this).trigger("reset");
    $("ul#contacts").append("<li>" +newContact.lastName+ "," +newContact.firstName+"</li>");
  });
});
