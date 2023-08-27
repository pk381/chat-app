let email = document.getElementById("email");

let password = document.getElementById("password");


document.getElementById("submit").addEventListener('click', async (e)=>{

    e.preventDefault();

    let obj ={
        email: email.value,
        password: password.value
    }

    try{

        let res = await axios.post("http://localhost:4000/user/login", obj);

        console.log(res.data.message);


        if(res.data.message === "userNotExist"){

            console.log("user not exist");

            alert("User Not Exist Please SignUp");
        }
        else if(res.data.message === "passwordIncorrect"){

            alert("Password is Incorrect");
            
        }
        else if(res.data.message === "loginSuccesssfully"){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userName', res.data.userName)
            
        }
    }
    catch(err){
        console.log(err);
    }


});

document.getElementById("forgot_password").addEventListener("click", ()=>{

    window.location.href = "/forgot-password";
})