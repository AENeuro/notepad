import React, { useState, useEffect } from "react";
import { Button, Card, Input, message } from "antd";

import { getNote, postNote } from "./servcies";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hasUrl, setHasUrl] = useState(false);

  useEffect(() => {
    handleGetNote();
  }, []);

  useEffect(() => {
    var urlRegExp = new RegExp(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
    );
    setHasUrl(inputValue.match(urlRegExp));
  }, [inputValue]);

  const handleGetNote = async () => {
    setLoading(true);
    setInputValue("Loading Data...");
    const content = await getNote();
    setLoading(false);
    setInputValue(content);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await postNote(inputValue);
    setLoading(false);
    message.success("Submitted");
    console.log(response);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="screen-wrapper">
      <Card>
        <h1 style={{ textAlign: "center" }}>Notepad</h1>
        <Input.TextArea
          className="note-input"
          onPressEnter={handleSubmit}
          onChange={handleInputChange}
          value={inputValue}
        />
        <div>
          <Button
            loading={loading}
            type="primary"
            style={{ marginTop: "1em" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>

          {hasUrl ? (
            <a href={hasUrl[0]}>
              <Button className="link-button">
                <i className="fas fa-link" />
              </Button>
            </a>
          ) : null}

          <Button className="refresh-button" onClick={handleGetNote}>
            <i
              className={
                loading ? "fas fa-sync-alt spinning" : "fas fa-sync-alt"
              }
            />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default App;
