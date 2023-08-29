// displaying user name
document.getElementById("user_name").innerText =
  localStorage.getItem("userName");

// token
const token = localStorage.getItem("token");

document.getElementById("send").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const obj = {
      message: document.getElementById("message").value,
    };

    // console.log(token);

    const res = await axios.post("http://localhost:4000/main/message", obj, {
      headers: { Authorization: token },
    });

    console.log(res.data.message);
  } catch (err) {
    console.log(err);
  }
});

let lastShownMessageId = 0;

async function getMessages() {
  console.log(lastShownMessageId);

  let localMessages = JSON.parse(localStorage.getItem("messages"));

  if (localMessages === null || localMessages.length === 0) {
    localMessages = [];

    const res = await axios.get(`http://localhost:4000/main/messages/0`, {
      headers: { Authorization: token },
    });

    const allMessage = res.data.messages;

    for (let i = 0; i < allMessage.length; i++) {
      if (lastShownMessageId < allMessage[i].id) {
        showMessage(allMessage[i].message);
        lastShownMessageId = allMessage[i].id;
      }

      if (i + 10 >= allMessage.length) {
        console.log(allMessage[i]);
        localMessages.push(allMessage[i]);
      }
    }

    localStorage.setItem("messages", JSON.stringify(localMessages));
  } else {
    localMessages.forEach((message) => {
      if (lastShownMessageId < message.id) {
        showMessage(message.message);
        lastShownMessageId = message.id;
      }
    });

    const lastId = localMessages[localMessages.length - 1].id;

    const res = await axios.get(
      `http://localhost:4000/main/messages/${lastId}`,
      {
        headers: { Authorization: token },
      }
    );

    const allMessage = res.data.messages;

    for (let i = 0; i < allMessage.length; i++) {
      if (lastShownMessageId < allMessage[i].id) {
        showMessage(allMessage[i].message);

        lastShownMessageId = allMessage[i].id;
      }

      if (lastId < allMessage[i].id) {
        console.log(allMessage[i]);
        localMessages.shift();
        localMessages.push(allMessage[i]);
      }
    }

    localStorage.setItem("messages", JSON.stringify(localMessages));
  }
}

setInterval(() => {
  getMessages();
}, 1000);

// getMessages();

function showMessage(message) {
  let dispaly = document.getElementById("chats");

  let li = document.createElement("li");

  li.className = "";

  let p = document.createElement("p");

  p.appendChild(document.createTextNode(message));

  li.appendChild(p);

  dispaly.appendChild(li);
}
