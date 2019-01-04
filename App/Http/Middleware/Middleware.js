module.exports = class Middleware {
    constructor(Request){
    }


    /**
     * the route will look for this method in every Middleware
     */
    check(){
        return 1 + 1 === 2;
    }
}