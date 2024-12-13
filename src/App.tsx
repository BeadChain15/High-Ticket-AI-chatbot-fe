import { Route, Routes } from "react-router-dom";
import ChatInterface from "./pages/Chat";
import Header from "./components/Header";
import Prompt from "./pages/Prompt";
import Train from "./pages/Train";
import { useState } from "react";
import { Message } from "./types";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ChatInterface setMessages={setMessages} messages={messages} />} />
        <Route path="/chat" element={<ChatInterface setMessages={setMessages} messages={messages} />} />
        <Route path="/train" element={<Train />} />
        <Route path="/prompt" element={<Prompt />} />
      </Routes>
    </>
  );
}

export default App;
