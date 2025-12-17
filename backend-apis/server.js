const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://10.10.10.20:27017/mydb', { useNewUrlParser: true, userUnifiedTopology: true })
    .then(()=> console.log("MongoDB Connected"))
    .catch(err => console.log(err));
    
app.get('/', (req,res) => res.send('API running'));
app.listen(3000, ()=> console.log('Server running on port 3000'));
