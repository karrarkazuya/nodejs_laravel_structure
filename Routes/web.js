let Routes = require("../Framework/Routes.js");


module.exports = class web {
    constructor(request) {
        this.method = request.method;
        this.route = new Routes(request);
    }

    main() {
        return this.route.group(
            // Using controller
            this.route.get("/", "homeController@index"),
            this.route.get("/home", "homeController@HomeView"),
            // Passing parameters to controller
            this.route.get("/test/{1st}/test/{2nd}", "homeController@ParametersTest"),
            // Test with validation
            this.route.get("/validate", "homeController@validateParametersTest"),
            // Returning text
            this.route.get("/text", "This is the text page!"),
            this.route.post("/submit", "Posts accepted too"),
            // Using function
            this.route.get("/function", function(){
                return "this is the function";
            }),
            // Using middleware
            this.route.middleware(this.route.get("/middleware", "Example with middleware"), "Middleware"),
            // Using array of middleware
            this.route.middleware(this.route.get("/middleware/array", "Example with middleware for array"), ["Middleware", "Middleware"])
        );
    }

};