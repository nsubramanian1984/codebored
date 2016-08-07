(function() {

    'use strict';
    //Sample code to read in test cases:
    let fs  = require("fs");

    let lineNum = 1;
    let N = 0;
    let arr = [];
    let M = 0;
    let l = [], r = [];

    fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {

        if (line !== "") {

            if(lineNum === 1)
                N = Number(line);
            else if(lineNum === 2) {
                arr = line.split(' ');
                arr = arr.map(Number);
            }
            else if(lineNum === 3)
                M = Number(line);
            else {
                let temp = line.split(' ');
                temp = temp.map(Number);

                l.push(temp[0]); r.push(temp[1]);
            }
        }

        lineNum++;

    });

    for(let index = 0; index < M; index++) {

        let removed = arr.splice(l[index] - 1, (r[index] - l[index])+1);

        //for(let i = removed.length - 1 ; i >=0; i--)
          //  arr.splice(0, 0, removed[i]);
        arr = removed.concat(arr);
    }

    console.log(arr.reduce(function(prev, curr, index, array) {
        return prev + ' ' + curr;
    }));

})();