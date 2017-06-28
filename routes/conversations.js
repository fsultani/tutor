var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/user')
var Message = require('../models/message')

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/');
	}
}

// Get the conversation with the selected member
router.get('/:id', ensureAuthenticated, (req, res, next) => {
	User.findOne({ _id: req.user._id }, (err, user) => {
		Message.find({conversations: req.params.id}, (err, messages) => {
			console.log("before messages\n", messages)
			res.render('user_messages', {
				user: user,
				user_messages: messages,
				conversation_id: req.params.id,
				helpers: {
		      if_eq: function(a, b, options) {
		        if (a == b) {
		          return options.fn(this);
		        } else {
		        	return options.inverse(this)
		        }
		      }
		    }
			})
			Message.findByIdAndUpdate({ conversations: req.params.id }, { $set: { unread: false}}, (err, message) => {})
			Message.find({ conversations: req.params.id }, (err, messages) => {
				console.log("after messages\n", messages)
			})
		})
	})
})

module.exports = router;
