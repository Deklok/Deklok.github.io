import m from "mithril";
import { User } from "../models/User";

function NewUser() {
    var newUsername;
    var btnDisabled = true;
    return {
        view: function() {
            return m("div",{
                class: "card-panel deep-purple lighten-2",
                style: "border-radius: 10px;margin-top:150px"
            },[
                m("img.header-idol",{
                    src: "resources/idol-header.png",
                    draggable: false,
                }),
                m("div", {
                    class: "card-panel white"
                },[
                    m("div.row",[
                        m("p.flow-text","Hola amiguito. Si estas aqui es porque quieres pasarnos un buen momazo o fanart. A continuación, puedes poner tu nombre de usuario con el que aparecerás en el directo."),
                        m("p.flow-text",{
                            style: "font-weight: bold;"
                        },"(Ten cuidado, no podrás cambiarlo más adelante)")
                    ]),
                    m("div.row",[
                        m("div.input-field",[
                            m("input",{
                                id: "newusername",
                                onkeyup: (e) => {
                                    newUsername = e.target.value;
                                    if (newUsername.length >= 3 ) {
                                        btnDisabled = false;
                                    } else {
                                        btnDisabled = true;
                                    }
                                }
                            }),
                            m("label.active",{
                                for: "newusername"
                            },"Nombre de usuario")
                        ])
                    ]),
                    m("div.row",[
                        m("button",{
                            class: "waves-effect waves-purple btn white",
                            onclick: () => {
                                User.register(newUsername,User.email).then((result) => {
                                    if (result) render = 5;
                                    if (!result) error = true;
                                })
                            },
                            disabled: btnDisabled
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

export { NewUser }