<?php

/**
 * == Fibonacci Series Code Challenge
 *
 * The sentence 'A quick brown fox jumps over the lazy dog' contains every 
 * single letter in the alphabet. Such sentences are called pangrams. You are 
 * to write a program, which takes a sentence, and returns all the letters it 
 * is missing (which prevent it from being a pangram). You should ignore the 
 * case of the letters in sentence, and your return should be all lower case 
 * letters, in alphabetical order. You should also ignore all non US-ASCII 
 * characters. In case the input sentence is already a pangram, print out 
 * the string NULL
 * 
 * 
 * Your program should accept a textfile as its first argument. This file will 
 * contain several text strings, one per line. Ignore all empty lines. eg.
 * 
 * -- Example Input:
 * 
 *   	A quick brown fox jumps over the lazy dog
 * 		A slow yellow fox crawls under the proactive dog
 * 
 * 
 * -- Example Output:
 * 
 *   	NULL
 * 		bjkmqz
 * 
 * 
 * To access the text file you can either hard code it in here 
 * or make it a command line argument like so:
 *
 * 		$ php pangrams.php list.txt
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
	print 'TEXT: '.$n;
	pangram($n);
	print "\n\n";
  }
  exit(0);
}

function pangram($text) {
	$return = array();
	$letters = array();
    foreach (str_split($text) as $c) {
        if ($c >= 'a' && $c <= 'z'){
			$letters[$c] = $c;
		}
        else if ($c >= 'A' && $c <= 'Z'){
			$c = strtolower($c);
			$letters[$c] = $c;
		}
    }
	print 'IS PANGRAM: '. (count($letters) == 26 ? 'Yes' : 'No') . "\n";
	ksort($letters);
	$all = explode(',','a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z');
	$missing = array();
	foreach($all as $letter){
		if(!isset($letters[$letter])) $missing[$letter] = $letter;
	}
	if(!empty($missing)){
		print 'MISSING: '.implode(', ', $missing)."\n";
	}
    return $return;
}

main();



?>
