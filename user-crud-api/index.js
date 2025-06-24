const express = require('express');
const {v4 : uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(express.json());

const users = {};

app.listen(port , () => {
    console.log(`Server running at port ${port}`);
});


// CREATE User
app.post('/users',(req, res) => {
    const { name , email, age} = req.body ;

    //Input Valiidation
    if(!name || !email || !age){
        return res.status(400).json({error :"Name, email, and age are required"});       
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({error : `Invalid email format`});
    }

    const id = uuidv4();
    users[id] = { id, name, email, age };

    res.status(201).json(users[id]);
})

//READ all Users
app.get('/user', (req,res) =>{
    res.json(Object.values(users))
})


// Read Single User
app.get('/users',(req , res)=>{
    const user = users[req.params.id]
    if(!user) return res.status(404).json({ error : `User Not Found`})
    
    res.json(user)
})

//UPDATE User 
app.put('users/id', (req, res) => {
    const { name, email, age } = req.body;
    const user = users[req.params.id]

    if(!user) return res.status(404).json({error : "User not found"})
    
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({ error : "Invalid email Format"})
    }


    //Update Fields if provided 
    if(name) user.name = name
    if(email) user.email = email
    if(age) user.age = age

    res.json(user)
})

//DELETE User

app.delete('/users/id', (req , res ) => {
    const user = user[req.params.id]
    if(!user) return res.status(404).json({ error: "User Not Found"})
    
    delete users[req.params.id]
    res.json({ message : "User DELETED Successfully"})
})
