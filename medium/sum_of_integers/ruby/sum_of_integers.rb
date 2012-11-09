# == Sum of Integers
#
# Write a program to determine the largest sum of contiguous integers
# in a list. In other words, of all the possible contiguous subarrays
# for a given array, find the one with the largest sum, and print that sum.
#
#
# Your program should accept a textfile as its first argument. This file
# will a comma separated list of integers, one set per line. e.g.
#
# -- Example Input:
#
# 	-10, 2, 3, -2, 0, 5, -15
# 	2,3,-2,-1,10
#
#
# -- Example Output:
#
# 	8
# 	12
#
#
# ARGV[0] should be the text file you pass in when you call this script
#
# -- Example:
#
#   $ ruby sum_of_integers.rb list.txt
#
#
# -- ANSWER SHOULD BE:
#
#   23
#   22
#
File.open(ARGV[0]).each_line do |line|
  # begin coding here
  max_so_far      = 0
  max_ending_here = 0

  line.split(',').each do |n|
    max_ending_here   = [0, max_ending_here + n.to_i].max
    max_so_far        = [max_ending_here, max_so_far].max
  end
  puts max_so_far
end
