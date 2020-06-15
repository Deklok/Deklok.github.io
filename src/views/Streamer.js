import m from "mithril";
import { User } from "../models/User";
import { Mod } from "./Mod";
import { Loading } from "./Loading";

var moderacion = false;

function Streamer() {
    var livesession = false;
    var initialloading = true;
    var loading = false;
    var idlive;
    return {
        oncreate: function () {
            if (User.socket == null) {
                User.connectsocket();
            }
            User.islive().then((res) => {
                if (res.live) {
                    livesession = res.live;
                    idlive = res.id;
                    initialloading = false;
                }
            }).catch((error) => {
                console.log(error);
                initialloading = false;
            })
        },
        view: function (vnode) {
            return moderacion ? m("div",[
                m("button",{
                    class: "waves-effect waves-light btn purple",
                    onclick: function() {
                        moderacion = false;
                    },
                    style: "margin-top: 10px;"
                },"Regresar al panel de control"),
                m(Mod,{
                    oninit: function() {
                        User.conmodroom();
                    }
                })
            ]) : m("div", {
                class: "card-panel deep-purple lighten-2",
                style: "border-radius: 10px;width: 600px;"
            }, [
                m("div", {
                    class: "card-panel white"
                }, [
                    initialloading ? m(Loading) : m("div",[
                        m("div", {
                            style: "margin-bottom: 10%; text-align: left"
                        }, [
                            m("button", {
                                class: "waves-effect waves-purple btn white",
                                style: "height: 5em;width: 40%;",
                                onclick: () => {
                                    loading = !loading;
                                    if (livesession) {
                                        User.socket.emit('endlive', idlive, (ended) => {
                                            console.log("Live ended: " + ended);
                                            loading = !loading;
                                        })
                                    } else {
                                        User.socket.emit('startlive', (id) => {
                                            console.log("Id del live: " + id);
                                            idlive = id;
                                            loading = !loading;
                                        })
                                    }
                                    livesession = !livesession;
                                }
                            }, [
                                m("div", {
                                    class: "grey-text text-darken-3"
                                }, livesession ? "Terminar sesión" : "Iniciar sesión")
                            ]),
                            !livesession ? m("span", {
                                id: "livebadge",
                                class: "badge purple lighten-3",
                            }, [
                                m("div", {
                                    class: "white-text"
                                }, "LIVE")
                            ]) : m("span", {
                                id: "livebadge",
                                class: "badge red darken-4",
                            }, [
                                m("div", {
                                    class: "white-text"
                                }, "LIVE")
                            ])
                        ]),
                        m("div", {
                            class: "btn-streamer-main"
                        }, [
                            m("button", {
                                class: "waves-effect waves-purple btn white btn-mainmenu",
                                disabled: !livesession
                            }, [
                                m("div", {
                                    class: "grey-text text-darken-3"
                                }, "Pantalla")
                            ])
                        ]),
                        m("img.idol-panel", {
                            src: "resources/idol-panel.png",
                            draggable: false,
                        }),
                        m("div", {
                            class: "btn-streamer-main"
                        }, [
                            m("button", {
                                class: "waves-effect waves-purple btn white btn-mainmenu",
                                disabled: !livesession,
                                onclick: function () {
                                    moderacion = true;
                                }
                            }, [
                                m("div", {
                                    class: "grey-text text-darken-3"
                                }, "Moderación")
                            ])
                        ]),
                        m("div", {
                            class: "btn-streamer-main"
                        }, [
                            m("button", {
                                class: "waves-effect waves-purple btn white btn-mainmenu",
                                disabled: true
                            }, [
                                m("div", {
                                    class: "grey-text text-darken-3"
                                }, "Configuración")
                            ])
                        ]),
                        m("div", {
                            style: "margin-top: 20%;text-align: right;"
                        }, [
                            m("button", {
                                class: "waves-effect waves-purple btn white",
                                disabled: true
                            }, [
                                m("div", {
                                    class: "grey-text text-darken-3"
                                }, "Descargar imágenes del último live")
                            ])
                        ]),
                    ])
                ])
            ])
        }
    }
}

export { Streamer }