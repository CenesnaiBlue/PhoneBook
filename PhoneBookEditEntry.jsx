import React, { useState } from "react";
import "./CSS/phone_book_edit_entry.css";

const PhoneBookEditEntry = props => {
  // --- starting variables

  let editableContact = props.editableContact;
  let id = editableContact.id;

  const [editFirstName, setEditFirstName] = useState(editableContact.firstName); // --- inital state of input filed for First name
  const [editSecondName, setEditSecondName] = useState(
    editableContact.secondName
  ); // --- inital state of input filed for Second name
  const [editPhoneNumber, setEditPhoneNumber] = useState(
    editableContact.phoneNumber
  ); // --- inital state of input filed for Phone Number

  return (
    <>
      <div className="screen_div">
        <div className="edit_entry_container">
          <div className="edit_entry_header">Edit Entry for...{}</div>
          <form type="submit">
            <input
              type="text"
              className="edit_entry_first_name"
              value={editFirstName}
              onChange={e => setEditFirstName(e.target.value)}
            />
            <input
              className="edit_entry_second_name"
              value={editSecondName}
              onChange={e => setEditSecondName(e.target.value)}
            />
            <input
              className="edit_entry_phone_number"
              value={editPhoneNumber}
              onChange={e => setEditPhoneNumber(e.target.value)}
            />
            <button
              className="send_edited_entry"
              onClick={e =>
                // --- function that will take changes and give to Phone Book component
                props.changeEntry(
                  e,
                  id,
                  editFirstName,
                  editSecondName,
                  editPhoneNumber
                )
              }
            >
              Change Entry
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PhoneBookEditEntry;
