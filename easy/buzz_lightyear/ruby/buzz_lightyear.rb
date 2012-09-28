# Buzz Lightyear Code Challenge
#
# Give all possible values of `x` where `x == x + 2` will evaluate to `true`

values = [ 1.0/0, -1.0/0, 1e17 ]

values.each do |x|
  puts "#{x} evaluates to true" if x == x + 2
end