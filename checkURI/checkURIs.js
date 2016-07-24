(function() {
	'use strict';

	function portCheck(arg1, arg2) {
		arg1 = arg1 | 80;
		arg2 = arg2 | 80;

		return (arg1 === arg2);
	}

	function caseInSensitiveCheck(arg1, arg2) {
		if(arg1)
			arg1 = arg1.toLowerCase();
		if(arg2)
			arg2 = arg2.toLowerCase();

		return (arg1 === arg2);
	}

	function caseSensitiveCheck(arg1, arg2) {
		return (arg1 === arg2);
	}

	function removeOneUpAndCurrentDirSymbols(arg1) {

		while(/\/?[a-zA-Z0-9]+\/[.]{2}\//gi.test(arg1)) {
			arg1 = arg1.replace(/\/?[a-zA-Z0-9]+\/[.]{2}/gi, '');
		}

		while(/\/[.]\//gi.test(arg1)) {
			arg1 = arg1.replace(/\/[.]\//gi, '\/');
		}

		return arg1;
	}


	function testForArray(val) {
		return (val && typeof val === 'object' && typeof val.length === 'number'
			&& typeof val.splice === 'function' && !(val.propertyIsEnumerable('length')));
	}

	function getQueryString(query, mapArg) {
		let regex = /^([a-zA-Z0-9_\-]+)=([a-zA-Z0-9_\-]+)/;

		while(regex.test(query)) {
			let results = regex.exec(query);

			if(results) {

				if(!mapArg.get(results[1]))
					mapArg.set(results[1], results[2]);
				else {
					let value = mapArg.get(results[1]);

					if(testForArray(value)) {
						value.push(results[2]);
					}
					else {
						let entry = [];
						entry.push(value);
						entry.push(results[2]);
						mapArg.set(results[1], entry);
						}
					}
				}

			query = query.replace(/^([a-zA-Z0-9_\-]+)=([a-zA-Z0-9_\-]+)\&?/, '');

		}
	}

	function compareMaps(map1, map2) {
		let testValue, value;

		if(map1.size !== map2.size) return false;

		for(let key of map1.keys()) {
			value = map1.get(key);
			testValue = map2.get(key);

			if(!testForArray(testValue)) {
				if(testValue !== value || (testValue === undefined && !map2.has(key)))
					return false;
			}
			else {

				let length = testValue.length > value.length ? testValue.length: value.length;
				for(let index = 0; index < length; index++) {
					if(testValue[index] && value[index]) {
						if(testValue[index] === value[index])
							continue;
						else
							return false;
					}
					else
						return false;
				}
			}
		}

		return true;
	}

	function checkURIs(uri1, uri2) {

		// parses parts of the url
		let parseUri = /^(?:([A-Za-z]+):)?(\/{2})(?:(\w+):(\w+))?@?([A-Za-z0-9.\-]+):?([0-9]+)?(?:(\/[^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

		let uriPartsTemplate = {
			uri: '',
			scheme: '',
			slash: '',
			username: '',
			passwd: '',
			host: '',
			port: '',
			path: '',
			query: '',
			hash: ''
		};

		let uri1Parts = {}, uri2Parts = {};
		let resultsUri1= uri1.match(parseUri);
		let resultsUri2 = uri2.match(parseUri);

		let count = 0;
		for(let elem in uriPartsTemplate) {
			if(uriPartsTemplate.hasOwnProperty(elem)) {
				uri1Parts[elem] = resultsUri1[count];
				uri2Parts[elem] = resultsUri2[count++];
			}
		}

		for(let elem in uriPartsTemplate) {

			if(elem === 'scheme') {
				if(caseInSensitiveCheck(uri1Parts[elem], uri2Parts[elem]))
					continue;
				else
					return false;
			}
			else if(elem === 'slash') {
				if(decodeURIComponent(uri1Parts[elem]) === decodeURIComponent(uri2Parts[elem]))
					continue;
				else
					return false;
			}
			else if(elem === 'username') {
				if(decodeURIComponent(uri1Parts[elem]) === decodeURIComponent(uri2Parts[elem]))
					continue;
				else
					return false;
			}
			else if(elem === 'passwd') {
				if(decodeURIComponent(uri1Parts[elem]) === decodeURIComponent(uri2Parts[elem]))
					continue;
				else
					return false;
			}
			else if(elem === 'host') {
				if(caseInSensitiveCheck(uri1Parts[elem], uri2Parts[elem]))
					continue;
				else
					return false;
			}
			else if(elem === 'port') {
				if(portCheck(uri1Parts[elem], uri2Parts[elem]))
					continue;
				else
					return false;
			}
			else if(elem === 'path') {

				uri1Parts[elem] = removeOneUpAndCurrentDirSymbols(uri1Parts[elem]);
				uri2Parts[elem] = removeOneUpAndCurrentDirSymbols(uri2Parts[elem]);

				if(decodeURIComponent(uri1Parts[elem]) === decodeURIComponent(uri2Parts[elem]))
					continue;
				else
					return false;

			}
			else if(elem === 'query') {

				if(decodeURIComponent(uri1Parts[elem]) === decodeURIComponent(uri2Parts[elem])) {
					continue;
				}

				let map1 = new Map();
				let map2 = new Map();

				getQueryString(uri1Parts[elem], map1);
				getQueryString(uri2Parts[elem], map2);

				if(compareMaps(map1, map2))
					continue;
				else
					return false;
			}
			else if(elem === 'hash') {
				if(decodeURIComponent(uri1Parts[elem]) === decodeURIComponent(uri2Parts[elem]))
					continue;
				else
					return false;
			}

		}

		return true;

	}

	let uri1, uri2;

	if(process.argv && process.argv.length > 3) {
		uri1 = process.argv[2];
		uri2 = process.argv[3];
	}
	else
		return;

	console.log('result: ' + checkURIs(uri1, uri2));


})();
