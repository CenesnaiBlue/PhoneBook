import React, { useState, useEffect } from "react";
import PhoneBookHeader from "./PhoneBookHeader.jsx";
import PhoneBookList from "./PhoneBookList.jsx";
import PhoneBookEditEntry from "./PhoneBookEditEntry.jsx";
import PhoneBookNotes from "./PhoneBookNotes.jsx";
import PhoneBookSearchReport from "./PhoneBookSearchReport.jsx";
import "./CSS/phone_book_section.css";

let editableContact = {};
const urlContacts = "https://61c4ccddf1af4a0017d997da.mockapi.io/Contacts";
let passedSearchString;

const PhoneBook = () => {
  //--- STARTING HOOKS --- //

  const [showEditEntry, setShowEditEntry] = useState(false);
  const [showSearchReportDialog, setShowSearchReportDialog] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [noteText, setNoteText] = useState("some text to show!");
  const [notes, setNotes] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [addClass, setAddClass] = useState("");
  let [foundStrings, setFoundStrings] = useState([]);

  const getContacts = async () => {
    const response = await fetch(urlContacts);
    const contacts = await response.json();
    setContacts(contacts);
    contacts.map(contact => {
      Object.values(contact).map(objectValues => {
        if (objectValues.search("Tom") !== -1) {
          console.log(contact);
        }
      });
    });
  };

  // --- Use Effect --- //

  useEffect(() => {
    getContacts();
  }, []);

  // --- Delete Entry in Phone Book --- //

  const deleteEntry = async contactToDelete => {
    setContacts(
      contacts.filter(contact => {
        if (contact.id !== contactToDelete.id) {
          return contact;
        } else return 0;
      })
    );
    await fetch(
      "https://61c4ccddf1af4a0017d997da.mockapi.io/Contacts/" +
        contactToDelete.id,
      {
        method: "DELETE"
      }
    ).then(
      console.log(" Contact with ID = " + contactToDelete.id + " deleted")
    );
    setNoteText("Contact deleted");

    setIsDeleted(true);
    setNotes(true);
    setAddClass("phone_book_delete_note");
    setTimeout(() => {
      setNotes(false);
      setIsDeleted(true);
    }, 4900);
  };

  // --- Change entry in Phone Book --- //

  const changeEntry = async (
    e,
    id,
    editedFirstName,
    editedSecondName,
    editedPhoneNumber
  ) => {
    e.preventDefault();
    console.log(id, editedFirstName, editedSecondName, editedPhoneNumber);

    let editedEntry = {
      leadingLetter: editedFirstName.slice(0, 1),
      firstName: editedFirstName,
      secondName: editedSecondName,
      phoneNumber: editedPhoneNumber,
      id: id
    };
    contacts.map(contact => {
      if (contact.id === id) {
        contact.leadingLetter = editedFirstName.slice(0, 1);
        contact.firstName = editedFirstName;
        contact.secondName = editedSecondName;
        contact.phoneNumber = editedPhoneNumber;
        return contacts;
      } else return 0;
    });

    await fetch("https://61c4ccddf1af4a0017d997da.mockapi.io/Contacts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedEntry)
    })
      .then(response => response.json())
      .then(setContacts([...contacts]));

    setContacts([...contacts]);

    setShowEditEntry(false);
    setNoteText(editedFirstName);
    setAddClass("phone_book_changed_note");
    setIsChanged(true);
    setNotes(true);
    setTimeout(() => {
      setNotes(false);
      setIsChanged(false);
    }, 4900);
  };

  // --- Adding new Entry to Phone Book --- //

  const addNewPhoneContact = async (e, firstName, secondName, phoneNumber) => {
    e.preventDefault();

    if (firstName && secondName && phoneNumber) {
      let newContact = {
        leadingLetter: firstName.slice(0, 1),
        firstName,
        secondName,
        phoneNumber
      };
      setContacts([...contacts, newContact]);

      await fetch("https://61c4ccddf1af4a0017d997da.mockapi.io/Contacts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
      }).then(response => response.json());
      setNoteText(newContact.firstName);
      setIsAdded(true);
      setNotes(true);
      setAddClass("phone_book_added_note");
      setTimeout(() => {
        setNotes(false);
        setIsAdded(false);
      }, 4900);
    }
    getContacts();
  };

  // --- function SHOW/HIDE Edit Entry Form --- //

  const showEditEntryForm = (tau, singleContact) => {
    setShowEditEntry(tau);
    editableContact = singleContact;
  };

  // --- filtering OUT contacts by given search string --- //

  const searchContacts = searchString => {
    passedSearchString = searchString;
    foundStrings = [];

    contacts.map(contact => {
      const { leadingLetter, ...noLeadLetterContacts } = contact;

      let values = Object.values(noLeadLetterContacts);
      values.map(value => {
        if (value.search(searchString) !== -1) {
          setFoundStrings(foundStrings.push(noLeadLetterContacts));
        }
      });
    });

    foundStrings = [...new Set(foundStrings)];
    setFoundStrings(foundStrings);
    setShowSearchReportDialog(true);
  };

  // --- just closing the Serach Report dialog box --- //

  const closeSerachReport = () => {
    setShowSearchReportDialog(false);
  };

  // --- Rendering 5 componentes form this component --- //

  return (
    <>
      <section className="phone_book_section">
        <div className="phone_book_container">
          <PhoneBookHeader
            searchContacts={searchString => searchContacts(searchString)}
            contacts={contacts}
            addNewPhoneContact={addNewPhoneContact}
          />

          <PhoneBookList
            contacts={contacts}
            deleteEntry={deleteEntry}
            showEditEntryForm={showEditEntryForm}
          />

          {showEditEntry && (
            <PhoneBookEditEntry
              editableContact={editableContact}
              changeEntry={changeEntry}
            />
          )}

          {notes && (
            <PhoneBookNotes
              noteText={noteText}
              isAdded={isAdded}
              isChanged={isChanged}
              isDeleted={isDeleted}
              addClass={addClass}
            />
          )}

          {showSearchReportDialog && (
            <PhoneBookSearchReport
              foundStrings={foundStrings}
              passedSearchString={passedSearchString}
              closeSerachReport={closeSerachReport}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default PhoneBook;
