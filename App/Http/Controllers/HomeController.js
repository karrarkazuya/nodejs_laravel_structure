let url = require('url');
let Resources = require("../../../Framework/Resources.js");
let Validator = require("../../../Framework/Validator.js");

module.exports = class HomeController {
    constructor(Request) {
        this.request = Request;
        this.resources = new Resources();
        this.link = Request.url;
        this.validator = new Validator();
    }


    index(){
        return "Hello world!";
    }

    /**
     * to return the Home view
     * @returns {string}
     * @constructor
     */
    HomeView(){
        // to validate inputs
        //let vars = (new HomeRequests(this.request)).HomeViewValidator();
        //if(vars === false)
        //    return "404 error page not found";
        // do stuff here

        // now return the view html with name as inputs
        let name = "Karrar";
        return this.resources.view("home", {'name':name});
        //return "Hello world";
    }

    /**
     * Parameters example
     * @param Requests
     * @returns {string}
     * @constructor
     */
    ParametersTest(Requests){
        return "first is "+Requests[0]+" while second is "+Requests[1];
    }

    /**
     * Validator example
     * @returns {*}
     */
    validateParametersTest(){
        //let request = url.parse(this.link, true).query;
        let val = this.validator.validate(
            {
                name:"Karrar",
                birthday:"dd"
            },
            {
                name:"string",
                birthday:"numeric"
            },
            {
                name_string:"Input is not string",
                birthday_numeric:"Input is not numeric"
            }
        );
        if(val === true){
            return "true";
        }else {
            return val;
        }
    }

}