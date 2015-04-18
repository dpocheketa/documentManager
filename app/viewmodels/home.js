define(["userService"], function (userService) {
    var user = userService;

    var textInfo = {
            title: "Document manager",
            greeting: "Welcome to the document manager!",
            description: "This is system to manage documents inside one company beetwen company department",
            beforeActions: "For working with system please login or register new user:",
            actions: [{
                action: "signin",
                label: "Log In"
            },{
                action: "signup",
                label: "Sign Up"
            }]
        };

    return {
        activate: function(){
            console.log(user)
        },
        textInfo: textInfo
    };
});