# == Fibonacci Series Code Challenge
#
# The sentence 'A quick brown fox jumps over the lazy dog' contains every 
# single letter in the alphabet. Such sentences are called pangrams. You are 
# to write a program, which takes a sentence, and returns all the letters it 
# is missing (which prevent it from being a pangram). You should ignore the 
# case of the letters in sentence, and your return should be all lower case 
# letters, in alphabetical order. You should also ignore all non US-ASCII 
# characters. In case the input sentence is already a pangram, print out 
# the string NULL
#
#
# Your program should accept a textfile as its first argument. This file will 
# contain several text strings, one per line. Ignore all empty lines. eg.
# 
# -- Example Input:
# 
#   A quick brown fox jumps over the lazy dog
#	A slow yellow fox crawls under the proactive dog
# 
# 
# -- Example Output:
# 
#   NULL
#	bjkmqz
#
#
# ARGV[0] should be the text file you pass in when you call this script
# 
# -- Example:
# 
#   $ ruby pangrams.rb list.txt
# 
File.open(ARGV[0]).each_line do |line|
  # begin coding here
end