from pathlib import Path
import sys
import pandas as pd

# 🔹 Asegura que el proyecto raíz esté en sys.path
current_dir = Path(__file__).resolve().parent
project_root = current_dir.parent.parent  # <- sube dos niveles
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))


from backend.core.simulator import run_simulation

# ------------------------------------------------------------
# 🔹 Funciones auxiliares
# ------------------------------------------------------------
def generate_address_stream(length: int, window: int = 128):
    """
    Genera direcciones 0..window-1 de forma secuencial (simula localidad espacial).
    """
    addrs = []
    i = 0
    while len(addrs) < length:
        addrs.append(i % window)
        i += 1
    return addrs

def map_addresses_to_pages(addresses, page_size):
    """Convierte direcciones a páginas según el tamaño de página."""
    return [addr // page_size for addr in addresses]

def run_experiment(n_accesses, locality_window, frames, page_sizes, csv_name):
    algorithms = ["FIFO", "LRU", "MRU", "OPT"]
    addrs = generate_address_stream(n_accesses, locality_window)

    rows = []
    for ps in page_sizes:
        pages = map_addresses_to_pages(addrs, ps)

        for algo in algorithms:
            metrics = run_simulation(pages, frames, algo)
            rows.append({
                "algorithm": algo.upper(),
                "frames": frames,
                "page_size": ps,
                "n_accesses": n_accesses,
                "locality_window": locality_window,
                "page_faults": metrics.get("page_faults", 0),
                "hit_ratio": metrics.get("hit_ratio", 0.0),
                "avg_access_time_s": metrics.get("avg_access_time_s", 0.0),
                "memory_utilization": metrics.get("memory_utilization", 0.0),
            })

    df = pd.DataFrame(rows)
    out = current_dir / csv_name
    df.to_csv(out, index=False)
    print(f"✅ CSV generado: {out}")

# ==========================================================
# 🔸 Subescenario 1: Frames pequeños
# ==========================================================
run_experiment(
    n_accesses=2000,
    locality_window=128,
    frames=6,
    page_sizes=[1, 2, 4, 8, 16, 32],
    csv_name="resultados_tamano_pagina_pequena.csv"
)

# ==========================================================
# 🔸 Subescenario 2: Frames medianos
# ==========================================================
run_experiment(
    n_accesses=2000,
    locality_window=128,
    frames=12,
    page_sizes=[1, 2, 4, 8, 16, 32],
    csv_name="resultados_tamano_pagina_media.csv"
)

# ==========================================================
# 🔸 Subescenario 3: Frames grandes
# ==========================================================
run_experiment(
    n_accesses=2000,
    locality_window=128,
    frames=24,
    page_sizes=[1, 2, 4, 8, 16, 32],
    csv_name="resultados_tamano_pagina_grande.csv"
)
