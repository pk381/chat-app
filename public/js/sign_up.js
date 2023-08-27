let message = document.getElementById('message');

const name = document.getElementById('name');
const email = document.getElementById('email');
const phone =  document.getElementById('phone');
const password = document.getElementById('password');

document.getElementById('sign_up').addEventListener('click', async (e)=>{

    e.preventDefault();

    let obj = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value
    }

    try{
        const res = await axios.post("http://localhost:4000/user/sign_up", obj);

        if(res.data.message === 'userExist'){
            message.innerText = "Email already exist";
        }
        else{

            window.location.href = "/user/login";
        }      
    }
    catch(err){

        alert("somthingwent wrong");
        console.log(err);
    }
   
});