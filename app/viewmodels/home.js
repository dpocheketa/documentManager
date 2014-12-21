define(["userService"], function (userService) {
    var user = userService;

    var textInfo = {
            title: "Document manager",
            greeting: "Welcome to the document manager!",
            description: "This is system to manage documents inside one company beetwen company department",
            features: [
                "Add user",
                "Add document",
                "Edit document",
                "Actions with document"
            ],
            beforeActions: "For working with system please login or register new user:",
            actions: ["signin", "signup"]
        };

    return {
        activate: function(){
            console.log(user)
        },
        textInfo: textInfo
    };
});