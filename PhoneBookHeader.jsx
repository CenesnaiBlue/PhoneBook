import React, { useState, useEffect } from "react";
import PhoneBookHeaderForm from "./PhoneBookHeaderForm.jsx";
import "./CSS/phone_book_header.css";
import searchIcon from "./images/search_icon.png";

const PhoneBookHeader = props => {
  const contacts = props.contacts;
  const [showForm, setShowForm] = useState(false); // --- initial state of header input form
  const [showSearchBox, setShowSearchBox] = useState(false); // --- initial state of header search box
  const [searchString, setSearchString] = useState(""); // --- initial state of string that will contain serach string

  // --- sending searching string to APP componente to resolve serach results

  const sendSearchString = event => {
    if (
      (event.code === "Enter" || event.code === "NumpadEnter") &&
      searchString !== ""
    ) {
      props.searchContacts(searchString);
    }
  };

  // --- change state of serach box depending on click o search icon

  const openSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  return (
    <>
      <section className="phone_book_header_section">
        <div className="phone_book_header_container">
          <button
            type="button"
            className="phone_book_header_add_entry"
            onClick={() => setShowForm(!showForm)}
          >
            {!showForm ? "Show " : "Hide "} -> Add New Entry
          </button>
          {showForm && (
            <PhoneBookHeaderForm
              contacts={contacts}
              addNewPhoneContact={(e, firstName, secondName, phoneNumber) =>
                props.addNewPhoneContact(e, firstName, secondName, phoneNumber)
              }
              testFunction={props.testFunction}
            />
          )}
          <div className="search">
            <span onClick={() => openSearchBox()}>SEARCH</span>
            {showSearchBox && (
              <input
                type="text"
                name="search input field"
                className="search_input_field"
                value={searchString}
                onKeyDown={e => sendSearchString(e)}
                onChange={e => setSearchString(e.target.value)}
              />
            )}
            <img
              onClick={searchString => openSearchBox(searchString)}
              className="icon_image"
              src={searchIcon}
              alt="search icon"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PhoneBookHeader;
