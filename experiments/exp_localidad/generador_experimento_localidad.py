# generador_experimento_localidad.py
from pathlib import Path
import sys
import pandas as pd
import time

# --- Ajuste de ruta para que Python reconozca backend ---
current_dir = Path(__file__).resolve().parent
project_root = current_dir.parent.parent  # sube dos niveles
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from backend.core.simulator import run_simulation

# ------------------------------------------------------------
# 🔹 Generador de accesos con patrón de localidad (loops)
# ------------------------------------------------------------
def generate_loop_accesses(n_pages, length, loop_size=6):
    """Genera una secuencia que repite un conjunto de páginas (loop)."""
    seq = []
    i = 0
    while len(seq) < length:
        seq.append(i % loop_size)
        i += 1
    return seq

# ------------------------------------------------------------
# 🔹 Función principal para ejecutar el experimento
# ------------------------------------------------------------
def run_experiment():
    algorithms = ["FIFO", "LRU", "MRU", "OPT"]
    loop_sizes = [4, 6, 8, 10, 12, 16]  # distintos tamaños de loop
    frames = 6
    n_pages = 40
    n_accesses = 800

    results = []

    for loop in loop_sizes:
        print(f"\n▶ Ejecutando loop_size={loop}")
        pages = generate_loop_accesses(n_pages, n_accesses, loop_size=loop)

        for algo in algorithms:
            start = time.perf_counter()
            metrics = run_simulation(pages, frames, algo)
            elapsed = time.perf_counter() - start

            results.append({
                "algorithm": algo,
                "loop_size": loop,
                "frames": frames,
                "n_pages": n_pages,
                "n_accesses": n_accesses,
                "page_faults": metrics["page_faults"],
                "hit_ratio": metrics["hit_ratio"],
                "avg_access_time_s": metrics["avg_access_time_s"],
                "exec_time_s": elapsed
            })

    df = pd.DataFrame(results)
    out_path = current_dir / "resultados_localidad.csv"
    df.to_csv(out_path, index=False)
    print(f"\n✅ CSV generado: {out_path}")

if __name__ == "__main__":
    run_experiment()
