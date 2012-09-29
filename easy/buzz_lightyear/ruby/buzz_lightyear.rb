# Buzz Lightyear Code Challenge
#
# Give all possible values of `x` where `x == x + 2` will evaluate to `true`

start_time = Time.now

[1.0/0, -1.0/0, 1e17].each { |x| p "#{x} evaluates to true" if x == x + 2 }

puts "\nCompleted in #{Time.now - start_time} ms"
