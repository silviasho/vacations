const pool = require('../db');
const registrtion = require('express').Router();
const queries = require('../utils/query');
const { ifUerNameExistInDataBase } = require('../utils/findUser');
const { hashPasswordConfirm, hashPassword } = require('../utils/hash');
const getJwt = require('../utils/jwt');

registrtion.use(async(req, res, next) => {
    try {
        const { userName } = req.body;
        const user = await ifUerNameExistInDataBase(userName);
        req.user = user;
        next();
    } catch (error) {}
});

registrtion.post('/login', async(req, res, next) => {
    try {
        const { user } = req;
        const { password } = req.body;
        if (!user) throw new Error();
        const confirm = await hashPasswordConfirm(password, user.password);
        if (!confirm) throw new Error();
        const userToken = await getJwt({...user, password: null });
        return res.json({ user, userToken });
    } catch (error) {
        res.json({ userNotExist: 'wrong deteils' });
    }
});

registrtion.post('/register', async(req, res, next) => {
    try {
        const { userName, password, firstName, lastName } = req.body;
        const { user } = req;
        if (user) {
            return res.json({ userExist: 'user name exist' });
        } else {
            const cryptPassword = await hashPassword(password);
            await pool.execute(queries.createUser, [userName, firstName, lastName, cryptPassword]);
            res.json({ userCreated: 'please login now' });
        }
    } catch (error) {
        res.json({ err: 'somthing went wrong' });
    }
});

module.exports = registrtion;