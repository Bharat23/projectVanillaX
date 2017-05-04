var myString = String.prototype;

myString.replaceAll = function(oldVal,newVal) {
	var input = this.valueOf();
	if(oldVal === undefined || newVal === undefined){
		console.error(new Error('Replace all functions expects two parameter'));
		return;
	}
	var reg = new RegExp(oldVal,'ig');
	return input.replace(reg,newVal);
}

var myArray = Array.prototype;

myArray.sum = function(){
	if(this.constructor !== Array){
		console.error(new Error('The input should be an array'));
		return;
	}
	var totalSum = 0;
	this.forEach(function(val){
		if(!isNaN(parseFloat(val))) {
			totalSum += parseFloat(val);
		}
	});

	return totalSum;
}

myArray.mean = function () {
	if(this.constructor !== Array){
		console.log(new Error('The input should be an array'));
		return;
	}
	var totalSum = 0;
	var totalCount = 0;
	this.forEach(function(val){
		if(!isNaN(parseFloat(val))){
			totalSum += parseFloat(val);
			totalCount += 1;
		}
	});

	return totalSum/totalCount;
}

myArray.toJSON = function(keyPrefix) {
	if(this.constructor !== Array){
		console.log(new Error('The input should be an array'));
		return;
	}
	var obj = {};
	var preFix = keyPrefix || '';
	for (var i=0;i<this.length;i++){
		obj[preFix+i] = this[i];
	}

	return obj;
}

var myLocation = Location.prototype;

myLocation.getQueryStringObj = function () {
	var obj = {};
	var queryString = location.search;
	if(queryString.length > 0){
		queryString = queryString.slice(1);
		var queryStringArr = queryString.split('&');
		queryStringArr.forEach(function(strands){
			var tmp = strands.split('=');
			obj[tmp[0]] = tmp[1];
		});
	}
	
	return obj;
}

myLocation.setQueryString = function (obj) {
	var queryString = '';
	var queryStringArr = [];
	if(obj && obj.constructor === Object && Object.keys(obj).length > 0){
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				queryStringArr.push(key + '=' + obj[key]);
			}
		}
		queryString = '?' + queryStringArr.join('&');
	}

	return queryString;
}