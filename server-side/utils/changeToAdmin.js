const pool = require('../db');
const queries = require('./query');

const adminToggle = async(userId) => {
    const [isadmin] = await pool.execute(queries.checkIfUserIsAdmin, [userId]);
    const [val] = isadmin;
    if (!val.isadmin) {
        await pool.execute(queries.setUserToAdmin, [userId]);
        const [users] = await pool.execute(queries.getAllUsers);
        return users;
    }
    await pool.execute(queries.setAdminToUser, [userId]);
    const [users] = await pool.execute(queries.getAllUsers);
    return users;
};
module.exports = adminToggle;