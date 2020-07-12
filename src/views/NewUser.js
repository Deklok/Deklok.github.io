import m from "mithril";
import { User } from "../models/User";

function NewUser() {
    var newUsername;
    var btnDisabled = true;
    var userInUse = false;
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
                    userInUse && m("div",{
                        style: "font-size: 1.5em;color: red;"
                    },"Este nombre de usuario ya está en uso"),
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
                                },
                                maxlength: 30
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
                                btnDisabled = true;
                                userInUse = false;
                                User.usernameExists(newUsername).then((result) => {
                                    if (!result) {
                                        User.register(newUsername,User.email).then((result2) => {
                                            if (result2) {
                                                User.role = 5;
                                                User.username = newUsername;
                                            }
                                            if (!result2) error = true;
                                            btnDisabled = false;
                                        })
                                    } else {
                                        userInUse = true;
                                        btnDisabled = false;
                                    }
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