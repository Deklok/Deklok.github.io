import m from "mithril";

function Streamer() {
    return {
        view: function(vnode) {
            return m("div",{
                class: "card-panel #8c9eff indigo accent-1"
            },[
                m("div",[
                    m("div",{
                        class: "waves-effect waves-light btn white"
                    },[
                        m("div",{
                            class: "black-text"
                        },"Iniciar sesion en tu gfa")
                    ])
                ]),
                m("div",[
                    m("div",{
                        class: "waves-effect waves-light btn white"
                    },[
                        m("div",{
                            class: "black-text"
                        },"Pantalla")
                    ])
                ]),
                m("div",[
                    m("div",{
                        class: "waves-effect waves-light btn white"
                    },[
                        m("div",{
                            class: "black-text"
                        },"Moderación")
                    ])
                ]),
                m("div",[
                    m("div",{
                        class: "waves-effect waves-light btn white"
                    },[
                        m("div",{
                            class: "black-text"
                        },"Configuración")
                    ])
                ]),
                m("div",[
                    m("div",{
                        class: "waves-effect waves-light btn white"
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