import { useState } from "react";
import { MessageBubble } from "./MessageBubble";
import "./../styles/chatbot.css";

export const Chatbot = ({ messages, setMessages }) => {
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch("http://localhost:5000/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, chat_history: newMessages }),
            });

            const reader = response.body.getReader();
            let result = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = new TextDecoder("utf-8").decode(value);
                result += chunk;

                // Progressive response updates
                setMessages([...newMessages, { role: "assistant", content: result }]);
            }
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}
                {isTyping && <div className="typing-indicator">TravelMate AI is typing...</div>}
            </div>

            <div className="input-container">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about your trip..."
                    className="input-field"
                />
                <button onClick={sendMessage} className="send-button">Send</button>
            </div>
        </div>
    );
};
