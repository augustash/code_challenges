# Odd Numbers Code Challenge
#
# Write a program to print the odd numbers from 1 to 99,
# one number per line to the console (STDOUT)

start_time = Time.now

(1..99).to_a.each { |n| p n unless n % 2 == 0 }

puts "\nCompleted in #{Time.now - start_time} ms"
