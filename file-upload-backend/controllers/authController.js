const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data){ this.users = data }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const {email, password } = req.body;
    if (!email || !password ) return res.status(400).json({ 'message': 'Email and Password inputs are required.'});
    const foundUser = userDB.users.find(person => person.email === email);
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        //create JWTs
        const accessToken = jwt.sign({ "email": foundUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ "email": foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        const otherUsers = userDB.users.filter(person => person.email !== foundUser.email);
        const currentUser = { ...foundUser, refreshToken };
        userDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname,'..','model', 'users.json'),
            JSON.stringify(userDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }