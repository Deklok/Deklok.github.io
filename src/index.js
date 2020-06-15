import m from "mithril"
import { Main } from "./views/Main"
import { Panel } from "./views/Panel"

m.route(document.body, "/",{
    '/': Main,
    '/panel': Panel
});