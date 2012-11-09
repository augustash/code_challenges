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
$sequence = array(0, 1);

for ($i = 2; $i < 100; $i++) {
  $sequence[$i] = $sequence[$i - 1] + $sequence[$i - 2];
}

foreach ($lines as $pos => $val) {
  echo $sequence[(int) $val] . "\n";
}

?>