module.exports = class Validator {
    constructor() {
    }

    /**
     * to validate inputs, only 'string', 'numeric' and 'required' for now
     * @param Items
     * @param Rules
     * @param Messages
     * @returns {*}
     */
    validate(Items, Rules, Messages){
        let errors = [];
        for(let key in Rules){
            let item = Items[key];
            let rule = Rules[key];
            if(item != undefined){
                if(rule.includes("string") && typeof item !== "string"){
                    let message = Messages[key+"_string"];
                    if(message != undefined)
                        errors.push(message);
                    else
                        errors.push(key+" is not string");
                }else if(rule.includes("numeric") && typeof item !== "number"){
                    let message = Messages[key+"_numeric"];
                    if(message != undefined)
                        errors.push(message);
                    else
                        errors.push(key+" is not numeric");
                }
            }else if(rule.includes("required")){
                let message = Messages[key+"_required"];
                if(message != undefined)
                    errors.push(message);
                else
                    errors.push(key+" is required");
            }
            if(errors.length > 0){
                let new_errors = [];
                for (let i = 0; i < errors.length; i++) {
                    let exists = false;
                    for (let j = 0; j < new_errors.length; j++) {
                        if(errors[i] == new_errors[j])
                            exists = true;
                    }
                    if(!exists)
                        new_errors.push(errors[i]);
                }
                errors = new_errors;
            }
        }
        if(errors.length > 0)
            return errors;
        return true;
    }
}