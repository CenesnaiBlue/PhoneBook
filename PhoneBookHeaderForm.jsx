import React, { useState } from "react";
//import Store from "./Store.jsx";

import "./CSS/phone_book_header_form.css";

const PhoneBookHeaderForm = props => {
  // --- inital states of all 3 data regarding one contact
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // --- here the variables that hold
  // --- first name,
  // --- second name,
  // --- phone number
  // --- are updated as user type something in input fileds

  return (
    <>
      <form className="phone_book_header_add_form" type="submit">
        <div className="phone_book_header_add_form_label">First Name:</div>
        <input
          type="text"
          className="new_first_name"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <div className="phone_book_header_add_form_label">Second Name:</div>
        <input
          type="text"
          className="new_second_name"
          name="secondName"
          value={secondName}
          onChange={e => setSecondName(e.target.value)}
        />
        <div className="phone_book_header_add_form_label">Phone Number:</div>
        <input
          type="text"
          className="new_phone_number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <button
          type="submit"
          className="add_new_contact"
          onClick={e =>
            props.addNewPhoneContact(e, firstName, secondName, phoneNumber)
          }
        >
          Add New Contact
        </button>
      </form>
    </>
  );
};

export default PhoneBookHeaderForm;
