class Fibber
  # recursive
  def fib(n)
    n = n.to_i
    n < 2 ? n : fib(n-1) + fib(n-2)
  end

  # == fib_iterative
  # 
  # Although it is based directly on the definition of a Fibonacci number, 
  # the recursive Fibonacci algorithm is extremely expensive, requiring 
  # time O(2n). It also performs a huge amount of redundant work because 
  # it computes many Fibonnaci values from scratch many times. A simple 
  # linear-time iterative approach which calculates each value of fib 
  # successively can avoid these issues:
  def fib_iterative(n)
    n = n.to_i
    curr = 0
    succ = 1

    n.times do |i|
      curr, succ = succ, curr + succ
    end

    curr
  end

  # == fib_array(n)
  # 
  # The Array Method is an easier to read, linear computation that 
  # saves previous values to an array for lookup. This makes it much 
  # faster than recursion, though of course, uses more memory.
  def fib_array(n)
    n = n.to_i
    return n if n < 2
    
    vals = [0, 1]
    (n-1).times do 
      vals.push(vals[-1] + vals[-2]) 
    end
  
    vals.last
  end

end