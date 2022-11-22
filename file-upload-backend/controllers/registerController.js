const User = require('../model/Users');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const {name, lname, email, password } = req.body;
    if (!email || !password || !lname || !name) return res.status(400).json({ 'message': 'All fields are required.'});
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); //conflict status
    try {
        //encrypt the passwword
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        const newUser = await User.create({ 
            name,
            lname,
            email,
            password: hashedPwd
         })
       
        res.status(201).json({ 'success': `new user ${email} created!` });
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

module.exports = {
    handleNewUser
}