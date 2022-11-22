const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data){ this.users = data }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign({ "email": decoded.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
            res.json({ accessToken })
        })
}

module.exports = { handleRefreshToken }