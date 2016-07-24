(function() {

    function compress(str) {
        var result = '';
        var regex = /^[a-zA-Z]+$/;

        while(regex.test(str)) {
            var res = str.match(/^[a-zA-Z]/);

            if(res[0]) {
                var anotherregex = '^(' + res[0] + ')+';

                str = str.replace(new RegExp(anotherregex), function(a, b) {

                    result += b + String(a.length);
                    return '';
                });
            }
            else
                return;
        }

        return result ? result : 'invalid input';
    }

    var str;
    if(process.argv && process.argv.length > 2)
        str = process.argv[2];
    else
        return;

    console.log('result: ' + compress(str));

})();
