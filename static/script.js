document.addEventListener("DOMContentLoaded", function () {
    const chatInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendBtn");
    const chatBox = document.getElementById("chatbox");

    function appendMessage(message, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("p-3", "rounded-lg", "mb-2");
        if (sender === "bot") {
            messageDiv.classList.add("bg-gray-800", "text-white");
        } else {
            messageDiv.classList.add("bg-blue-500", "text-white", "self-end");
        }
        
        messageDiv.innerText = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        let userInput = chatInput.value.trim();
        if (userInput === "") return;

        appendMessage(`You: ${userInput}`, "user");
        chatInput.value = "";

        console.log("Sending message:", userInput); // Debugging log

        fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            body: JSON.stringify({ message: userInput }),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {
            console.log("Raw response:", response);  // Debugging log
            return response.json();
        })
        .then(data => {
            console.log("Bot response:", data);  // Debugging log
            appendMessage(`Bot: ${data.response}`, "bot");
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            appendMessage("⚠️ Error connecting to chatbot.", "bot");
        });
    }

    sendButton.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});
