const queries = {
	getAllUsers: 'SELECT id,isadmin,user_name  FROM project.users;',
	setUserToAdmin: 'UPDATE `project`.`users` SET `isadmin` = 1 WHERE (`id` = ?);',
	setAdminToUser: 'UPDATE `project`.`users` SET `isadmin` = 0 WHERE (`id` = ?);',
	checkIfUserIsAdmin: 'select isadmin from project.users where id=? ',
	getVactionOrderedByFollwing:
		'SELECT * FROM project.vacations left join project.followers On followers.vaction_id=vacations.id and followers.user_id=? Order by user_id desc ;',
	createUserTable:
		'CREATE TABLE `project`.`users` (`id` INT NOT NULL AUTO_INCREMENT,`admin?` VARCHAR(45) NOT NULL,`firs_name` VARCHAR(45) NOT NULL,`last_name` VARCHAR(45) NOT NULL,`email` VARCHAR(45) NOT NULL, `user_name` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`));',
	getUser: 'select * from project.users where user_name=? ',
	getUserBtId: 'SELECT * FROM project.users where id = ?',
	fineUserByUserNameAndPassword: 'select * from project.users where users.user_name=? and users.password=? ;',
	fineUserByUserName: 'SELECT * FROM project.users where user_name=? ;',
	createUser: 'INSERT INTO project.users (`user_name`, `first_name`, `last_name`, `password`) VALUES (?,?,?,?);',
	getVactions: 'SELECT * FROM project.vacations ;',
	followVaction: 'INSERT INTO project.followers (`vaction_id`, `user_id`) VALUES (?, ?);',
	getfollowedVaction: 'select * from project.followers where followers.user_id=?',
	chackIfUserFollowingVaction: 'select * from project.followers where followers.user_id=? and followers.vaction_id=?',
	stopFollowingVaction: 'DELETE FROM `project`.`followers` WHERE (`vaction_id` = ?);',
	countFollowersVaction: 'select count(*) as follow from project.followers where vaction_id=?',
	updateVactionFollowers: 'UPDATE project.vacations SET followers = ? WHERE (id = ?);',
	deleteVaction: 'DELETE FROM `project`.`vacations` WHERE (`id` = ?);',
	deleteVactionInFollwers: ' DELETE  FROM project.followers WHERE project.followers.vaction_id = ?',
	editVaction:
		'UPDATE `project`.`vacations` SET `to` = ?, `from` = ?, `pictur` = ?, `description` = ?, `departure` = ?, `return` = ?, `price` = ? WHERE (`id` = ?);',
	createVaction:
		'INSERT INTO `project`.`vacations` (`to`, `from`, `pictur`, `description`, `departure`, `return`, `followers`, `price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
};
module.exports = queries;
