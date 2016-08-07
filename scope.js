// variable scope

'use strict';

var name = 'Johann', obj = {
    name: 'Abram',
    printName: function() {
        var that = this;

        console.log(this.name);

        function whoAmI() {
            console.log(this.name);
            }

        function anotherWhoAmI() {
            console.log(that.name);
        }

        var whoIsThis = whoAmI.bind(this);

        setTimeout(whoIsThis, 100);

        setTimeout(anotherWhoAmI, 100);
        }
    };

obj.printName();

