// displaying user name
document.getElementById("user_name").innerText =
  localStorage.getItem("userName");

// token
const token = localStorage.getItem("token");

// getting all friends
let selectedFriend;
document.getElementById("friends_btn").addEventListener("click", async (e) => {

  e.target.style = "background-color: rgb(27, 169, 169)";
  document.getElementById("group_btns").style = "display: none";
  document.getElementById("chat_btns").style = "display: flex";
  document.getElementById("friends").style = "display: flex";
  document.getElementById("groups").style = "display: none";
  document.getElementById("send_group_message_form").style = "display: none";
  document.getElementById("send_message_form").style = "display: flex";

  document.getElementById("groups_btn").style =
    "background-color: rgb(165, 216, 216)";

  try {
    const res = await axios.get("http://localhost:4000/main/all-friend", {
      headers: { Authorization: token },
    });

    const friends = res.data.friends;

    selectedFriend = friends[0];

    for (let friend of friends) {
      showFriendOrGroup(friend, "friends");
    }
  } catch (err) {
    console.log(err);
  }
});

document.getElementById("friends_btn").click();


// making new friend
document.getElementById("make_new_friend").addEventListener("click", (e) => {
  document.getElementById("add_user_to_group_btn").style =
    "background-color: rgb(165, 216, 216)";
  e.target.style = "background-color: rgb(27, 169, 169)";
  document.getElementById("make_new_friend_form").style = "display: flex";
});

document.getElementById("new_friend").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const obj = {
      friendsEmail: document.getElementById("email_of_friend").value,
    };

    const res = await axios.post("http://localhost:4000/main/new-friend", obj, {
      headers: { Authorization: token },
    });

    showFriendOrGroup(res.data.newFriend, "friends");
  } catch (err) {
    console.log(err);
  }
});


// sending messages
document.getElementById("send").addEventListener("click", async (e) => {
  e.preventDefault();

  console.log("sending to friend", selectedFriend);
  try {
    const obj = {
      message: document.getElementById("message").value,
      toFriendId: selectedFriend.id
    };
    const res = await axios.post("http://localhost:4000/main/message", obj, {
      headers: { Authorization: token },
    });

    console.log(res.data.message);
  } catch (err) {
    console.log(err);
  }
});

// showing messages
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

// setInterval(() => {
//   getMessages();
// }, 1000);

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
