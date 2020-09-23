import m from "mithril";
import { User } from "../models/User";
import { Offline } from "./Offline";
import { Loading } from "./Loading";

function Mod() {
    var offline;
    var loading = true;
    var initialloading = true;
    var updatefromevent = false;
    var btnevents = false;
    var statusloading = false;
    var queue = [];
    var eleminit = [];
    var newsubmission = false;

    return {
        oninit: function () {
            if (User.socket==null){
                User.connectmod();
            } 
            User.socket.on('submission', (submission) => {
                queue.push({ username: submission.username, msg: submission.msg, src: submission.image });
                newsubmission = true;
                m.redraw();
            });
            User.socket.on('updatequeue',(username) => {
                queue = queue.filter( u => u.username !== username );
                btnevents = false;
                m.redraw();
            });
            User.islive().then((res) => {
                if (res.live) {
                    offline = !res.live;
                    User.getqueue(res.id).then((res2) => {
                        for (var i = 0; i < res2.length; i++) {
                            var b64encoded = Buffer.from( res2[i].src.data).toString('base64');
                            var preview = b64encoded.split("base64")[0];
                            var format = preview.split("/")[1];
                            var base64String = "data:image/" + format + ";base64," + b64encoded.split("base64")[1]; 
                            preview = base64String.substring(0,50);
                            console.log(preview);
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
        view: function () {
            return offline ? m(Offline) : m("div", {
                class: "card-panel deep-purple lighten-2",
                style: "border-radius: 10px;margin-top:150px;min-width: 870px;"
            }, [
                m("img.header-idol",{
                    src: "resources/idol-mod.png",
                    draggable: false,
                }),
                m("div", {
                    class: "card-panel white"
                }, [
                    loading ? m(Loading) : m("div",[
                        m("table.striped",{
                            oncreate: () => {
                                if (initialloading) {
                                    var elems = document.querySelectorAll('.materialboxed');
                                    M.Materialbox.init(elems);
                                    initialloading = false;
                                }
                            },
                            onupdate: () => {
                                if (newsubmission) {
                                    console.log(elems);
                                    var elems = document.querySelectorAll('.materialboxed');
                                    M.Materialbox.init(elems[elems.length-1]);
                                    newsubmission = false;
                                }
                            }
                        },[
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
                                                    disabled: btnevents,
                                                    onclick: () => {
                                                        btnevents = true;
                                                        User.socket.emit("changestatussubmission",{
                                                            status: 'A',
                                                            username: i.username,
                                                            msg: i.msg,
                                                            src: i.src,
                                                            mod: User.username
                                                        })
                                                    }
                                                }, "A"),
                                                m("button", {
                                                    class: "waves-effect waves-light btn red btn-mod",
                                                    disabled: btnevents,
                                                    onclick: () => {
                                                        btnevents = true;
                                                        User.socket.emit("changestatussubmission",{
                                                            status: 'R',
                                                            username: i.username,
                                                            mod: User.username
                                                        })
                                                    }
                                                }, "R"),
                                                m("button", {
                                                    class: "waves-effect waves-light btn purple btn-mod",
                                                    disabled: btnevents,
                                                    onclick: () => {
                                                        btnevents = true;
                                                        User.socket.emit("changestatussubmission",{
                                                            status: 'B',
                                                            username: i.username,
                                                            mod: User.username
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