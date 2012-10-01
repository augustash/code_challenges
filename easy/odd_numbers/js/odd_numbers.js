/**
 * jQuery version 1.8.2
 *
 * DOM READY!
 */
$(document).ready(function() {

    // Put code here...
	for (i=1; i<=99; i++) {
		if (i % 2 != 0) {
			$("#output").append('<p>' + i + '</p>');
		}
	}
});