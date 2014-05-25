<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of index1
 *
 * @author gk
 */
class FuzzBuzz{

    //array_push($stack, "apple", "raspberry");
    protected $lines;
    protected $path;
    public $fuzzBuzzArray = [];
    protected $FUZZ = 'F';
    protected $BUZZ = 'B';
    protected $FUZZ_BUZZ = 'FB';

    public function __construct($path){
            $this->path = $path;
            $this->lines = file($this->path, FILE_SKIP_EMPTY_LINES | FILE_IGNORE_NEW_LINES);
        }

    public function setNumbers() {
         foreach ($this->lines as $l) {
            //echo $l;
             
        $pieces = explode(" ", $l); 
        array_push($this->fuzzBuzzArray , $pieces); 
        
        }
        //print_r($this->fuzzBuzzArray);
        
        fclose($this->path);
        $this->playFizzBuzz($this->fuzzBuzzArray);
    }
    
    public function playFizzBuzz($fbArray) { 
        for($c = 0; $c < count($fbArray); $c++){
             $i = 1;
            $f = $fbArray[$c][0];
            $b = $fbArray[$c][1];
            $upTo = $fbArray[$c][2];
            while($i <= $upTo){
                if($i % $f == 0 && $i % $b == 0){
                    echo $this->FUZZ.$this->BUZZ.' ';
                }                 
                else if($i % $f == 0){
                    echo $this->FUZZ.' ';
                }
                else if($i % $b == 0){
                    echo $this->BUZZ.' ';
                }               
                if($i % $f != 0 && $i % $b != 0){
                    echo $i.' ';
                }
                $i++;
            }
            echo "<br />";
        }

    }    
    
}
$var = new FuzzBuzz("test.txt");

echo  $var->setNumbers();



?>
