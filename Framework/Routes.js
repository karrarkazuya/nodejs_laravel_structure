module.exports = class Routes {
    constructor(request){
        this.link = request.url;
        this.method = request.method;
        this.request = request;
    }

    /**
     * get route
     * @param url
     * @param call
     * @returns {*}
     */
    get(url, call){
        if(this.method === "GET") {
            let wanted = false;
            let inputClears = [];
            if (url === this.link){
                wanted = true;
            }else if(url.includes("{") && url.includes("}")){
                let main = url;
                let input = this.link;
                let clearsn = [];
                let inputClearsn = [];

                while(main.includes("{") && main.includes("}")){
                    main = main.replace(main.substring(main.indexOf("{"), main.indexOf("}")+1), "[TOREMOVE]");
                }
                let clears = main.split("[TOREMOVE]");

                for (let i = 0; i < clears.length; i++) {
                    if(clears[i] !== ""){
                        clearsn.push(clears[i]);
                    }
                }
                clears = clearsn;

                let inputn = input;
                for (let i = 0; i < clears.length; i++) {
                    while (inputn.includes(clears[i])) {
                        inputn = inputn.replace(clears[i], "[TOREMOVE]");
                    }
                }

                inputClears = inputn.split("[TOREMOVE]");


                for (let i = 0; i < inputClears.length; i++) {
                    if(inputClears[i] !== ""){
                        inputClearsn.push(inputClears[i]);
                    }
                }
                inputClears = inputClearsn;

                while (main.includes("[TOREMOVE]")) {
                    main = main.replace("[TOREMOVE]","");
                }
                for (let i = 0; i < inputClears.length; i++) {
                    while (input.includes(inputClears[i])) {
                        input = input.replace(inputClears[i],"");
                    }
                }
                if(input == main)
                    wanted = true;
            }
            if(typeof call === 'string' && call.includes("@")){
                let className = call.substring(0, call.indexOf("@"));
                let functionName = call.substring(call.indexOf("@")+1, call.length);
                call = (new (require("../App/Http/Controllers/"+className+".js"))(this.request))[functionName](inputClears);
            }
            if(wanted)
                return typeof call === 'function' ? call() : call;
        }
        return false;
    }

    /**
     * post route
     * @param url
     * @param call
     * @returns {*}
     */
    post(url, call){
        if(this.method === "POST") {
            let wanted = false;
            let inputClears = [];
            if (url === this.link){
                wanted = true;
            }else if(url.includes("{") && url.includes("}")){
                let main = url;
                let input = this.link;
                let clearsn = [];
                let inputClearsn = [];

                while(main.includes("{") && main.includes("}")){
                    main = main.replace(main.substring(main.indexOf("{"), main.indexOf("}")+1), "[TOREMOVE]");
                }
                let clears = main.split("[TOREMOVE]");

                for (let i = 0; i < clears.length; i++) {
                    if(clears[i] !== ""){
                        clearsn.push(clears[i]);
                    }
                }
                clears = clearsn;

                let inputn = input;
                for (let i = 0; i < clears.length; i++) {
                    while (inputn.includes(clears[i])) {
                        inputn = inputn.replace(clears[i], "[TOREMOVE]");
                    }
                }

                inputClears = inputn.split("[TOREMOVE]");


                for (let i = 0; i < inputClears.length; i++) {
                    if(inputClears[i] !== ""){
                        inputClearsn.push(inputClears[i]);
                    }
                }
                inputClears = inputClearsn;

                while (main.includes("[TOREMOVE]")) {
                    main = main.replace("[TOREMOVE]","");
                }
                for (let i = 0; i < inputClears.length; i++) {
                    while (input.includes(inputClears[i])) {
                        input = input.replace(inputClears[i],"");
                    }
                }
                if(input == main)
                    wanted = true;
            }
            if(typeof call === 'string' && call.includes("@")){
                let className = call.substring(0, call.indexOf("@"));
                let functionName = call.substring(call.indexOf("@")+1, call.length);
                call = (new (require("../App/Http/Controllers/"+className+".js"))(this.request))[functionName](inputClears);
            }
            if(wanted)
                return typeof call === 'function' ? call() : call;
        }
        return false;
    }

    /**
     * Used to group routes
     * @returns {string}
     */
    group(){
        let route = "";
        for(let i = 0; i < arguments.length; i++) {
            route = arguments[i];
            if(route !== false){
                return route.toString();
            }
        }
        return "404 not found";
    }


    /**
     * Used to apply a middleware on a function
     * @param call
     * @param middleware
     * @returns {*}
     */
    middleware(call, middleware){
        if(middleware instanceof Array){
            for (let i = 0; i < middleware.length; i++) {
                let m = middleware[i];
                while (m.includes(".")){
                    m = m.replace(".", "/");
                }
                if((new (require("../App/Http/Middleware/"+m+".js"))(this.request)).check() === false)
                    return false;
            }
        }else if(typeof middleware === "string"){
            while (middleware.includes(".")){
                middleware = middleware.replace(".", "/");
            }
            if((new (require("../App/Http/Middleware/"+middleware+".js"))(this.request)).check() === false)
                return false;
        }
        return call;
    }
}