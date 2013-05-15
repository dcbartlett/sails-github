/*---------------------------------------------------------------
	:: sails-github
	-> adapter
---------------------------------------------------------------*/

var async = require('async'),
		github = require('octonode'),
		_ = require('underscore');

_.str = require('underscore.string');

var adapter = module.exports = {

	syncable: false,

	configurations: {},

	defaults: {},

	// This method runs when a model is initially registered at server start time
	registerCollection: function(collection, cb) {

		// Requre that the Type were specified
		//   Types: user, repo
		// TODO: org, gist, team, search, me/self
		if (!collection.type) return cb('No Type specified (e.g. gists)');
		if (!collection.user) return cb('No User specified (e.g. balderdashy)');
		if (collection.type === 'repo') {
			if (!collection.repo) return cb('No Repository specified (e.g. sails)');
		}

		init(collection, cb);
	},

	// Optional hook fired when a model is unregistered, typically at server halt
	// useful for tearing down remaining open connections, etc.
	teardown: function(cb) {
		cb();
	},

	// Create an entried of :attribute
	create: function(collectionName, options, cb) {
		console.log(this);
		console.log(options);
	},

	// Find All entries of :attribute
	find: function(collectionName, options, cb) {
		console.log(this);
		console.log(options);
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

	}
};

//////////////                 //////////////////////////////////////////
////////////// Private Methods //////////////////////////////////////////
//////////////                 //////////////////////////////////////////

function init(collection, cb) {
	var client = new github.client();

	adapter.configurations[collection.identity] = client;
	adapter.configurations[collection.identity]._type = collection.type;
	adapter.configurations[collection.identity]._user = collection.user;
	if (collection.repo) {
		adapter.configurations[collection.identity]._repo = collection.repo;
	}

	if (cb) return cb(null, client);
}