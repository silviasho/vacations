const pool = require('../db');
const queries = require('./query');

const ifUerNameExistInDataBase = async(userName) => {
    const [user] = await pool.execute(queries.fineUserByUserName, [userName]);
    const [result] = user;

    return result;
};
const checkIfUserNameAndPasswordMatch = async(userName, passwprd) => {
    const [user] = await pool.execute(queries.fineUserByUserNameAndPassword, [userName, passwprd]);
    const [result] = user;

    return result;
};

module.exports = { ifUerNameExistInDataBase, checkIfUserNameAndPasswordMatch };