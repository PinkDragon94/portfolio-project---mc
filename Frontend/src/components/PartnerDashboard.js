const { useContext, useState } = require("react");
const AuthContext = require("../context/AuthContext");
const axios = require("axios");

function PartnerDashboard() {
  const { user } = useContext(AuthContext);
  const [jobTitle, setJobTitle] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const handleSubmit = async (type) => {
    const payload = type === "job" ? { title: jobTitle, createdBy: user.email } : { title: eventTitle, createdBy: user.email };
    await axios.post(`http://localhost:5000/api/partner/${type}`, payload);
    if (type === "job") setJobTitle("");
    if (type === "event") setEventTitle("");
  };

  return require("react").createElement("div", null,
    require("react").createElement("h2", null, "Partner Dashboard"),

    require("react").createElement("h3", null, "Submit Job"),
    require("react").createElement("input", {
      type: "text",
      value: jobTitle,
      onChange: (e) => setJobTitle(e.target.value),
      placeholder: "Job Title"
    }),
    require("react").createElement("button", { onClick: () => handleSubmit("job") }, "Submit Job"),

    require("react").createElement("h3", null, "Submit Event"),
    require("react").createElement("input", {
      type: "text",
      value: eventTitle,
      onChange: (e) => setEventTitle(e.target.value),
      placeholder: "Event Title"
    }),
    require("react").createElement("button", { onClick: () => handleSubmit("event") }, "Submit Event")
  );
}

module.exports = PartnerDashboard;
