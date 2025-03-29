import React from "react";
import "../styles/global.css";

const GetInvolved = function() {
  return React.createElement(
    "div",
    { className: "page-container" },
    [
      React.createElement("h1", null, "Get Involved"),
      React.createElement(
        "p",
        null,
        "Want to be part of our growing community? Here's how you can contribute:"
      ),
      React.createElement(
        "ul",
        null,
        [
          React.createElement(
            "li",
            null,
            React.createElement("strong", null, "Become a Partner:"),
            " Post jobs and organize events."
          ),
          React.createElement(
            "li",
            null,
            React.createElement("strong", null, "Alumni Participation:"),
            " Apply for jobs, join events, and network."
          ),
          React.createElement(
            "li",
            null,
            React.createElement("strong", null, "Volunteer:"),
            " Help with community initiatives."
          ),
          React.createElement(
            "li",
            null,
            React.createElement("strong", null, "Donate:"),
            " Support our mission by contributing."
          )
        ]
      ),
      React.createElement(
        "p",
        null,
        "If you're interested in getting involved, ",
        React.createElement("a", { href: "/contact" }, "contact us"),
        " today!"
      )
    ]
  );
};

export default GetInvolved;