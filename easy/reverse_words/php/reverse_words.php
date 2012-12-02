<?php
/**
 * Reverse Words Code Challenge
 *
 * Write a method to reverse the words of an input sentence.
 * Reverse and print out each line's content as a new line to the console.
 *
 *
 * -- Example Input:
 *
 *  	Hello World
 *  	August Ash
 *
 *
 * -- Example Output:
 *
 *  	World Hello
 *  	Ash August
 *
 * To access the text file you can either hard code it in here
 * or make it a command line argument like so:
 *
 * 		$ php reverse_words.php list.txt
 *
 * so $argv[1] would equal 'list.txt'
 *
 * $lines = file($argv[1]);
 *
 * OR
 *
 * $lines = file('list.txt');
 */

$start_time = microtime();

$lines = file($argv[1]);

foreach ($lines as $lineNumber => $line) {
  if (!empty($line)) {
    $str = preg_replace('/[\r\n]+/', '', $line);
    $arr = explode(' ', $str);
    $reversedArr = array_reverse($arr);
    $reversedStr = join(' ', $reversedArr);
    echo $reversedStr . "\n";
  }
}

$end_time = microtime();
$time = $end_time - $start_time;

echo "\nCompleted in " . $time . " ms";

?>
