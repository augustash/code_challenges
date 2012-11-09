<?php

/**
 * Odd Numbers Code Challenge
 *
 * Write a program to print the odd numbers from 1 to 99, 
 * one number per line to the console (STDOUT)
 */

for ($i = 1; $i < 100; $i++) {
  if ($i % 2 == 1)
    echo $i . "\n";
}

?>