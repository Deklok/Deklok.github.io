import m from "mithril";

function Offline() {

    return {
        view: function() {
            return m("div", {
                class: "card-panel deep-purple lighten-2",
                style: "border-radius: 10px;"
            }, [
                m("div", {
                    class: "card-panel white"
                },[
                    m("div.row",[
                        m("img",{
                            src: "resources/idol-sleep.png",
                            draggable: false,
                            style: "width: 70%"
                        }),
                        m("div.text-flow",{
                            style: "font-size: xxx-large;font-weight: bolder;"
                        },"En este momento no hay un directo activo")
                    ])
                ])
            ])
        }
    }
}

export { Offline }