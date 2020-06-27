import m from "mithril";
import io from 'socket.io-client';
var BASE_URL = "http://ec2-100-24-238-208.compute-1.amazonaws.com";
//var BASE_URL = "https://deklokbackend.xyz";
//var BASE_URL = "https://localhost:8443";

var User = {
    email: null,
    username: null,
    exist: null,
    role: 0,
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
                console.log(error);
                reject(error);
            })
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
                    reject(false);
                }
            }).catch(function(error) {
                console.log(error);
                reject(false);
            })
        })
    },
    usernameExists: function(username) {
        return new Promise((resolve,reject) => {
            m.request({
                method: "POST",
                url: BASE_URL + "/userexists",
                body: {username: username}
            })
            .then(function(result) {
                if (!result.error) {
                    var res = result.result;
                    resolve(res.exists);
                } else {
                    reject(false);
                }
            }).catch(function(error) {
                console.log(error);
                reject(false);
            })
        })
    },
    islive: function() {
        return new Promise((resolve,reject) => {
            m.request({
                method: "GET",
                url: BASE_URL + "/islive"
            })
            .then(function(result) {
                if (!result.error) {
                    var res = result.result;
                    resolve(res);
                } else {
                    reject("Error in response (not with server)");
                }
            }).catch(function(error) {
                reject(error);
            })
        })
    },
    pendingsubmission: function() {
        return new Promise((resolve,reject) => {
            m.request({
                method: "POST",
                url: BASE_URL + "/pendingsubmission",
                body: {username: User.username}
            })
            .then(function(result) {
                if (!result.error) {
                    var res = result.result;
                    resolve(res.pending);
                } else {
                    reject("Error in response (not with server)");
                }
            }).catch(function(error) {
                reject(error);
            })
        })
    },
    getqueue: function(idlive) {
        return new Promise((resolve,reject) => {
            m.request({
                method: "POST",
                url: BASE_URL + "/getqueue",
                body: {idlive: idlive}
            })
            .then(function(result) {
                if (!result.error) {
                    var res = result.result;
                    resolve(res.queue);
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
    connectlivestream: function() {
        User.socket = io.connect(BASE_URL);
        User.socket.on('connect',function() {
            console.log("Connected to panel room");
            User.socket.emit("livestream");
        })
    },
    conmodroom: function() {
        User.socket.emit("mod");
    }
}

export { User }