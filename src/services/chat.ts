import axios from "axios";
// import { Message } from "../types";


// export const getHistory = () => {
//     let chatHistory: Message[] = []
//   axios
//     .get(`${import.meta.env.VITE_API_URL}/api/history`)
//     .then((res) => {
//         chatHistory = res.data.history;
//     })
//     .catch((error) => {
//         console.error("Error sending message:", error);
//     });
//     console.log("chatHistory", chatHistory)
//     return chatHistory;
// };

export const sendMessage = async (message: string, threadId: string) => {
    try {
        console.log("threadID", threadId)
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
            message: message,
            threadId: threadId
        });
        return res.data; // Return the response data
    } catch (error) {
        console.error('Error sending message:', error); // Log the error for debugging
        throw error; // Re-throw the error after logging
    }
}