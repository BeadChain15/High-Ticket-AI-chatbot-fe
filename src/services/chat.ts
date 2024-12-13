import axios from "axios";
import { Message } from "../types";


export const getHistory = () => {
    let chatHistory: Message[] = []
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/history`)
    .then((res) => {
        chatHistory = res.data.history;
    })
    .catch((error) => {
        console.error("Error sending message:", error);
    });
    console.log("chatHistory", chatHistory)
    return chatHistory;
};