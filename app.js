const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const fileupload = require('express-fileupload');

// using socket
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// routes
const userRoute = require('./routes/user');
const mainRoute = require('./routes/main');
const groupRoute = require('./routes/group');

// database tables
const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/group');
const GroupMessage = require('./models/groupMessage');
const GroupUser = require('./models/groupUser');
const Friend = require('./models/friend');

// static files
app.use(express.static(path.join(__dirname, "public")));

// body parser in json
app.use(bodyParser.json());
app.use(fileupload());

// cors
app.use(cors({origin: "*",credentials: true}));

// serving routes
app.use('/user', userRoute);
app.use('/main', mainRoute);
app.use('/group', groupRoute);


app.get('/', (req, res, next)=>{
    res.redirect('/user/sign_up');
});


// table relations
User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(GroupUser);

Group.hasMany(GroupMessage);
GroupMessage.belongsTo(Group);

User.hasMany(Friend);
Friend.belongsTo(User);



// making connection
let allUsers = [];

io.on('connection', socket =>{

    let name = socket.handshake.auth.name;
    allUsers.push(name);
    io.sockets.emit('getAllUsers', allUsers);

    socket.on('message-sent', (message)=>{
        io.sockets.emit('broadcast', message);
    });


    socket.on('group-message', (groupMessage)=>{

        io.sockets.emit('groupBroadcast', groupMessage);
    })

    socket.on('disconnect', ()=>{
        let name = socket.handshake.auth.name;
        allUsers = allUsers.filter(logoutName => name != logoutName);
        io.sockets.emit('getAllUsers', allUsers);
    });

});

// syncing database
sequelize.sync()
.then(res=>{
    console.log("listening");
    server.listen(4000);

}).catch(err=>{
    console.log(err);
})

