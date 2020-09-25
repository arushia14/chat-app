import React, { useState, useEffect } from "react";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  IconButton,
} from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // Initially empty, messages get pushed in as button is clicked
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please Enter Your Name"));
  }, []);

  const sendMessage = (event) => {
    // Sending the message on clicking the button
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setMessages([...messages, { username: username, text: input }]);
    setInput("");
  };

  return (
    <div className="App">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="messenger icon"
      />
      <h3>Welcome {username} </h3>
      <form className="app_form">
        <FormControl className="app_formControl">
          {/* <InputLabel>Enter a message</InputLabel> */}
          <Input
            className="app_input"
            placeholder="Enter a message.."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app_iconbutton"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!input}
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>

        {/* <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!input}
          onClick={sendMessage}
        >
          Send Message
        </Button> */}
      </form>

      <FlipMove>
        {
          // Mapping the messages to print
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
