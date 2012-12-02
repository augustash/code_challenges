/**
 * jQuery version 1.8.2
 *
 * DOM READY!
 */
$(document).ready(function() {

    // Put code here...
    values = [1.0/0, -1.0/0, 1e17, true, false];
    $("#output").append("Checking these values: " + values);

    $.each(values, function(key, x){
      if (x == x + 2) {
        $('#output').append("<p>When x = " + x + " then x == x + 2 evaluates to true!</p>");
      } else {
        $('#output').append("<p>When x = " + x + " then x == x + 2 evaluates to false!</p>");
      }
    });

});
