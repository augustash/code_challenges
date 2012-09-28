/**
 * jQuery version 1.8.2
 *
 * DOM READY!
 */
$(document).ready(function() {
	
	var numbers = $('#input pre').text().split("\n");
	for (key in numbers){
	  var n = parseInt(numbers[key]);
	  if(isNaN(n)) continue;
	  fibonacci(n);
	}

    // Put code here...
	function fibonacci($n){
	  var a = 0;
	  var b = 1;
	  var output = [];
	  for (var i = 0; i < $n; i++){
		output.push(a);
		var sum = a+b;
		a = b;
		b = sum;
	  }
	  $('#output').append(output.join(', ')+'<br /><br />-----------ANSWER: ' + output.pop() + '-----------<br /><br /><br />');
	}

});