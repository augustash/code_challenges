/**
 * jQuery version 1.8.2
 *
 * DOM READY!
 */
$(document).ready(function() {

    results = new Array();
    
    for (i = 1; i < 100; i++) {
    	if (i % 2 === 1)
    		results.push(i);
    }
    
    $('div#output').html(results.join('<br />'));

});