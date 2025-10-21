from pathlib import Path
import sys
import pandas as pd

# ----------------------------------------------------------
# Asegurar que Python vea la carpeta raíz del proyecto
# ----------------------------------------------------------
current_dir = Path(__file__).resolve().parent
project_root = current_dir.parent.parent  # sube dos niveles: experiments/mem_peq_vs_grande → proyecto raíz
sys.path.insert(0, str(project_root))

from backend.core.simulator import run_simulation

# ----------------------------------------------------------
# Generador de patrón con localidad temporal y espacial
# (loops). No dependemos de otros módulos para que corra ya.
# loop_size define cuántas páginas se repiten por ciclo.
# ----------------------------------------------------------
def generate_loop_accesses(n_pages: int, length: int, loop_size: int = 6):
    """
    Genera una secuencia con localidad temporal y espacial:
    0,1,2,...,loop_size-1, 0,1,2,... (repite)
    - Si loop_size > n_pages, se recorta al máximo n_pages.
    """
    loop_size = max(1, min(loop_size, n_pages))
    seq = []
    i = 0
    while len(seq) < length:
        seq.append(i % loop_size)
        i += 1
    return seq


# ----------------------------------------------------------
# Runner de un experimento (mismo patrón, distintos frames)
# ----------------------------------------------------------
def run_experiment(n_pages, n_accesses, frames, loop_size):
    algorithms = ["FIFO", "LRU", "MRU", "OPT"]  # usa "OPT" (policies acepta "opt")
    pages = generate_loop_accesses(n_pages, n_accesses, loop_size=loop_size)

    rows = []
    for algo in algorithms:
        metrics = run_simulation(pages, frames, algo)
        # empaquetamos lo necesario + contexto del experimento
        rows.append({
            "algorithm": algo,
            "frames": frames,
            "n_pages": n_pages,
            "n_accesses": n_accesses,
            "loop_size": loop_size,
            "page_faults": metrics.get("page_faults", 0),
            "hit_ratio": metrics.get("hit_ratio", 0.0),
            "avg_access_time_s": metrics.get("avg_access_time_s", 0.0),
            "memory_utilization": metrics.get("memory_utilization", 0.0)
        })
    return pd.DataFrame(rows)


# ==========================================================
# 🔹 Subescenario 1: Memoria PEQUEÑA (pocos marcos)
#    (mismo patrón de acceso, variamos frames bajos)
# ==========================================================
df_small_a = run_experiment(n_pages=30, n_accesses=500, frames=2,  loop_size=6)
df_small_b = run_experiment(n_pages=30, n_accesses=500, frames=3,  loop_size=6)
df_small_c = run_experiment(n_pages=30, n_accesses=500, frames=4,  loop_size=6)
df_small = pd.concat([df_small_a, df_small_b, df_small_c], ignore_index=True)
df_small.to_csv("resultados_memoria_pequena.csv", index=False)
print("✅ CSV generado: resultados_memoria_pequena.csv")

# ==========================================================
# 🔹 Subescenario 2: Memoria MEDIA
# ==========================================================
df_medium_a = run_experiment(n_pages=30, n_accesses=500, frames=6,  loop_size=6)
df_medium_b = run_experiment(n_pages=30, n_accesses=500, frames=8,  loop_size=6)
df_medium_c = run_experiment(n_pages=30, n_accesses=500, frames=10, loop_size=6)
df_medium = pd.concat([df_medium_a, df_medium_b, df_medium_c], ignore_index=True)
df_medium.to_csv("resultados_memoria_media.csv", index=False)
print("✅ CSV generado: resultados_memoria_media.csv")

# ==========================================================
# 🔹 Subescenario 3: Memoria GRANDE
# ==========================================================
df_large_a = run_experiment(n_pages=30, n_accesses=500, frames=20, loop_size=6)
df_large_b = run_experiment(n_pages=30, n_accesses=500, frames=30, loop_size=6)
df_large_c = run_experiment(n_pages=30, n_accesses=500, frames=40, loop_size=6)
df_large = pd.concat([df_large_a, df_large_b, df_large_c], ignore_index=True)
df_large.to_csv("resultados_memoria_grande.csv", index=False)
print("✅ CSV generado: resultados_memoria_grande.csv")

# ==========================================================
# 🔹 Subescenario 4: Comparación extrema (pequeña vs grande)
#     - Mismo patrón, dos tamaños de memoria bien distintos.
# ==========================================================
df_cmp_small = run_experiment(n_pages=30, n_accesses=500, frames=3,  loop_size=6)
df_cmp_large = run_experiment(n_pages=30, n_accesses=500, frames=35, loop_size=6)
df_compare = pd.concat([df_cmp_small, df_cmp_large], ignore_index=True)
df_compare.to_csv("resultados_memoria_comparacion.csv", index=False)
print("✅ CSV generado: resultados_memoria_comparacion.csv")

print("\n🎯 Todos los experimentos de 'Memoria pequeña vs grande' finalizados.")
