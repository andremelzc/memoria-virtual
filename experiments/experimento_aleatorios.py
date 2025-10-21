# ...existing code...
from pathlib import Path
import sys
import pandas as pd

project_root = str(Path(__file__).resolve().parent.parent)
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from backend.core.workload import generate_random_accesses
from backend.core.simulator import run_simulation

def run_experiment(n_pages, n_accesses, frames):
    algorithms = ["FIFO", "LRU", "MRU", "OPT"]
    pages = generate_random_accesses(n_pages, n_accesses)
    
    rows = []
    for algo in algorithms:
        metrics = run_simulation(pages, frames, algo)
        # extraer valores que ya retorna metrics.py
        page_faults = metrics.get("page_faults", 0)
        hit_ratio = metrics.get("hit_ratio", 0.0)
        exec_time_s = float(metrics.get("exec_time_s", 0.0))
        avg_access_time_s = metrics.get("avg_access_time_s", None)
        memory_utilization = metrics.get("memory_utilization", None)
        frames_used = metrics.get("frames_used", None)

        rows.append({
            "algorithm": algo,
            "frames": frames,
            "n_pages": n_pages,
            "n_accesses": n_accesses,
            "page_faults": page_faults,
            "hit_ratio": hit_ratio,
            "exec_time_s": exec_time_s,
            "avg_access_time_s": avg_access_time_s,
            "memory_utilization": memory_utilization,
            "frames_used": frames_used
        })

    return pd.DataFrame(rows)

# Experimentos sugeridos:
experiments = [
    {"n_pages": 10, "n_accesses": 100, "frames": 5},  # 20% del espacio de páginas
    {"n_pages": 10, "n_accesses": 100, "frames": 5},
    {"n_pages": 10, "n_accesses": 100, "frames": 5},
    {"n_pages": 10, "n_accesses": 100, "frames": 5},
    {"n_pages": 5, "n_accesses": 100, "frames": 5},
    {"n_pages": 15, "n_accesses": 100, "frames": 5},
    {"n_pages": 20, "n_accesses": 100, "frames": 5},
    {"n_pages": 10, "n_accesses": 50, "frames": 5},
    {"n_pages": 10, "n_accesses": 200, "frames": 5},
    {"n_pages": 10, "n_accesses": 500, "frames": 5},
]

all_results = []
for exp in experiments:
    df = run_experiment(**exp)
    all_results.append(df)

all_results = pd.concat(all_results, ignore_index=True)

out_csv = Path(__file__).resolve().parent / "resultadosRandom11.csv"
all_results.to_csv(out_csv, index=False)
print(f"Resultados guardados en {out_csv}")

# resumen rápido
print("\nPromedio de hit ratio por algoritmo:")
print(all_results.groupby("algorithm")["hit_ratio"].mean())
# ...existing code...