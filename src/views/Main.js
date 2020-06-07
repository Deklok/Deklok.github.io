import m from "mithril";
import { User } from "../models/User";

function Main() {
    var render = 0;
    var GoogleAuth;
    var newUsername;
    var error = false;
    return {        
        oncreate: function() {
            gapi.load('auth2', function() {
                gapi.auth2.init({
                    client_id: '325821250313-rpe75eqduheb1dduudjdq4cbhb72fro4.apps.googleusercontent.com'
                }).then(function(response){
                    GoogleAuth = response
                    GoogleAuth.currentUser.listen(function(GoogleUser) {
                        console.log(GoogleUser.getBasicProfile().getEmail())
                        User.login(GoogleUser.getBasicProfile().getEmail()).then(()=> {
                            if (User.exist) {
                                render = (User.role!=null)?User.role:5;
                            } else {
                                render = 10;
                            }
                            m.redraw();
                        });
                    })
                })
            });
        },
        view: function () {
            return m("div.main", [
                render==0 && m("div",[
                    m("div",{
                        style: {
                            "margin-bottom": "1em"
                        }
                    },"Bienvenido a mi prueba pitera :D"),
                    m("div", {
                        class: "g-signin2",
                        style: {
                            position: "absolute",
                            left: "50%",
                            "margin-left": "-50px",
                        }
                    })
                ]),
                render==10 && m("div",[
                    "Detecte que eres nuevo. Aqui deberia salir algo para que metas el username que usaras pero probablemente el programador es tan huevon que no esta aún",
                    m("div",[
                        m("input",{
                            onchange: (e) => {
                                newUsername = e.target.value;
                            }
                        }),
                    ]),
                    m("div",[
                        m("button",{
                            onclick: () => {
                                User.register(newUsername,User.email).then((result) => {
                                    if (result) render = 5;
                                    if (!result) error = true;
                                })
                            }
                        },[
                            "PICALE WE"
                        ])
                    ])
                ]),
                render==-1 && m("div","Si ves esto, estuviste tan meco que te banearon LMAO"),
                render==1 && m("div","Si ves esto, tienes perfil de streamer o:"),
                render==2 && m("div", "Si ves esto, eres moderador uwu"),
                render==5 && m("div","Si ves esto eres un mortal más. Si se supone que tienes que ver otra cosa, dile a jebus que no mame"),
                error && m("div","Algun error paso en las peticiones al servidor qlero :<")
            ])
        }
    }
}

export { Main }