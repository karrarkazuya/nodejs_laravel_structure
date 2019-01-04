

module.exports = class HomeRequests {
    constructor(){
    }

    HomeViewValidator(){
        return {link:"string"};


        if(request.name == null || request.name === "" || request.name === undefined || typeof request.name !== 'string')
            return false;

        return request;
    }
}