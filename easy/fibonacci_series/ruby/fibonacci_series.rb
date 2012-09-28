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
  fibber = Fibber.new

  puts "Finding Fibonacci value at position #{n.to_i}"

  puts "using Fibber#fib_array(n)"
  puts fibber.fib_array(n)

  puts "using Fibber#fib_iterative(n)"
  puts fibber.fib_iterative(n)

end