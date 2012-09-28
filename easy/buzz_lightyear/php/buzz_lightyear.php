<?php

/**
 * Buzz Lightyear Code Challenge
 *
 * Give all possible values of `$x` where `$x == $x + 2;` will evaluate to `true`
 */

$values = array(1e17, PHP_INT_MAX, true);

foreach ($values as $x) {
	if ($x == $x + 2) {
		echo '$x == $x + 2; evaluates to true when $x = ?' . "\n";
		echo "\n";var_export($x);echo "\n";
		var_dump($x == $x + 2);
		echo "\n\n";
	}
}


?>