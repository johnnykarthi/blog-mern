require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

const PORT = process.env.PORT || 4000;


app.use('/api',require('./routes/BlogRouter'));


mongoose.connect(process.env.MONGODB_URI)
.then(app.listen(PORT, () => {
    console.log('Server started on port '+ PORT);
}))
.catch((err)=> console.log(err));

