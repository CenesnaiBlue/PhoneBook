import "./CSS/phone_book_list.css";
import PhoneBookListItem from "./PhoneBookListItem.jsx";

const PhoneBookList = props => {
  const contacts = props.contacts; // --- getting all contacts for display
  const alphabet = Array.from(Array(26)).map((e, index) =>
    String.fromCharCode(index + 65)
  ); // --- generating array that is made of ALL capial letters of alphabet to pass on for headers

  return (
    <>
      <section className="phone_book_list_section">
        <div className="phone_book_list_container">
          {alphabet.map((letter, index) => {
            let itemContact = [];
            return (
              <PhoneBookListItem
                deleteEntry={singleContact => props.deleteEntry(singleContact)}
                showEditEntryForm={props.showEditEntryForm}
                letterContactsList={contacts.filter(contact => {
                  if (contact.leadingLetter === letter) {
                    return [...itemContact, contact];
                  } else return 0;
                })}
                letter={letter}
                key={index + 1}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default PhoneBookList;
