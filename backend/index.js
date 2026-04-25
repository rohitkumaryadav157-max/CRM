const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stEnqRouter = require('./Routes/stEnqRouter');
const adminRouter = require('./Routes/adminRouter');
const centerRoute = require('./Routes/centerRoute');
const userRoute = require ('./Routes/userRouter');
const visitorRouter = require('./Routes/visitorRouter');
const assignRouter = require('./Routes/assignRouter');
const followupRoute = require('./Routes/followupModel');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("DB Connect ");
})
.catch((e)=>{
    console.log(`Error :${e}`);
})


// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/crm')
.then(()=>console.log("DB connect success"))
.catch((err)=>console.log(`Error: ${err}`));


// Middleware
app.use(express.json());
app.use(cors());

//for upload image (profile pick)
app.use('/upload',express.static('upload'));


// Student ROUTES CONNETION 
app.use('/api/enq',stEnqRouter);

//Admin login route connect 
app.use('/api/admin',adminRouter);

//Center route Connect
app.use('/api/center', centerRoute);

//User Route Connect
app.use('/api/user', userRoute)

//Visitor Route Connect
app.use('/api/visitor' ,visitorRouter)

//Assign Route Connect
app.use('/api/assign',assignRouter)


//followup Router Connect
app.use('/api/followup',followupRoute)


// SERVER  CONNECTION 
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

