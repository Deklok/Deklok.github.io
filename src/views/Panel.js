import m from "mithril";
import { User } from "../models/User";

function Panel() {
    var onscreen = false;
    var post;
    function removefromscreen() { 
        onscreen = false
        m.redraw();
        post = null
    }
    return {
        oncreate: function() {
            if (User.socket == null) {
                User.connectlivestream();
            } else {
                User.socket.emit("livestream");
            }
            User.socket.on('new',(submission) => {
                post = {
                    username: submission.username,
                    msg: submission.msg,
                    src: submission.src
                };
                console.log(post);
                onscreen = true;
                m.redraw();
                setTimeout(removefromscreen,10000);
            });
        },
        view: function() {
            return m("div",[
                onscreen && m("div",{
                    id: "maincard",
                    class: "card-panel deep-purple lighten-2 introducing panel-stream",
                    onbeforeremove: (vnode) => {
                        vnode.dom.classList.add("exiting");
                        return new Promise(function(resolve) {
                            vnode.dom.addEventListener("animationend", resolve)
                        });
                    }
                },[
                    m("img",{
                        src: post.src,
                        style: "height: 80%"
                    }),
                    m("div.row",m("div",{
                        class: "panel-username"
                    },post.username)),
                    m("div.row",m("div",{
                        class: "panel-msg"
                    },post.msg))
                ])
            ])
        }
    }
}

export { Panel }