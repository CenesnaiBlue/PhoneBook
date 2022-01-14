import React, { useState } from "react";
import "./CSS/phone_book_search_report.css";

const PhoneBookSearchReport = props => {
  let foundStrings = props.foundStrings;
  let passedSearchString = props.passedSearchString;
  let numberOfPages = Math.ceil(foundStrings.length / 4); // --- get possible pages on search results

  let [pageCounter, setPageCounter] = useState(0); // --- starting value for page counter

  // --- initatial states of navigation arrows
  let [arrowLeft, setArrowLeft] = useState(false);
  let [arrowRight, setArrowRight] = useState(true); //

  // --- scroll to glicked match

  const getToMatch = match => {
    let matchID = document.getElementById(
      match.firstName + match.secondName + match.phoneNumber
    );
    matchID.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  };

  // --- conditions to show and hide arrows

  const toggleLeftArrow = () => {
    pageCounter + 1 === 1 ? setArrowLeft(false) : setArrowLeft(true);
  };

  const toggleRightArrow = () => {
    pageCounter + 1 === numberOfPages
      ? setArrowRight(false)
      : setArrowRight(true);
  };

  // --- 2 functions triggerd on click when intaracting with arrrows

  const prevPage = () => {
    if (pageCounter > 0) {
      setPageCounter((pageCounter = pageCounter - 1));
      toggleLeftArrow();
      toggleRightArrow();
    } else {
      return 0;
    }
  };

  const nextPage = () => {
    if (pageCounter + 1 < numberOfPages) {
      setPageCounter((pageCounter = pageCounter + 1));
      toggleLeftArrow();
      toggleRightArrow();
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className="screen_div">
        <div className="search_report_container">
          <div className="search_report_header">
            Search Results for: "{passedSearchString}" - ({foundStrings.length}{" "}
            matches)
          </div>
          <div className="search_report_content">
            {foundStrings.map((oneHit, index) => {
              // --- factor of 4 in mulitplication formula is hard coded page size (can be other)
              if (-1 + 4 * pageCounter < index && index < 4 + 4 * pageCounter) {
                return (
                  <div
                    key={oneHit.firstName + oneHit.secondName}
                    className="one_search_hit"
                  >
                    <div className="first_name_search_hit">
                      {oneHit.firstName}
                    </div>
                    <div className="second_name_search_hit">
                      {oneHit.secondName}
                    </div>
                    <button
                      value={oneHit.id}
                      onClick={() => getToMatch(oneHit)}
                      className="view_match"
                    >
                      View match
                    </button>
                  </div>
                );
              }
            })}
          </div>
          <div className="search_results_pages">
            <span className="arrow_container">
              {arrowLeft && (
                <div className="left_arrow" onClick={() => prevPage()}></div>
              )}
            </span>
            <div className="page_indicator">Page {pageCounter + 1}</div>
            <span className="arrow_container">
              {arrowRight && (
                <div className="right_arrow" onClick={() => nextPage()}></div>
              )}
            </span>
          </div>
          <button
            className="close_search_report"
            type="button"
            onClick={() => props.closeSerachReport()}
          >
            Close Search Results
          </button>
        </div>
      </div>
    </>
  );
};

export default PhoneBookSearchReport;
