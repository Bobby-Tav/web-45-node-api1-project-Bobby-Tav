// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express()

server.use(express.json())
//Get All User
server.get('/api/users',(req,res)=>{
    Users.find()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch( err =>{
        res.status(500).json({ message: "The users information could not be retrieved" })
    })
})
server.get('/api/users/:id',(req,res)=>{
    const { id }= req.params
    Users.findById(id)
    .then(user =>{
        if(!user){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else{
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The user information could not be retrieved" })
    })
})
server.delete('/api/users/:id', async (req,res)=>{
    const possibleUser = await Users.findById(req.params.id)
    if(!possibleUser){
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    }else{
        const deletedUser = await Users.remove(possibleUser.id)
        res.status(200).json(deletedUser)
    }
})
server.post('/api/users',(req,res) =>{
    const{ name , bio } = req.body
    Users.insert({ name, bio })
    .then(user =>{
        if (!name || !bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }else{
            res.status(201).json(user)
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    })
})
server.put('/api/users/:id',(req,res)=>{
    const{ id } = req.params
    const  {name , bio } = req.body
    Users.update(id ,{name,bio})
    .then(updatedUser =>{
        if(!updatedUser){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else{
            if (!name || !bio){
                res.status(400).json({ message: "Please provide name and bio for the user" })
            }else{
                res.status(200).json(updatedUser)
            }
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "The user information could not be modified" })
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
