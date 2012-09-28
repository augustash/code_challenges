/**
 * jQuery version 1.8.2
 *
 * DOM READY!
 */
$(document).ready(function() {

    var sequence = [0, 1];
    
    // Load the sequence.
    for (i = 2; i < 60; i++) {
    	sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
	
    // Load the input data.
	input = $('#input pre').html();
    lines = input.split("\n");
    output = '';
    
    // Generate the output data.
    for (i = 0; i < lines.length; i++) {
    	value = lines[i];
		// Check that it is a number, not gibberish.
		if (!isNaN(parseFloat(value)) && isFinite(value)) {
    		output += sequence[value] + '<br />' + "\n";
    	}
    }
    $('#output').html(output);

});