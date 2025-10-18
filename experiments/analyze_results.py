import csv
from backend.core.simulator import run_simulation
from backend.core.workload import generate_random_accesses

frames_list = [2, 4, 6, 8]
algorithms = ["FIFO", "LRU", "OPT", "MRU"]

with open("experiments/results.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=[
        "algorithm", "frames", "page_faults", "hit_ratio",
        "miss_ratio", "exec_time_s", "throughput", "cpu_usage"
    ])
    writer.writeheader()
    for frames in frames_list:
        pages = generate_random_accesses(20, 1000)
        for algo in algorithms:
            result = run_simulation(pages, frames, algo)
            # Ensure we write a consistent subset of fields
            row = {
                "algorithm": result.get("algorithm", algo),
                "frames": frames,
                "page_faults": result.get("page_faults"),
                "hit_ratio": result.get("hit_ratio"),
                "miss_ratio": result.get("miss_ratio"),
                "exec_time_s": result.get("exec_time_s"),
                "throughput": result.get("throughput"),
                "cpu_usage": result.get("cpu_usage"),
            }
            writer.writerow(row)
    print("Resultados guardados en experiments/results.csv ✅")
