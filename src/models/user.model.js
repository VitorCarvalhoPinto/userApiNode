const res = require('express/lib/response');
var dbConn = require('./../../config/db.config')

var User = function(user){
    this.id    = user.id;
    this.name  = user.name;
    this.age   = user.age;
    this.email = user.email;
}

User.create = function(newUser, result){
    dbConn.query("INSERT INTO users set ?", newUser, 
    function(err,res){
        if(err){
            console.log('error: ', err)
            result(err, null)
        }else{
            console.log(res.insertId)
            result(null, res.insertId)
        }
    })
}

User.findAll = function(result){
    dbConn.query("SELECT * FROM users", 
    function(err, res){
        if(err){
            console.log('error: ', err)
            result(err, null)
        }else {
            console.log('users: ', res)
            result(null, res)
        }
    })
}

User.findById = function(id, result){
    dbConn.query("SELECT * FROM users where id = ?", id, 
    function(err, res){
        if(err){
            console.log('error: ', err)
            result(err, null)
        } else {
            console.log(res.insertId)
            result(null, res)
        }
    })
}

User.update = function(id, user, result){
    dbConn.query("UPDATE users SET name=?, age=?, email=? where id=?", [user.name, user.age, user.email, id], 
    function(err, res){
        if(err){
            console.log('error: ', err)
            result(err, null)
        }else{
            result(null, res)
        }
    })
}

User.delete = function(id, result){
    dbConn.query("DELETE FROM users WHERE id=?", [id], 
    function(err, res){
        if(err){
            console.log('error: ', err)
            result(err, null)
        }else {
            result(null, res)
        }
    })
}

module.exports = User