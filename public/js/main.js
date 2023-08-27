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

async function getMessages() {
  const res = await axios.get("http://localhost:4000/main/messages", {
    headers: { Authorization: token },
  });

  console.log(res.data.messages);
}

getMessages();
