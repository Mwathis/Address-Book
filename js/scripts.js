class Contact {
    constructor(firstName, lastName, phoneNumber) {
      this.firstName = firstName.toLowerCase();
      this.lastName = lastName.toLowerCase();
      this.phoneNumber = phoneNumber;
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    reversedFullName() {
        return `${this.lastName}, ${this.firstName}`;
    }
}

$(document).ready(function () {
    // Define empty array to hold contact objects
    var allContacts = [];
    function displayAllContacts(contacts) {
        $('ul#contacts').empty();

        contacts.sort(function (a, b) {
            return a["lastName"].codePointAt(0) - b["lastName"].codePointAt(0);
        });

        contacts.forEach(function (contact, index) {
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

    $('form#new-contact').submit(function (event) {
        event.preventDefault();
        // gets values from input fields
        var firstName = $("#first-name").val();
        var lastName = $("#last-name").val();
        var phoneNumber = $("#phone-number").val();

        // create new contact object
        var newContact = new Contact(firstName, lastName, phoneNumber);
        // Add new contact to allContacts array
        allContacts.push(newContact);
        // clear values from form input fields
        $(this).trigger("reset");
        // refresh the list of contacts on the page
        displayAllContacts(allContacts);

        // Listens for a click on a contact and display its details
        $(".contact-list-item").click(function (event) {
            // Get the id of the list item that was clicked
            var id = $(this).parent().attr("id");

            // Use the id to get the correct contact from the allContacts array
            var contact = allContacts[id];

            $("input#contact-id").val(id);

            // Set the details of the contact in the details section
            $("#contact-full-name").text(contact.fullName());
            $("#contact-phone-number").text(contact.phoneNumber);
            $("#contact-details").removeClass("hidden");

        });

        // Listens for a click on the delet button
        $('.delete-contact').click(function (event) {
            // Confirm that the user wants to delete the contact
            if (confirm("Are you sure you want to delete this contact?")) {
                // Get the id of the list item in the contact list
                var id = $(this).parent().attr("id");

                // Remove the correct contact from the allContacts array
                allContacts.splice(id, 1);
                // Refresh the contact list on the HTML page
                displayAllContacts(allContacts);
                $("#contact-details").addClass("hidden");
            }
        });
  });

    $("button#edit-contact-button").click(function(event) {
        var firstName = $("#contact-full-name").text().split(" ")[0];
        var lastName = $("#contact-full-name").text().split(" ")[1];
        var phoneNumber = $("#contact-phone-number").text();

        $("#edit-first-name").val(firstName);
        $("#edit-last-name").val(lastName);
        $("#edit-phone-number").val(phoneNumber);

        $("form#edit-contact-form").removeClass("hidden");
  });

    $("form#edit-contact-form").submit(function(event) {
        event.preventDefault();

        var id = $("input#contact-id").val();

        var contact = allContacts[id];

        contact.firstName = $("#edit-first-name").val();
        contact.lastName = $("#edit-last-name").val();
        contact.phoneNumber = $("#edit-phone-number").val();

        $("#contact-full-name").text(contact.fullName());
        $("#contact-phone-number").text(contact.phoneNumber);
        displayAllContacts(allContacts);
        $(this).addClass("hidden");
  });
});
