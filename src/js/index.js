const form = document.getElementById("contact__form");
const nameInput = document.querySelector(".input-name");
const surnameInput = document.querySelector(".input-surname");
const emailInput = document.querySelector(".input-email");
const telephoneInput = document.querySelector(".input-telephone");
const contactsList = document.getElementById("contacts");



const loadContacts = () => {
  axios
    .get("http://localhost:3000/contacts")
    .then((response) => {
      contactsList.innerHTML = "";
      response.data.forEach((contact) => {
        const li = document.createElement("li");
        li.textContent = `${contact.name} ${contact.surname} - ${contact.email} - ${contact.telephone}`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft="10px";
        deleteButton.addEventListener("click", () => {
          deleteContact(contact.id);
        });
        li.appendChild(deleteButton);
        contactsList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error loading contacts:", error);
    });
};

const addContact = () => {
  const name = nameInput.value;
  const surname = surnameInput.value;
  const email = emailInput.value;
  const telephone = telephoneInput.value;

  axios
    .post("http://localhost:3000/contacts", {
      name,
      surname,
      email,
      telephone,
    })
    .then(() => {
      loadContacts();
      form.reset();
    })
    .catch((error) => {
      console.error("Error adding contact:", error);
    });
};

const deleteContact = (id) => {
  axios
    .delete(`http://localhost:3000/contacts/${id}`)
    .then(() => {
      loadContacts();
    })
    .catch((error) => {
      console.error("Error deleting contact:", error);
    });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addContact();
});

loadContacts();
