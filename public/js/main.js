// displaying user name
document.getElementById("user_name").innerText = localStorage.getItem('userName');


document.getElementById('send').addEventListener('click', async (e)=>{

    e.preventDefault();
    
    try{

        const obj = {
            message: document.getElementById('message').value
        } 

        const token = localStorage.getItem('token');

        // console.log(token);

        const res = await axios.post("http://localhost:4000/main/message", obj, { headers: {Authorization: token } });

        console.log(res.data.message);

    }
    catch(err){
        console.log(err);
    }

});
