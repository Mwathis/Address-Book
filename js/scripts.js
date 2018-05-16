class Contact {
  constructor(firstName,lastName,phoneNumber) {
    this.firstName=firstName;
    this.lastName=lastName;
    this.phoneNumber=phoneNumber;
  }
  fullName(){
    return `${this.firstName} ${this.lastName}`;
  }
  reversedFullName(){
    return `${this.lastName} ${this.firstName}`;
  }
}

$(document).ready(function(){
  //Define empty array to hold contact objects
  var allContacts=[];

  function displayAllContacts(contacts) {
    $('ul#contacts')empty();

    contacts.sort(function(){
      return a["lastName"].codePointAt(0) -b["lastName"].codePointAt(0);
    });

    contacts.forEach(fuction(contact, index){
      $("ul#contacts").append(
        `<li
            title="Click to view details"
            class="contact"
            id=${index}>
            <span class="contact-list-item">${contact.reversedFullName()}</span>
            <span class="delete-contact" title="delete">&#120;</span>
        </li>`
      );
    });
  }

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
    displayAllContacts(allContacts);

    $(".contact-list-item").click(function(event){
      var id=event.target.id;
      var contact=allContacts[id];

      $("#contact-full-name").text(contact.fullName());
      $("#contact-phone-number").text(contact.phoneNumber);

    });
    $('.delete-contact').click(function(){
      if(confirm("Are you sure you want to delete this contact?")) {
        var id =$(this).parent().attr("id");

        allContacts.splice(id, 1);
        displayAllContacts(allContacts);
      }
    });
  });
});
