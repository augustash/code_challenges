#############################################
# == Reverse Words Code Challenge			#
#############################################
# 
# Write a method to reverse the words of an input sentence. 
# Reverse and print out each line's content as a new line to the console.
# 
# 
# -- Example Input:
# 
#  	Hello World
#  	August Ash
# 
# 
# -- Example Output:
# 
#  	World Hello
#  	Ash August
#
#
# ARGV[0] should be the text file you pass in when you call this script
# 
# -- Example:
# 
#   $ ruby reverse_words.rb list.txt
# 
File.open("list.txt").each_line do |line|
  print line.split.reverse.join(' ') + "\n"
end
