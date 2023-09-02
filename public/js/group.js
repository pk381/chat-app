// btns for groups and chats

document
  .getElementById("create_new_group_btn")
  .addEventListener("click", (e) => {
    document.getElementById("add_user_to_group_btn").style =
      "background-color: rgb(165, 216, 216)";
    e.target.style = "background-color: rgb(27, 169, 169)";
    document.getElementById("create_group_form").style = "display: flex";
    document.getElementById("add_to_group").style = "display: none";
  });

document
  .getElementById("add_user_to_group_btn")
  .addEventListener("click", (e) => {
    document.getElementById("create_new_group_btn").style =
      "background-color: rgb(165, 216, 216)";
    e.target.style = "background-color: rgb(27, 169, 169)";
    document.getElementById("add_to_group").style = "display: flex";
    document.getElementById("create_group_form").style = "display: none";
  });

let btns = document.getElementsByClassName("cut_btn");

for(let btn of btns) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style = "display: none";

    document.getElementById("add_user_to_group_btn").style =
      "background-color: rgb(165, 216, 216)";

    document.getElementById("make_new_friend").style = "background-color: rgb(165, 216, 216)";

    document.getElementById("create_new_group_btn").style =
     "background-color: rgb(165, 216, 216)";
  });
}

document
  .getElementById("create_new_group")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    console.log("creating new group");

    try {
      const obj = {
        groupName: document.getElementById("group_name").value,
      };

      const res = await axios.post(
        "http://localhost:4000/group/create-group",
        obj,
        {
          headers: { Authorization: token },
        }
      );

      showFriendOrGroup(res.data.group, 'group');
    } catch (err) {
      console.log(err);
    }
  });

// getting all groups
let selectedGroup;
document.getElementById("groups_btn").addEventListener("click", async (e) => {
  e.target.style = "background-color: rgb(27, 169, 169)";

  document.getElementById("group_btns").style = "display: flex";
  document.getElementById("chat_btns").style = "display: none";
  document.getElementById("friends").style = "display: none";
  document.getElementById("groups").style = "display: flex";
  document.getElementById("send_message_form").style = "display: none";
  document.getElementById("send_group_message_form").style = "display: flex";

  document.getElementById("friends_btn").style = 'background-color: rgb(165, 216, 216)';


  try {
    const res = await axios.get("http://localhost:4000/group/all-group", {
      headers: { Authorization: token },
    });

    const groups = res.data.groups;

    selectedGroup = groups[0];

    for (let group of groups) {
      showFriendOrGroup(group, "group");
    }
  } catch (err) {
    console.log(err);
  }
});

function showFriendOrGroup(data, type) {
  let friendsList = document.getElementById("friends");
  let groupsList = document.getElementById("groups");

  console.log(data);

  let li = document.createElement("li");
  li.className = "friend_list list";

  let btn = document.createElement("button");
  btn.className = "frinds list_btn";

  if (type === "friends") {
    btn.appendChild(document.createTextNode(data.name));
    li.appendChild(btn);
    friendsList.appendChild(li);

    btn.onclick = async ()=>{
      selectedFriend = data;
      console.log("friend");
    }
  } else {
    btn.appendChild(document.createTextNode(data.groupName));
    li.appendChild(btn);
    groupsList.appendChild(li);

    btn.onclick = async ()=>{

      selectedGroup = data;

      console.log("group");
    }
  }
}

// adding new user to group
document.getElementById("add_user").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const obj = {
      email: document.getElementById("email_of_user").value,
    };

    const res = await axios.post(
      "http://localhost:4000/group/add-user-to-group",
      obj,
      {
        headers: { Authorization: token },
      }
    );

    console.log(res.data.newUserToGroup);
  } catch (err) {
    console.log(err);
  }
});
