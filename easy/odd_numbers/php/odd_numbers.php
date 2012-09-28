<?php

/**
 * Odd Numbers Code Challenge
 *
 * Write a program to print the odd numbers from 1 to 99, 
 * one number per line to the console (STDOUT)
 */


echo '<ul>';

    for($n=1; $n <= 99; $n++) {
        if (($n%2) == 1) {
            echo '<li>' . $n . '</li>';
        }
    }
    
echo '</ul>';



?>