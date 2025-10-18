import time
from backend.algorithms.fifo import fifo
from backend.algorithms.lru import lru
from backend.algorithms.optimal import optimal
from backend.algorithms.mru import mru
from backend.core.metrics import compute_metrics

ALGORITHMS = {
    "FIFO": fifo,
    "LRU": lru,
    "OPT": optimal,
    "MRU": mru
}

def run_simulation(pages, frames, algorithm_name):
    algo_fn = ALGORITHMS[algorithm_name]

    start = time.perf_counter()
    faults = algo_fn(pages, frames)
    end = time.perf_counter()
    elapsed = end - start  # segundos

    metrics = compute_metrics(
        total_accesses=len(pages),
        page_faults=faults,
        exec_time=elapsed,
        algorithm=algorithm_name
    )
    return metrics
