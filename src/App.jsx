import React, { useState } from "react";
import "./App.css"; // import the CSS file

function App() {
  const [siteFile, setSiteFile] = useState(null);
  const [emailsFile, setEmailsFile] = useState(null);

  async function handleGenerate(siteFile, emailsFile) {
    const formData = new FormData();
    formData.append("site", siteFile);
    formData.append("emails", emailsFile);

    const response = await fetch(
      "https://base64-q06v.onrender.com/generate-links/",
      {
        method: "POST",
        body: formData,
      },
    );

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "links.txt";
      a.click();

      window.URL.revokeObjectURL(url);
    } else {
      alert("Error generating links");
    }
  }

  return (
    <div className="app-container">
      <h1 className="title">Generate Base64 Links</h1>
      <div className="form-group">
        <label className="label">
          Upload site.txt:
          <input
            type="file"
            accept=".txt"
            onChange={(e) => setSiteFile(e.target.files[0])}
            className="file-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="label">
          Upload emails.txt:
          <input
            type="file"
            accept=".txt"
            onChange={(e) => setEmailsFile(e.target.files[0])}
            className="file-input"
          />
        </label>
      </div>
      <button
        className="generate-btn"
        onClick={() => {
          if (siteFile && emailsFile) {
            handleGenerate(siteFile, emailsFile);
          } else {
            alert("Please upload both site.txt and emails.txt");
          }
        }}
      >
        Generate & Download
      </button>
    </div>
  );
}

export default App;
