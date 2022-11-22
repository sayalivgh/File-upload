const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data){ this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const {name, lname, email, password } = req.body;
    if (!email || !password || !lname || !name) return res.status(400).json({ 'message': 'All fields are required.'});
    const duplicate = userDB.users.find(person => person.email === email);
    if (duplicate) return res.sendStatus(409); //conflict status
    try {
        //encrypt the passwword
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        const newUser = { 
            name,
            lname,
            email,
            password: hashedPwd
         }
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        )
        console.log(userDB.users);
        res.status(201).json({ 'success': `new user ${email} created!` })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

module.exports = {
    handleNewUser
}