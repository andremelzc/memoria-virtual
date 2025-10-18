import random
from backend.core.simulator import run_simulation

pages = [random.randint(0, 9) for _ in range(1000)]
frames = 4

for algo in ["FIFO", "LRU", "OPT"]:
    result = run_simulation(pages, frames, algo)
    print(result)
