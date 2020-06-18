import m from "mithril";
import { User } from "../models/User";
import { Streamer } from "../views/Streamer";
import { Mod } from "../views/Mod";
import { Submit } from "../views/Submit";
import { NewUser } from "../views/NewUser";
import { Ban } from "../views/Ban";

function Main() {    
    var GoogleAuth;    
    var error = false;
    return {        
        oninit: function() {
            document.oncontextmenu = new Function("return false");
            var script = document.createElement('script');
            script.src = "https://apis.google.com/js/platform.js"
            script.async = true;
            script.defer = true;
            script.onload = function() {
                gapi.load('auth2', function() {
                    gapi.auth2.init({
                        client_id: '325821250313-rpe75eqduheb1dduudjdq4cbhb72fro4.apps.googleusercontent.com'
                    }).then(function(response){
                        console.log("Google Auth loaded");
                        GoogleAuth = response;
                        if (GoogleAuth.isSignedIn.get()) {
                            var GoogleUser = GoogleAuth.currentUser.get();
                            console.log(GoogleUser.getBasicProfile().getEmail())
                            User.login(GoogleUser.getBasicProfile().getEmail()).then(()=> {
                                if (User.exist) {
                                    User.role = (User.role!=null)?User.role:5;
                                } else {
                                    User.role = 10;
                                }
                                m.redraw();
                            });
                        }
                        GoogleAuth.currentUser.listen(function(GoogleUser) {
                            console.log(GoogleUser.getBasicProfile().getEmail())
                            User.login(GoogleUser.getBasicProfile().getEmail()).then(()=> {
                                if (User.exist) {
                                    User.role = (User.role!=null)?User.role:5;
                                } else {
                                    User.role = 10;
                                }
                                m.redraw();
                            });
                        })
                    })
                });
            }
            document.head.append(script);
        },
        view: function () {
            return m("div.main", [
                User.role==0 && m("div",{
                    class: "card-panel deep-purple lighten-2",
                    style: "border-radius: 10px; min-width:300px;width: min-content;"
                },[
                    m("div.row",[
                        m("div.white-text",{
                            style: "font-size: 3em;font-weight: 500;"
                        },"Bienvenido")
                    ]),
                    m("div.text-flow",{
                        style: "font-size: 1.6em;font-weight: 600;color: white"
                    },"Para avanzar debes iniciar sesión con Google"),
                    m("img",{
                        src: "resources/idol-login.png",
                        draggable: false,
                        style: "max-width: 300px;width: 60%;"
                    }),
                    m("div", {
                        class: "g-signin2",
                        style: {
                            "margin-left": "27%",
                        }
                    })
                ]),
                User.role==10 && m(NewUser),
                User.role==-1 && m(Ban),
                User.role==1 && m(Streamer),
                User.role==2 && m(Mod),
                User.role==5 && m(Submit),
                error && m("div","Algun error paso en las peticiones al servidor qlero :<")
            ])
        }
    }
}

export { Main }