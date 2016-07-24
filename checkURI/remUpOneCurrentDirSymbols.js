(function() {

	// This function assumes the path provided is valid.
	var removeOneUpAndCurrentDirSymbols = function(str) {

		while(/\/?[a-zA-Z0-9]+\/[.]{2}\//gi.test(str)) {
			str = str.replace(/\/?[a-zA-Z0-9]+\/[.]{2}/gi, '');
		}


		while(/\/[.]\//gi.test(str)) {
			str = str.replace(/\/[.]\//gi, '\/');
		}

        return str;

	};

    // Sample test input

    var str = '/further/../down/./foo.html';

    console.log('result: ' + removeOneUpAndCurrentDirSymbols(str));

})();
