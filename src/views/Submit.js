import m from "mithril";
import { User } from "../models/User";

function Submit() {

    var msg;

    return {
        oninit: function() {
            User.connectsocket();
        },
        view: function() {
            return m("div",{
                class: "card-panel deep-purple lighten-2",
                style: "border-radius: 10px;"
            },[
                m("div",{
                    class: "card-panel white",
                    style: "border-radius: 10px;"
                },[
                    m("div.row",[
                        m("div.input-field",[
                            m("textarea.materialize-textarea",{
                                id: "msgsubmission",
                                onchange: function(e) {
                                    msg = e.target.value;
                                }
                            }),
                            m("label",{
                                for: "msgsubmission"
                            }, "Mensaje")
                        ])
                    ]),
                    m("div.row",[
                        m("buton",{
                            class: "waves-effect waves-purple btn white",
                            onclick: function() {
                                console.log(msg);
                                User.socket.emit('sendsubmission',msg);
                            }
                        },[
                            m("div",{
                                class: "grey-text text-darken-3"
                            },"Enviar")
                        ])
                    ])
                ])
            ])
        }
    }
}

export { Submit }