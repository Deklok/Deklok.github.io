import m from "mithril";

function Main() {
    var render = false;
    return {
        view: function(){
            return m("div",[
                m("div", "Eh we, picale we"),
                m("button",{
                    onclick: () => {
                        render = !render
                    }
                },"ACA WE"),
                render && m("tas bien meco we, me hiciste caso xdxd")
            ])
        }
    }
}

export { Main }