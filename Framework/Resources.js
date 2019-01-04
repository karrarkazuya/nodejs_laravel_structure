var fs = require('fs');
module.exports = class Resources {
    constructor(){

    }

    view(){
        let blade = "";
        try {
            let extends_files = [];
            let source = arguments[0];
            while(source.includes(".")){
                source = source.replace(".", "\\");
            }
            blade = fs.readFileSync(__dirname + "\\..\\Resources\\Views\\"+source+".html", 'utf8');
            // we load the extends
            let temp_blade = blade;
            if(temp_blade.includes("@extends('")){
                temp_blade = blade.replace(blade.substring(0, blade.indexOf("@extends('")+10), "");
                extends_files.push(temp_blade.substring(0, temp_blade.indexOf("')")));
            }
            for (let i = 0; i < extends_files.length; i++) {
                let file = extends_files[i];
                while(file.includes(".")){
                    file = file.replace(".", "\\");
                }
                let toAddFile = fs.readFileSync(__dirname + "\\..\\Resources\\Views\\"+file+".html", 'utf8');
                blade = toAddFile.replace("@yield('content')", blade);
                blade = blade.replace("@extends('"+extends_files[i]+"')", "");
                while (blade.includes("@yield('content')")) {
                    blade = toAddFile.replace("@yield('content')", blade);
                    blade = blade.replace("@extends('"+extends_files[i]+"')", "");
                }
            }
        } catch(e) {
            console.log('Error:', e.stack);
            return "Error loading the page";
        }

        if(arguments[1] !== undefined) {
            // here we deal with the inputs
            let script = this.compact(arguments[1]);
            blade = script + blade;
        }

        while(blade.includes("@js{") && blade.includes("}")){
            let temp_blade = blade.replace(blade.substring(0, blade.indexOf("@js{")+4), "");
            temp_blade = temp_blade.substring(0, temp_blade.indexOf("}"));
            blade = blade.replace("@js{"+temp_blade+"}", "<script>"+temp_blade+"</script>");
        }
        return blade;
    }

    compact(array){
        let script = "<script>@script</script>";
        for (let key in array) {
            script = script.replace("@script", "let " + key + " = '" + array[key] + "';@script")
        }
        script = script.replace("@script", "");
        return script;
    }
}