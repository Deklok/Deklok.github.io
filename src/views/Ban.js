import m from "mithril";

function Ban(){
    return {
        view: function() {
            return m("div.row",[
                m("img",{
                    src: "resources/idol-ban.png",
                    draggable: false,
                    style: "width: 70%;max-width: 400px;min-width: 200px;"
                }),
                m("div.text-flow",{
                    style: "font-size: 3em;font-weight: bolder;color: #8E1010"
                },"Has sido baneado del sistema. Si quieres apelar al ban, contactate con Idol")
            ])
        }
    }
}

export { Ban }