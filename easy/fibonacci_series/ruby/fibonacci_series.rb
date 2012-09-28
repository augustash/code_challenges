# == Fibonacci Series Code Challenge
#
# The Fibonacci series is defined as:
#
#   F(0) = 0; F(1) = 1; F(n) = F(n-1) + F(n-2) when n > 1;
#
# Given a positive integer 'n', print out the F(n).
#
# -- Example Input:
#
#   5
#   12
#
#
# -- Example Output:
#
#   5
#   144
#
#
# ARGV[0] should be the text file you pass in when you call this script
#
# -- Example:
#
#   $ ruby fibonacci_series.rb list.txt
#
require './fibber.rb'

File.open(ARGV[0]).each_line do |n|
  # begin coding here

  fibonacci = Hash.new{ |h,k| h[k] = k < 2 ? k : h[k-1] + h[k-2] }
  puts fibonacci[n.to_i]

end
