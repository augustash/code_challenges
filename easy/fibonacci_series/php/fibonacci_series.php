<?php

/**
 * Fibonacci Series Code Challenge
 * 
 * The Fibonacci series is defined as: 
 * 
 *   F(0) = 0; F(1) = 1; F(n) = F(n-1) + F(n-2) when n > 1; 
 * 
 * Given a positive integer 'n', print out the F(n).
 *
 * -- Example Input:
 *
 *  	5
 *  	12
 *
 *
 * -- Example Output:
 *
 *  	5
 *   	144
 *
 * To access the text file you can either hard code it in here 
 * or make it a command line argument like so:
 *
 * 		$ php fibonacci_series.php list.txt
 *
 * so $argv[1] would equal 'list.txt'
 *
 * $lines = file($argv[1]);
 *
 * OR
 *
 * $lines = file('list.txt');
 */

$lines = file($argv[1]);

foreach ($lines as $n) {
	$fibber = new Fibber();

	echo "Finding Fibonacci value at position {$n}: " . $fibber->fib_a($n) . "\n"; 
}

final class Fibber
{
	public function fib_a($n)
	{
		$n = (int)$n; 

		if ($n < 2) {
			return $n;
		} else {
			$vals = array(0,1);
			$i = $n - 1;
			while ($i <= $n) {
				$vals[] = $vals[count($vals) - 1] + $vals[count($vals) - 2];
			}

			return end($vals);
		}
	}
}


?>