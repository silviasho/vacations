const pool = require('../db');
const userRout = require('express').Router();
const queries = require('../utils/query');
const { ifUerNameExistInDataBase, checkIfUserNameAndPasswordMatch } = require('../utils/findUser');
const { hashPasswordConfirm, hashPassword } = require('../utils/hash');
const getJwt = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const { followToggle } = require('../utils/follow');

userRout.use(async(req, res, next) => {
    try {
        const { authorization } = req.headers;
        const user = await jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
            return decoded;
        });

        req.user = user;

        if (user.isadmin) throw new err();
        next();
    } catch (error) {
        res.json({ err: 'somthing went wrong try to login again' });
    }
});

userRout.get('/vacations', async(req, res, next) => {
    try {
        const { user } = req;
        const [vacations] = await pool.execute(queries.getVactionOrderedByFollwing, [user.id]);
        return res.json({ vacations, user });
    } catch (error) {
        res.send(error);
    }
});

userRout.post('/follow', async(req, res, next) => {
    try {
        const { user } = req;
        const { id } = req.body;
        await followToggle(user.id, id);
        const [vacations] = await pool.execute(queries.getVactionOrderedByFollwing, [user.id]);
        res.json(vacations);
    } catch (ex) {
        res.status(500).json({ err: 'error' });
    }
});

module.exports = userRout;