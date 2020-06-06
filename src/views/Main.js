import m from "mithril";


function Main() {
    var render = false
    var GoogleAuth
    return {        
        oninit: function() {
            gapi.load('auth2', function() {
                gapi.auth2.init({
                    client_id: '325821250313-rpe75eqduheb1dduudjdq4cbhb72fro4.apps.googleusercontent.com'
                }).then(function(response){
                    console.log("ya cargo el api we")
                    GoogleAuth = response
                    GoogleAuth.currentUser.listen(function(GoogleUser) {
                        console.log(GoogleUser)
                    })
                })
            });
        },
        view: function () {
            return m("div", [
                m("div", "Eh we, picale we"),
                m("button", {
                    onclick: () => {
                        render = !render
                    }
                }, "ACA WE"),
                render ? m("div", "tas bien meco we, me hiciste caso xdxd") : "",
                m("div", {
                    class: "g-signin2"
                })
            ])
        }
    }
}

export { Main }