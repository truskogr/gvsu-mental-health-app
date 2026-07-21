import math

def bracket_column_counter(N):
  if N == 2:
      return (5)
    
  elif N <= 4:
    return (6 + bracket_column_counter(N-1))

  else:
    return (math.floor(math.log2(N)) + bracket_column_counter(N-1))


