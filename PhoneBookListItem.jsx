import React from "react";
import "./CSS/phone_book_list_item.css";

const PhoneBookListItem = props => {
  // --- just sorting received filtered Contacts (all starting with same letter)
  const filteredContacts = props.letterContactsList.sort();

  return (
    <>
      <div className="phone_book_list_item_container">
        <div className="phone_book_list_item_header">{props.letter}</div>
        <div className="phone_book_list_item_content">
          {filteredContacts.length !== 0 ? (
            filteredContacts.map((singleContact, index) => {
              return (
                <>
                  <div
                    id={
                      // making unique id for one single contact HTML element
                      singleContact.firstName +
                      singleContact.secondName +
                      singleContact.phoneNumber
                    }
                    className="one_entry"
                  >
                    <div className="entry_first_name">
                      {singleContact.firstName}
                    </div>
                    <div
                      className="entry_second_name"
                      data-sname={singleContact.secondName}
                    >
                      {singleContact.secondName}
                    </div>
                    <div
                      className="entry_phone_number"
                      data-phnumber={singleContact.phoneNumber}
                    >
                      {singleContact.phoneNumber}
                    </div>
                    <button
                      className="edit_entry"
                      onClick={() =>
                        props.showEditEntryForm(true, singleContact)
                      }
                    >
                      Edit Entry
                    </button>
                    <button
                      className="delete_entry"
                      onClick={() => props.deleteEntry(singleContact)}
                    >
                      Delete Entry
                    </button>
                  </div>
                </>
              );
            })
          ) : (
            <div className="phone_book_list_item_no_entry">
              No Contacts starting with this letter
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PhoneBookListItem;
