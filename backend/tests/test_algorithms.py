from backend.algorithms.fifo import fifo
from backend.algorithms.lru import lru
from backend.algorithms.optimal import optimal

pages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3]
frames = 3


print("FIFO:", fifo(pages, frames)) #10
print("LRU:", lru(pages, frames)) #9
print("OPT:", optimal(pages, frames)) #7
