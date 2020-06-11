import m from "mithril";
import { User } from "../models/User";

function Mod() {
    var queue = [
        {username: "olabuenasnoches", msg: "ola me zaludaz con la voz d vuLma"},
        {username: "hahaxd", msg: "Ponte unos corridos alterados alv compa"},
        {username: "spammer", msg: "babe, i'm breaking up with you. it's not you, you were poggers. it's me, i'm omegalul. im sorry if this is pepehands but it has to be done, i've just been feeling pepega and our relationship has been weirdchamp for months, it's time to end it, no kappa."}
    ];
    
    return {
        oninit: function() {
            User.connectmod();
            User.socket.on('submission',(msg) => {
                queue.push({username: "testing", msg: msg})
                m.redraw();
            })
        },
        view: function() {
            return m("div",{
                class: "card-panel deep-purple lighten-2",
                style: "border-radius: 10px;"
            },[
                m("div",{
                    class: "card-panel white"
                },[
                    m("table.striped",{
                        class: ""
                    },[
                        m("thead",[
                            m("th","Img"),
                            m("th","Username"),
                            m("th.msg","Comentario"),
                            m("th","Acciones")
                        ]),
                        m("tbody",{
                            oncreate: function() {
                                var elems = document.querySelectorAll('.materialboxed');
                                M.Materialbox.init(elems);
                            }
                        },[
                            queue.map(function(i) {
                                return m("tr",[
                                    m("td.center",[
                                        m("div.center",[
                                            m("img",{
                                                src: "https://tinyurl.com/yag8ahjg",
                                                class: "materialboxed",
                                                style: "height: 5em;",
                                            })
                                        ])
                                    ]),
                                    m("td",i.username),
                                    m("td",i.msg),
                                    m("td",[
                                        m("div.center",[
                                            m("button",{
                                                class: "waves-effect waves-light btn green btn-mod",
                                            },"A"),
                                            m("button",{
                                                class: "waves-effect waves-light btn red btn-mod",
                                            },"R"),
                                            m("button",{
                                                class: "waves-effect waves-light btn purple btn-mod",
                                            },"B")
                                        ])
                                    ])
                                ])
                            })
                        ])
                    ])
                ])
            ])
        }
    }
}

export { Mod }