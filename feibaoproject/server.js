/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');

var path = require('path');

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var COMMENTS_FILE = path.join(__dirname, 'data/users.json');
var CART_FILE = path.join(__dirname, 'data/cart.json');

app.set('port', (process.env.PORT || 9999));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
	// Set permissive CORS header - this allows this server to be used only as
	// an API server in conjunction with something like webpack-dev-server.
	//res.setHeader('Access-Control-Allow-Origin', '*');

	// Disable caching so we'll always get the latest comments.
	//res.setHeader('Cache-Control', 'no-cache');
	next();
});

//app.get means to process 'GET' request.
//param1: url
//param2: callback called when the request comes.
//回调函数的参数1为http
app.get('/api/checkUser', function(req, res) {

	fs.readFile(COMMENTS_FILE, function(err, data) {
		if(err) {
			console.error(err);
			process.exit(1);
		}

		var counters = JSON.parse(data);
		console.log('req.query.user=' + req.query.user);

		if(checkUser(counters, req.query.user) === true) {
			res.json({
				ret: true
			});
		} else {
			res.json({
				ret: false
			});
		}
	});
});

app.post('/api/register', function(req, res) {
	//console.log(req.body);
	fs.readFile(COMMENTS_FILE, function(err, data) {

		if(err) {
			console.error(err);
			process.exit(1);
		}

		var counters = JSON.parse(data);

		if(checkUser(counters, req.body.user) === false) {
			res.json({
				ret: false,
				msg: 'user exsited'
			});
			return;
		}

		var newCounter = {
			user: req.body.user,
			password: req.body.password,
		};
		counters.push(newCounter);
		fs.writeFile(COMMENTS_FILE, JSON.stringify(counters, null, 4), function(err) {
			// console.log(JSON.stringify(comments));
			if(err) {
				console.error(err);
				process.exit(1);
			}
			res.json({
				ret: true
			});
		});
	});
});

app.post('/api/login', function(req, res) {
	console.log(req.body);
	fs.readFile(COMMENTS_FILE, function(err, data) {

		if(err) {
			console.error(err);
			process.exit(1);
		}
		console.log(req.body);
		var counters = JSON.parse(data);
		for(var i = 0; i < counters.length; i++) {
			if(counters[i].user === req.body.user && counters[i].password === req.body.password) {
				res.json({
					ret: true
				});
				return;
			}
		}

		res.json({
			ret: false
		});
	});
});
//cart function
app.post('/api/addcart', function(req, res) {
	fs.readFile(CART_FILE, function(err, data) {
		if(err) {
			console.error(err);
			process.exit(1);
		}
		var cart = JSON.parse(data);
		for(var i = 0; i < cart.length; i++) {
			if(cart[i].user === req.body.user) {
				if(cart[i].id === req.body.id) {
					cart[i].count = parseInt(cart[i].count) + parseInt(req.body.count);
					fs.writeFile(CART_FILE, JSON.stringify(cart, null, 4), function(err) {
						if(err) {
							process.exit(1);
						}
						res.json({
							ret: true
						});
					})
					return;
				}
			}
		}
		var user = {
			user: req.body.user,
			id: req.body.id,
			name: req.body.name,
			src: req.body.src,
			price: req.body.price,
			count: req.body.count
		}
		cart.push(user);
		fs.writeFile(CART_FILE, JSON.stringify(cart, null, 4), function() {
			if(err) {
				process.exit(1);
			}
			res.json({
				ret: true
			});
		})
	})
});
app.get('/api/readcart', function(req, res) {
	fs.readFile(CART_FILE, function(err, data) {
		if(err) {
			process.exit(1);
		}
		var cart = JSON.parse(data);
		if(cart.length != 0) {
			res.json(cart);
		}
	})
})
app.post('/api/deletecart', function(req, res) {
		fs.readFile(CART_FILE, function(err, data) {
			if(err) {
				process.exit(1);
			}
			var cart = JSON.parse(data);
			for(var i = 0; i < cart.length; i++) {

				if(cart[i].user === req.body.user) {
					if(cart[i].id === req.body.id) {
						cart.splice(i, 1);
//						console.log(cart);
						fs.writeFile(CART_FILE, JSON.stringify(cart, null, 4), function() {
								if(err) {
									process.exit(1);
								}
								res.json({
									ret: true
								});
							})
													return;
					}
				}
			}
		})
	})
	//
app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});

//function checkId(cart, newid) {
//	for(var i = 0; i < cart.length; i++) {
//		if(cart[i].id === newid) {
//			return false;
//		}
//	}
//	return true;
//}

function checkUser(counters, newUser) {
	for(var i = 0; i < counters.length; i++) {
		if(counters[i].user === newUser) {
			return false;
		}
	}

	return true;
}