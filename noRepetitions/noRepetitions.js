(function() {

    'use strict';

    function compress(str) {
        var result = '';
        var regex = /^[a-zA-Z\,\?\.!\s\']+$/;
        var result = '';


        while(regex.test(str)) {
            var res = str.match(/^[a-zA-Z\,\?\.!\s\']/);

            if(res[0]) {

                if(res[0] === '?')
                    res[0] = '.';
                else if(res[0] === "'")
                    res[0] = '\'';
                else if(res[0] === ',')
                    res[0] = '\,';
                else if(res[0] === '!')
                    res[0] = '\!';

                var anotherregex = '^(' + res[0] + ')+';

                str = str.replace(new RegExp(anotherregex), function(a, b) {

                    result += b;
                    return '';
                });
            }
            else
                return;
        }

        return result;
    }

    //Sample code to read in test cases:
    let fs  = require("fs");

    fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
        if (line !== "") {
            //console.log(line);
            console.log(compress(line));
        }
    });



})();
