# experimento_aleatorios.py
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
        rows.append({
            "algorithm": algo,
            "frames": frames,
            "n_pages": n_pages,
            "n_accesses": n_accesses,
            "page_faults": metrics["page_faults"],
            "hit_ratio": metrics["hit_ratio"],
            "avg_access_time_s": metrics["avg_access_time_s"],
            "memory_utilization": metrics["memory_utilization"]
        })
    return pd.DataFrame(rows)

# ==========================================================
# 🔹 Subescenario 1: Variando el número de FRAMES
# ==========================================================
experiments_frames = [
    {"n_pages": 20, "n_accesses": 300, "frames": 2},
    {"n_pages": 20, "n_accesses": 300, "frames": 4},
    {"n_pages": 20, "n_accesses": 300, "frames": 8},
    {"n_pages": 20, "n_accesses": 300, "frames": 12},
    {"n_pages": 20, "n_accesses": 300, "frames": 16},
    {"n_pages": 20, "n_accesses": 300, "frames": 24},
]
df_frames = pd.concat([run_experiment(**e) for e in experiments_frames], ignore_index=True)
df_frames.to_csv("resultados_aleatorio_frames.csv", index=False)
print("✅ CSV generado: resultados_aleatorio_frames.csv")

# ==========================================================
# 🔹 Subescenario 2: Variando el número de PÁGINAS
# ==========================================================
experiments_pages = [
    {"n_pages": 8, "n_accesses": 300, "frames": 6},
    {"n_pages": 12, "n_accesses": 300, "frames": 6},
    {"n_pages": 16, "n_accesses": 300, "frames": 6},
    {"n_pages": 24, "n_accesses": 300, "frames": 6},
    {"n_pages": 32, "n_accesses": 300, "frames": 6},
    {"n_pages": 48, "n_accesses": 300, "frames": 6},
]
df_pages = pd.concat([run_experiment(**e) for e in experiments_pages], ignore_index=True)
df_pages.to_csv("resultados_aleatorio_pages.csv", index=False)
print("✅ CSV generado: resultados_aleatorio_pages.csv")

# ==========================================================
# 🔹 Subescenario 3: Variando el número de ACCESOS
# ==========================================================
experiments_accesses = [
    {"n_pages": 20, "n_accesses": 100, "frames": 6},
    {"n_pages": 20, "n_accesses": 300, "frames": 6},
    {"n_pages": 20, "n_accesses": 1000, "frames": 6},
    {"n_pages": 20, "n_accesses": 3000, "frames": 6},
]
df_accesses = pd.concat([run_experiment(**e) for e in experiments_accesses], ignore_index=True)
df_accesses.to_csv("resultados_aleatorio_accesses.csv", index=False)
print("✅ CSV generado: resultados_aleatorio_accesses.csv")

print("\n🎯 Todos los experimentos aleatorios finalizados.")
