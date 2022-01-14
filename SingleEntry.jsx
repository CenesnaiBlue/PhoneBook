import "./CSS/single_entry.css";

const SingleEntry = props => {
  console.log(props.contact, "stigo");
  return (
    <>
      <div className="entry_first_name">First Name</div>
      <div className="entry_second_name">Second Name</div>
      <div className="entry_phone_number">Number</div>
    </>
  );
};

export default SingleEntry;
