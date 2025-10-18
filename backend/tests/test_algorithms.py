from backend.algorithms.fifo import fifo
from backend.algorithms.lru import lru
from backend.algorithms.optimal import optimal

pages = [1, 2, 3, 1, 4, 5]
frames = 3

print("FIFO:", fifo(pages, frames))
print("LRU:", lru(pages, frames))
print("OPT:", optimal(pages, frames))
