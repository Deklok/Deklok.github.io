import m from "mithril";
import { User } from "../models/User";
import { Offline } from "./Offline";
import { Loading } from "./Loading";

function Mod() {
    var offline;
    var loading = true;
    var statusloading = false;
    var queue = [];
    var eleminit = [];

    return {
        oninit: function () {
            if (User.socket==null){
                User.connectmod();
            } 
            User.socket.on('submission', (submission) => {
                queue.push({ username: submission.username, msg: submission.msg, src: submission.image });
                m.redraw();
            });
            User.socket.on('updatequeue',(username) => {
                queue = queue.filter( u => u.username !== username );
                m.redraw();
            })
            User.islive().then((res) => {
                if (res.live) {
                    offline = !res.live;
                    User.getqueue(res.id).then((res2) => {
                        for (var i = 0; i < res2.length; i++) {
                            var b64encoded = btoa(String.fromCharCode.apply(null,res2[i].src.data));
                            var base64String = "data:image/*;base64," + b64encoded.split("base64")[1]; 
                            queue.push({
                                username: res2[i].username,
                                msg: res2[i].msg,
                                src: base64String
                            })
                        }
                        loading = false;
                    })
                } else {
                    offline = true;
                    loading = false;
                }
            }).catch((error) => {
                offline = true;
                console.log(error);
            })
        },
        onupdate: function () {
            var elems = document.querySelectorAll('.materialboxed');
            M.Materialbox.init(elems[elems.length-1]);
        },
        view: function () {
            return offline ? m(Offline) : m("div", {
                class: "card-panel deep-purple lighten-2",
                style: "border-radius: 10px;margin-top:150px"
            }, [
                m("img.header-idol",{
                    src: "resources/idol-mod.png",
                    draggable: false,
                }),
                m("div", {
                    class: "card-panel white"
                }, [
                    loading ? m(Loading) : m("div",[
                        m("table.striped",[
                            m("thead", [
                                m("th", "Img"),
                                m("th", "Username"),
                                m("th.msg", "Comentario"),
                                m("th", "Acciones")
                            ]),
                            m("tbody", [
                                queue.map(function (i) {
                                    return m("tr", [
                                        m("td.center", [
                                            m("img", {
                                                src: i.src,
                                                class: "materialboxed",
                                                style: "height: 5em;object-fit: scale-down;display: inline",
                                            })
                                        ]),
                                        m("td", i.username),
                                        m("td", i.msg),
                                        m("td", [
                                            m("div.center", [
                                                m("button", {
                                                    class: "waves-effect waves-light btn green btn-mod",
                                                    onclick: () => {
                                                        User.socket.emit("changestatussubmission",{
                                                            status: 'A',
                                                            username: i.username,
                                                            msg: i.msg,
                                                            src: i.src
                                                        },(response) => {
                                                            if (response) {
                                                                queue = queue.filter( u => u.username !== i.username );
                                                                m.redraw();
                                                            }
                                                        })
                                                    }
                                                }, "A"),
                                                m("button", {
                                                    class: "waves-effect waves-light btn red btn-mod",
                                                    onclick: () => {
                                                        User.socket.emit("changestatussubmission",{
                                                            status: 'R',
                                                            username: i.username
                                                        },(response) => {
                                                            if (response) {
                                                                queue = queue.filter( u => u.username !== i.username );
                                                                m.redraw();
                                                            }
                                                        })
                                                    }
                                                }, "R"),
                                                m("button", {
                                                    class: "waves-effect waves-light btn purple btn-mod",
                                                    onclick: () => {
                                                        User.socket.emit("changestatussubmission",{
                                                            status: 'B',
                                                            username: i.username
                                                        },(response) => {
                                                            if (response) {
                                                                queue = queue.filter( u => u.username !== i.username );
                                                                m.redraw();
                                                            }
                                                        })
                                                    }
                                                }, "B")
                                            ])
                                        ])
                                    ])
                                })
                            ])
                        ])
                    ])
                ])
            ])
        }
    }
}

export { Mod }