<?php

/**
 * Odd Numbers Code Challenge
 *
 * Write a program to print the odd numbers from 1 to 99, 
 * one number per line to the console (STDOUT)
 */

$start = microtime();

foreach(range(1, 99) as $number) {
	echo $n = ($number % 2 != 0) ? "{$number}\n" : '';
}

$end = microtime();
$time = $end - $start;

echo "\nCompleted in " . $time . " ms";

?>