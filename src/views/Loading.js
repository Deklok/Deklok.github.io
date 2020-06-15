import m from "mithril";

function Loading() {
    return {
        view: function() {
            return m("div",[
                m("img",{
                    src: "resources/idol-loading.png",
                    draggable: false,
                    style: "height: 20em;"
                }),
                m("p.flow-text","Cargando...")
            ])
        }
    }
}

export { Loading }