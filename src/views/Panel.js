import m from "mithril";
import { User } from "../models/User";

function Panel() {
    var onscreen = false;
    var queue = [];
    var post;
    var timeonscreen = 10000;
    var timetonext = 60000;
    function getfromqueue() {
        post = queue.pop();
        showonscreen();
    }
    function removefromscreen() { 
        onscreen = false
        m.redraw();
        post = null
        if (queue.length > 0) {
            setTimeout(getfromqueue,timetonext);
        }
    }
    function showonscreen() {
        onscreen = true;
        m.redraw();
        //setTimeout(removefromscreen,timeonscreen);
    }
    return {
        oncreate: function() {
            if (User.socket == null) {
                User.connectlivestream();
            } else {
                User.socket.emit("livestream");
            }
            User.socket.on('new',(submission) => {
                if (post == null) {
                    post = {
                        username: submission.username,
                        msg: submission.msg,
                        src: submission.src
                    };
                } else {
                    queue.push({
                        username: submission.username,
                        msg: submission.msg,
                        src: submission.src
                    });
                }
                console.log(post);
                showonscreen();
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
                    m("div",{
                        style: "height: 80%; width: 90%"
                    },[
                        m("img",{
                            src: post.src,
                            style: "height: 100%;max-width: 100%;"
                        }),
                    ]),
                    m("div.row",{
                        style: "margin-bottom: 0px"
                    },m("div",{
                        class: "panel-username",
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