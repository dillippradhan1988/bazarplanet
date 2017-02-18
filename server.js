process.env.NODE_ENV            =   process.env.NODE_ENV || 'development';
var mongoose                    =   require('./config/mongoose');
var express                     =   require('./config/express');
var passport 					= 	require('./config/passport');

var db                          =   mongoose();
var app                         =   express(db);
var passport 					= 	passport();

//app.set('port', process.env.PORT || 3000);
//app.listen(process.env.PORT);

app.listen(3000,'127.0.0.1');

module.exports                  =   app;

console.log('Server running at http://localhost:3000');
//console.log('Server running at http://localhost:'+process.env.PORT);*/
/*var cb 	=	function(arg1, arg2) { 
	console.log('Finished eating my sandwich.'+ arg1 +" "+ arg2);
};

function mySandwich(param1, param2, callback) {
    console.log('Started eating my sandwich.\n\nIt has: ' + param1 + ', ' + param2);
    callback(param1,param2);
}

mySandwich('ham', 'cheese', cb);
*/