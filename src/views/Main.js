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
                render ? m("div","tas bien meco we, me hiciste caso xdxd") : "",
                m("div",{
                    class: "g-signin2",
                    "data-onsuccess": function(googleUser) {
                        var profile = googleUser.getBasicProfile();
                        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                        console.log('Name: ' + profile.getName());
                        console.log('Image URL: ' + profile.getImageUrl());
                        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
                    }
                })
            ])
        }
    }
}

export { Main }