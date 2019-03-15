import React, { useState } from "react";
import { Button, Card, Input, message } from "antd";

import "./App.css";

const App = () => {
  const [submitting, setSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    console.log(inputValue);
    setSubmitting(true);
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    setSubmitting(false);
    message.success("Submitted");
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
