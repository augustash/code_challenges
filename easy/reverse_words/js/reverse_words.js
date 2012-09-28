/**
 * jQuery version 1.8.2
 *
 * DOM READY!
 */
$(document).ready(function() {

    // Put code here...
    var lines = $('#input pre').text().split('\n');
    $.each(lines, function(n, line) {
       reversed = line.split(" ").reverse().join(" ");
       $('#output').append('<p>' + reversed + '</p>');
    });
});
