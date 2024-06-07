// Establish a websocket connection to the server running on port 3500 using socket.io
const socket = io("ws://localhost:3500");
// selecting dom elements
const activity = document.querySelector(".activity");
const msgInput = document.querySelector("input");
// Sending Messages
function sendMessage(e) {
  e.preventDefault();
  if (msgInput.value) {
    socket.emit("message", msgInput.value); // emits message to the server
    msgInput.value = "";
  }
  msgInput.focus();
}
document.querySelector("form").addEventListener("submit", sendMessage);
// Receiving messages
socket.on("message", (data) => {
  // Listens for message events from the server
  activity.textContent = "";
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li); // append each received message to a list(ul) in the DOM
});

// Typing Activity Indicator
msgInput.addEventListener('keypress', () => {
  socket.emit('activity', socket.id.substring(0, 5));
});
let activityTimer
socket.on("activity", (name) => {
  activity.textContent = `${name} is typing...`;

  // clear after 3 seconds
  clearTimeout(activityTimer)
  activityTimer = setTimeout(() => {
    activity.textContent = ""
  }, 3000)
});


