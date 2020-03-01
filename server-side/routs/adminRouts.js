const pool = require('../db');
const adminRouts = require('express').Router();
const queries = require('../utils/query');
const jwt = require('jsonwebtoken');
const adminToggle = require('../utils/changeToAdmin');

adminRouts.use(async(req, res, next) => {
    try {
        const { authorization } = req.headers;
        const user = await jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
            return decoded;
        });
        if (!user.isadmin) throw new Error();
        req.user = user;
        next();
    } catch (error) {
        res.json({ err: 'somthing went wrong try to login again' });
    }
});

adminRouts.post('/addVacation', async(req, res, next) => {
    try {
        const { from, to, description, price, picture, returnData, departureDate } = req.body;
        if (!from || !to || !description || !price || !picture || !returnData || !departureDate) throw new Error();
        await pool.execute(queries.createVaction, [
            to,
            from,
            picture,
            description,
            departureDate,
            returnData,
            0,
            price
        ]);
        const [vacations] = await pool.execute(queries.getVactions);
        return res.json(vacations);
    } catch (error) {
        res.json({ err: 'err somting went wrong try again' });
    }
});

adminRouts.post('/editVacation', async(req, res, next) => {
    try {
        const { departureDate, returnData, picture, price, description, to, from, id } = req.body;
        await pool.execute(queries.editVaction, [
            to,
            from,
            picture,
            description,
            departureDate,
            returnData,
            price,
            id
        ]);
        const [vacations] = await pool.execute(queries.getVactions);
        res.json(vacations);
    } catch (error) {
        res.json({ err: 'err somting went wrong try again' });
    }
});

adminRouts.post('/deleteVacation', async(req, res, next) => {
    try {
        const { id } = req.body;
        await pool.execute(queries.deleteVaction, [id]);
        await pool.execute(queries.deleteVactionInFollwers, [id]);
        const [vacations] = await pool.execute(queries.getVactions);
        res.json(vacations);
    } catch (error) {}
});

adminRouts.get('/vacations', async(req, res, next) => {
    try {
        const { user } = req;
        const [vacations] = await pool.execute(queries.getVactions);
        return res.json({ vacations, user });
    } catch (error) {
        res.json({ err: 'somthing went wrong try to log again' });
    }
});

adminRouts.get('/getUsers', async(req, res, next) => {
    try {
        const [users] = await pool.execute(queries.getAllUsers);
        res.json(users);
    } catch (ex) {
        res.json({ err: 'somthing went wrong try to login again' });
    }
});

adminRouts.post('/adminChange', async(req, res, next) => {
    try {
        const { userId } = req.body;
        const user = await adminToggle(userId);
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

module.exports = adminRouts;