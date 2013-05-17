/*---------------------------------------------------------------
	:: sails-github
	-> adapter
---------------------------------------------------------------*/

var github = require('octonode');

var adapter = module.exports = {

	connections: {},

	// This method runs when a model is initially registered at server start time
	registerCollection: function(collection, cb) {

		this.connections[collection.identity] = {
			api: new github({});
		};
		cb();
	},

	// Find All entries of :attribute
	find: function(collectionName, options, cb) {
		console.log(this);
		console.log(options);
		var criteria = options.where || {};

		switch(collectionName){
			case 'users' : return this.getUser(collectionName, criteria, afterwards);
			case 'repos' : return this.getUser(collectionName, criteria, afterwards);;
			case 'orgs'  : return this.getUser(collectionName, criteria, afterwards);;
			case 'gists' : return this.getUser(collectionName, criteria, afterwards);;
			case 'teams' : return this.getUser(collectionName, criteria, afterwards);;
			default: return afterwards('Unkown usage of find() with model ('+ collectionName +') ')
		}

		if (!options.where.attribute) return cb('Please findAll({ attribute: "Attribute Wanted" })');

		var client = adapter.configurations[collectionName];
		var user   = client.user(client._user);
		if (client._type === 'repo') {
			var repo = client.repo(client._user+'/'+client._repo);
			switch (options.where.attribute) {
				case ('info') :
					repo.info(function(err, res){
						if (err) {
							console.log(err);
							cb(err);
						}
						cb(null, res);
					});
					break;
			}
		} else {
			cb();
		}

	},

	// Create an entried of :attribute
	create: function(collectionName, options, cb) {
		console.log(this);
		console.log(options);
	}
};