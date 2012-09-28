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

function main(){
  
  $lines = file('list.txt');
  foreach($lines as $n){
	fibonacci($n);
  }
  exit(0);
}

function fibonacci($n){
  $a = 0;
  $b = 1;
  $output = array();
  for ($i = 0; $i < $n; $i++){
	$output[$a] = (integer) $a;
    $sum = $a+$b;
    $a = $b;
    $b = $sum;
  }
  $last = end($output);
  print implode(', ', $output);
  print "\n\n";
  print '-----------ANSWER:' . $last . '-----------';
  print "\n\n\n";
}

main();

?>