import React, { useState } from "react";
import "./CSS/phone_book_notes.css";

const PhoneBookNotes = props => {
  //--- getting first name of a contact that is changed
  let noteText = props.noteText;

  // --- addCLass adds CSS class to notes depending of a content

  return (
    <>
      <div className={"phone_book_notes_container " + props.addClass}>
        {props.isAdded ? (
          <div className={"phone_book_notes_text " + props.addClass}>
            Added contact for{" "}
            <span>
              <b>{noteText}</b>
            </span>
          </div>
        ) : props.isChanged ? (
          <div className={"phone_book_notes_text " + props.addClass}>
            Changed contact for &nbsp;
            <span>
              <b>{noteText}</b>
            </span>
          </div>
        ) : props.isDeleted ? (
          <div className={"phone_book_notes_text " + props.addClass}>
            Contact Deleted
          </div>
        ) : (
          <div className="phone_book_notes_text">No change made on list</div>
        )}
      </div>
    </>
  );
};

export default PhoneBookNotes;
