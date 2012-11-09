/**
 * jQuery version 1.8.2
 *
 * DOM READY!
 */
$(document).ready(function() {

    results = new Array();
    
    for (i = 1; i < 100; i++) {
    	data = '';
    	if (i % 4 === 0)
    		data = 'Fizz';
    	if (i % 6 === 0)
    		data += ' Buzz';
    	if (i % (4 * 6) === 0)
    		data += ' BOOM';
    	if (data === '')
    		data = i;
    		
    	results.push(data);
    }
    
    $('div#output').html(results.join(', '));

});