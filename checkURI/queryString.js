(function() {

	// This code snippet tries to check whether the Query string parameters are equivalent in arbitrary order.
	// But query string arguments of the same name has to be listed in the same order for both URIs to be equivalent.
	// There can be multiple args of the same name that has been accounted.

	function testForArray(val) {
		return (val && typeof val === 'object' &&
			typeof val.length === 'number' &&
			typeof val.splice === 'function' &&
			!(val.propertyIsEnumerable('length')));
	}

	function getQueryString(query, mapArg) {
		var regex = /^(\w+)=(\w+)/;

		while(regex.test(query)) {
			var results = regex.exec(query);

			if(results) {

				if(!mapArg.get(results[1]))
					mapArg.set(results[1], results[2]);
				else {
					var value = mapArg.get(results[1]);

					if(testForArray(value)) {
						value.push(results[2]);
					}
					else {
						var entry = [];
						entry.push(value);
						entry.push(results[2]);
						mapArg.set(results[1], entry);
						}
					}
				}

			query = query.replace(/^(\w+)=(\w+)\&?/, '');
		}
	}



	function compareMaps(map1, map2) {
		var testValue, value;

		if(map1.size !== map2.size) return false;

		for(var key of map1.keys()) {
			value = map1.get(key);
			testValue = map2.get(key);

			if(!testForArray(testValue)) {
				if(testValue !== value || (testValue === undefined && !map2.has(key)))
					return false;
			}
			else {

				var length = testValue.length > value.length ? testValue.length: value.length;
				for(var index = 0; index < length; index++) {
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

	// Sample test inputs
	var arg1 = 'b=2&a=2&c=2&a=3&a=5&b=5';
	var arg2 = 'c=2&a=2&b=2&b=5&a=3&a=5';

	var map1 = new Map();
	var map2 = new Map();

	getQueryString(arg1, map1); getQueryString(arg2, map2);

	console.log('result: ' + compareMaps(map1, map2));

})();
