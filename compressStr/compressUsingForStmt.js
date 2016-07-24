(function() {

	function compress(str) {
		'use strict';

		if(/^[a-z]+$/.test(str)) {

			let count = 1;
			let result = '';

			// Get the first character
			let firstChar = str.charAt(0);

			for (let index = 1; index < str.length; index++) {
				if(firstChar === str[index]) {
					++count;
					continue;
				}
				else {
					result += firstChar+String(count);
					firstChar = str[index];
					count = 1;
				}
			}

			result += firstChar+String(count);
			return result;
		}
		else {
			return 'Not a valid input';
		}
	}

	var str;
	if(process.argv && process.argv.length > 2)
		str = process.argv[2];
	else
		return;

	console.log('return value: ' + compress(str));

}) ();