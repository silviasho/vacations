const jwt = require('jsonwebtoken');
function getJwt(user) {
	return new Promise((res, rej) => {
		jwt.sign(user,process.env.SECRET,
			{
				expiresIn: '1h'
			},
			(err, token) => {
				if (err) rej(err, 'token err');
				res(token);
			}
		);
	});
}
module.exports=getJwt