<?php

/**
 * == Sum of Integers
 *
 * Write a program to determine the largest sum of contiguous integers 
 * in a list. In other words, of all the possible contiguous subarrays 
 * for a given array, find the one with the largest sum, and print that sum.
 * 
 * 
 * Your program should accept a textfile as its first argument. This file 
 * will a comma separated list of integers, one set per line. e.g. 
 * 
 * -- Example Input:
 * 
 * 	-10, 2, 3, -2, 0, 5, -15
 * 	2,3,-2,-1,10
 * 
 * 
 * -- Example Output:
 * 
 * 	8
 * 	12
 * 
 * 
 * To access the text file you can either hard code it in here 
 * or make it a command line argument like so:
 *
 * 		$ php sum_of_integers.php list.txt
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



?>
