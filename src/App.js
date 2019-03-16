import React, { useState, useEffect } from "react";
import { Button, Card, Input, message } from "antd";

import { getNote, postNote } from "./servcies";
import "./App.css";

const App = () => {
  const [submitting, setSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    handleGetNote();
  }, []);

  const handleGetNote = async () => {
    const content = await getNote();
    setInputValue(content);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const response = await postNote(inputValue);
    setSubmitting(false);
    message.success("Submitted");
    console.log(response);
  };

  const handleInputChange = e => {
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
        <Button
          loading={submitting}
          type="primary"
          style={{ marginTop: "1em" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
};

export default App;
