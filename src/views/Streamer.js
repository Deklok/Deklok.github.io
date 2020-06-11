import m from "mithril";
import { User } from "../models/User";

function Streamer() {
    var socket;
    var livesession = false;
    return {
        oninit: function() {
            User.connectsocket();
        },
        view: function(vnode) {
            return m("div",{
                class: "card-panel deep-purple lighten-2",
                style: "border-radius: 10px;"
            },[
                m("div",{
                    style: "margin-bottom: 10%; text-align: left"
                },[
                    m("button",{
                        class: "waves-effect waves-purple btn white",
                        style: "height: 5em;width: 40%;",
                        onclick: () => {
                            var badge = document.getElementById("livebadge").classList;
                            if (livesession) {
                                badge.remove("red","darken-4");
                                badge.add("purple","lighten-3");
                            } else {
                                badge.remove("purple","lighten-3");
                                badge.add("red","darken-4");
                            }
                            livesession = !livesession;
                        }
                    },[
                        m("div",{
                            class: "grey-text text-darken-3"
                        },"Iniciar sesion en tu gfa")
                    ]),
                    m("span",{
                        id: "livebadge",
                        class: "badge purple lighten-3"
                    },[
                        m("div",{
                            class: "white-text"
                        },"LIVE")
                    ])
                ]),
                m("div",{
                    class: "btn-streamer-main"
                },[
                    m("button",{
                        class: "waves-effect waves-purple btn white btn-mainmenu"
                    },[
                        m("div",{
                            class: "grey-text text-darken-3"
                        },"Pantalla")
                    ])
                ]),
                m("div",{
                    class: "btn-streamer-main"
                },[
                    m("button",{
                        class: "waves-effect waves-purple btn white btn-mainmenu"
                    },[
                        m("div",{
                            class: "grey-text text-darken-3"
                        },"Moderación")
                    ])
                ]),
                m("div",{
                    class: "btn-streamer-main"
                },[
                    m("button",{
                        class: "waves-effect waves-purple btn white btn-mainmenu"
                    },[
                        m("div",{
                            class: "grey-text text-darken-3"
                        },"Configuración")
                    ])
                ]),
                m("div",{
                    style: "margin-top: 20%;text-align: right;"
                },[
                    m("button",{
                        class: "waves-effect waves-purple btn white",
                    },[
                        m("div",{
                            class: "grey-text text-darken-3"
                        },"Descargar pack")
                    ])
                ]),
            ])
        }
    }
}

export { Streamer }