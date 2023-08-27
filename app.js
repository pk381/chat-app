const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');

const app = express();


// routes
const userRoute = require('./routes/user');
const mainRoute = require('./routes/main');

// database tables
const User = require('./models/user');
const Message = require('./models/message');

// static files
app.use(express.static(path.join(__dirname, "public")));

// body parser in json
app.use(bodyParser.json());

// cors
app.use(cors({origin: "*",credentials: true}));

// serving routes
app.use('/user', userRoute);
app.use('/main', mainRoute);


app.get('/', (req, res, next)=>{
    res.redirect('/user/sign_up');
});


// table relations
User.hasMany(Message);
Message.belongsTo(User);


// syncing database
sequelize.sync()
.then(res=>{
    console.log("listening");
    app.listen(4000);

}).catch(err=>{
    console.log(err);
})

