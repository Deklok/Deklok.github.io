import m from "mithril";
import { User } from "../models/User";
import { Offline } from "./Offline";
import { Loading } from "./Loading";
import { Ban } from "./Ban";

function Submit() {
    var offline;
    var reviewmsg = null;
    var ban = false;
    var loading = true;
    var onreview;
    var filename;
    var msg;
    var srcimage;
    var styleimg;
    var btndisabled = true;
    var reader = new FileReader();
    reader.onload = function(evt){
        srcimage = evt.target.result;
        styleimg = "height: 150px;width: 100%;object-fit: scale-down;"
        if (srcimage != null) {
            btndisabled = false;
        }
        m.redraw();
    };

    return {
        oninit: function() {
            User.connectsocket();
            User.islive().then((res) => {
                if (res.live) {
                    offline = !res.live;
                    User.pendingsubmission().then((res) => {
                        onreview = res;
                        loading = false;
                        m.redraw();
                    }).catch((error)=> {
                        offline = true;
                        loading = false;
                        m.redraw();
                        console.log(error);  
                    })
                } else {
                    offline = true;
                    loading = false;
                    m.redraw();
                }
                User.socket.on('reviewed',(approbed) => {
                    onreview = false;
                    reviewmsg = (approbed)?"Tu meme fue aprobado Pog":"Tu meme fue rechazado Sadge";
                    m.redraw();
                });
                User.socket.on('banned',() => {
                    onreview = false;
                    ban = true;
                    m.redraw();
                });
            }).catch((error) => {
                offline = true;
                loading = false;
                console.log(error);
            })
        },
        view: function() {
            return offline ? m(Offline) : m("div",{
                class: "card-panel deep-purple lighten-2",
                style: "border-radius: 10px;margin-top:150px"
            },[
                m("img.header-idol",{
                    src: "resources/idol-submission.png",
                    draggable: false,
                }),
                m("div",{
                    class: "card-panel white",
                    style: "border-radius: 10px;"
                },[
                    loading ? m(Loading) : onreview ? m("div",[
                        m("img",{
                            src: "resources/idol-mod.png",
                            draggable: false,
                            style: "height: 20em;"
                        }),
                        m("p.flow-text","Estamos revisando tu última solicitud. Una vez rechazada o aprobada, podrás enviar otra")
                    ]) : ban ? m(Ban) 
                    : m("div",[
                        reviewmsg != null && m("div",reviewmsg),
                        m("blockquote",[
                            m("div",{
                                style: "font-weight: bold;"
                            },[ "Advertencia: " ]),
                            m("div",[
                                "Tu meme / fanart pasará a ser revisado antes de ser mostrado en directo. Por favor, no subas cosas que no puedan ser mostradas en directo. El mensaje es opcional."
                            ])
                        ]),
                        m("div.row",{
                            style: "width: 50%"
                        },[
                            m("div",{
                                class: "file-field input-field"
                            },[
                                m("button",{
                                    class: "waves-effect waves-light btn purple",
                                    style: "float: none"
                                },[
                                    m("span","Subir"),
                                    m("input",{
                                        type: "file",
                                        onchange: function(e) {
                                            if (e.target.files[0] != null) {
                                                var file = e.target.files[0];
                                                if (file.type == "image/jpeg" || file.type == "image/jpg") {
                                                    filename = e.target.files[0].name;
                                                    reader.readAsDataURL(e.target.files[0]);
                                                } else {
                                                    filename = "Porfavor elije un archivo JPG o JPEG. El programador ta todo meco aun para otros formatos";
                                                }
                                            }
                                        }
                                    })
                                ]),
                                m("div.file-path-wrapper",{
                                    style: "display: none"
                                },[
                                    m("input",{
                                        class: "file-path",
                                        type: "text",
                                        disabled: true,
                                    })
                                ])
                            ])
                        ]),
                        m("div.row",{
                            style: "height: 150px"
                        },[
                            m("img",{
                                src: srcimage,
                                style: styleimg
                            })
                        ]),
                        m("div.row",[
                            m("p.flow-text",filename)
                        ]),
                        m("div.row",{
                            style: "width: 80%"
                        },[
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
                                disabled: btndisabled,
                                onclick: function() {
                                    btndisabled = true;
                                    User.socket.emit('sendsubmission',{
                                        username: User.username,
                                        msg: msg,
                                        image: srcimage
                                    },(response)=>{
                                        if (response) { 
                                            onreview = true
                                            styleimg = "display:none";
                                            filename = "";
                                            m.redraw();
                                        }
                                    });
                                }
                            },[
                                m("div",{
                                    class: "grey-text text-darken-3"
                                },"Enviar")
                            ])
                        ])
                    ])
                ])
            ])
        }
    }
}

export { Submit }