import m from "mithril";
import io from 'socket.io-client';
var BASE_URL = "https://ec2-54-173-20-147.compute-1.amazonaws.com:8080";
//var BASE_URL = "https://localhost:8080";

var User = {
    email: null,
    username: null,
    exist: null,
    role: null,
    socket: null,
    login: function(email) {
        return new Promise((resolve,reject) => {
            m.request({
                method: "POST",
                url: BASE_URL + "/login",
                body: {email: email},
            })
            .then(function(result) {
                if (!result.error) {
                    var res = result.result;
                    User.email = email;
                    User.username = res.username;
                    User.role = res.role;
                    User.exist = res.exists;
                    resolve();
                } else {
                    reject("Error in response (not with server)");
                }
            }).catch(function(error) {
                reject(error);
            })
        })
    },
    connectsocket: function() {
        User.socket = io.connect(BASE_URL);
        User.socket.on('connect',function() {
            console.log("Connected to socket server Pog");
            User.socket.emit('user',User.username,() => {
                console.log("logged in succesfully");
            });
        })
    },
    connectmod: function() {
        User.socket = io.connect(BASE_URL);
        User.socket.on('connect',function() {
            console.log("Connected to socket server Pog");
            User.socket.emit('user',User.username,() => {
                User.socket.emit('mod');
            });
        })
    },
    register: function(username,email) {
        return new Promise((resolve,reject) => {
            m.request({
                method: "POST",
                url: BASE_URL + "/register",
                body: {email: email, username: username}
            })
            .then(function(result) {
                if (!result.error) {
                    var res = result.result;
                    resolve(res.registered);
                } else {
                    reject("Error in response (not with server)");
                }
            }).catch(function(error) {
                reject(error);
            })
        })
    }
}

export { User }