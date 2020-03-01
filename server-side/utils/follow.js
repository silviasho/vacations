const pool = require('../db');
const queries = require('./query');

const followToggle = async(userId, vactionId) => {
    const [vaction] = await pool.execute(queries.chackIfUserFollowingVaction, [userId, vactionId]);
    const [first] = vaction;
    if (!first) {
        await pool.execute(queries.followVaction, [vactionId, userId]);
        return await setFollowers(vactionId);
    } else {
        await pool.execute(queries.stopFollowingVaction, [vactionId]);
        await setFollowers(vactionId);
        return vaction;
    }
};
const setFollowers = async(vactionId) => {
    const [followers] = await pool.execute(queries.countFollowersVaction, [vactionId]);
    const [num] = followers;

    const { follow } = num;
    return await pool.execute(queries.updateVactionFollowers, [follow, vactionId]);
};

module.exports = { followToggle };