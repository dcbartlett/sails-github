/*---------------------
	:: Github 
	-> controller
---------------------*/
var GithubController = {

	create: function(req, res) {
		Github.create({attribute:'info'}).done(function(err,response) {
			if (err) console.log(err);
			console.log(response);
		});
	},

	findAll: function(req,res) {

		Github.findAll({attribute:'info'}).done(function(err,info) {
			if (err) res.send(err);
			console.log(info);
			res.send(info);
		});
	}

};
module.exports = GithubController;