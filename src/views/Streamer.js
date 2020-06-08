import m from "mithril";

function Streamer() {
    var livesession = false;
    return {
        view: function(vnode) {
            return m("div",{
                class: "card-panel purple darken-4",
                style: "border-radius: 10px;"
            },[
                m("div",{
                    style: "margin-bottom: 10%; text-align: left"
                },[
                    m("button",{
                        class: "waves-effect waves-purple btn white",
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
                            class: "black-text"
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
                        class: "waves-effect waves-purple btn white"
                    },[
                        m("div",{
                            class: "black-text"
                        },"Pantalla")
                    ])
                ]),
                m("div",{
                    class: "btn-streamer-main"
                },[
                    m("button",{
                        class: "waves-effect waves-purple btn white"
                    },[
                        m("div",{
                            class: "black-text"
                        },"Moderación")
                    ])
                ]),
                m("div",{
                    class: "btn-streamer-main"
                },[
                    m("button",{
                        class: "waves-effect waves-purple btn white"
                    },[
                        m("div",{
                            class: "black-text"
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
                            class: "black-text"
                        },"Descargar pack")
                    ])
                ]),
            ])
        }
    }
}

export { Streamer }