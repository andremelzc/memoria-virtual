import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
import numpy as np

# ------------------------------------------------------
# Cargar los 4 CSV generados
# ------------------------------------------------------
base = Path(__file__).resolve().parent
csvs = {
    "Memoria pequeña": "resultados_memoria_pequena.csv",
    "Memoria media": "resultados_memoria_media.csv",
    "Memoria grande": "resultados_memoria_grande.csv",
    "Comparación extrema": "resultados_memoria_comparacion.csv",
}

# ------------------------------------------------------
# Configuración de estilo visual
# ------------------------------------------------------
colors = {
    "FIFO": "#1f77b4",    # azul
    "LRU": "#ff7f0e",     # naranja
    "MRU": "#2ca02c",     # verde
    "OPT": "#d62728"      # rojo
}

markers = {
    "FIFO": "o",
    "LRU": "s",
    "MRU": "D",
    "OPT": "^"
}

plt.style.use("seaborn-v0_8-colorblind")

# ------------------------------------------------------
# Generar gráficos para cada CSV
# ------------------------------------------------------
for titulo, filename in csvs.items():
    df = pd.read_csv(base / filename).sort_values(by=["algorithm", "frames"])
    
    # Si por error las columnas no están como se espera
    if "hit_ratio" not in df.columns:
        print(f"⚠️ {filename} no tiene columna 'hit_ratio'. Saltando...")
        continue

    # Offsets para separar líneas superpuestas
    offset_map = {"FIFO": -0.3, "LRU": -0.1, "MRU": 0.1, "OPT": 0.3}

    # --- HIT RATIO ---
    plt.figure(figsize=(8,5))
    for algo, subdf in df.groupby("algorithm"):
        x_vals = np.array(subdf["frames"]) + offset_map.get(algo, 0)
        plt.plot(
            x_vals, subdf["hit_ratio"],
            marker=markers.get(algo, "o"),
            color=colors.get(algo, "black"),
            label=algo,
            linewidth=2,
            markersize=7
        )
    plt.title(f"Hit Ratio vs Tamaño de Memoria ({titulo})")
    plt.xlabel("Frames de memoria")
    plt.ylabel("Hit Ratio")
    plt.legend()
    plt.grid(True, linestyle="--", alpha=0.6)
    plt.tight_layout()
    plt.savefig(base / f"grafico_hit_ratio_{titulo.replace(' ', '_')}.png", dpi=300)
    plt.close()

    # --- PAGE FAULTS ---
    plt.figure(figsize=(8,5))
    for algo, subdf in df.groupby("algorithm"):
        x_vals = np.array(subdf["frames"]) + offset_map.get(algo, 0)
        plt.plot(
            x_vals, subdf["page_faults"],
            marker=markers.get(algo, "o"),
            color=colors.get(algo, "black"),
            label=algo,
            linewidth=2,
            markersize=7
        )
    plt.title(f"Fallos de Página vs Tamaño de Memoria ({titulo})")
    plt.xlabel("Frames de memoria")
    plt.ylabel("Número de fallos de página")
    plt.legend()
    plt.grid(True, linestyle="--", alpha=0.6)
    plt.tight_layout()
    plt.savefig(base / f"grafico_faults_{titulo.replace(' ', '_')}.png", dpi=300)
    plt.close()

    # --- TIEMPO DE ACCESO PROMEDIO ---
    plt.figure(figsize=(8,5))
    for algo, subdf in df.groupby("algorithm"):
        x_vals = np.array(subdf["frames"]) + offset_map.get(algo, 0)
        plt.plot(
            x_vals, subdf["avg_access_time_s"],
            marker=markers.get(algo, "o"),
            color=colors.get(algo, "black"),
            label=algo,
            linewidth=2,
            markersize=7
        )
    plt.title(f"Tiempo de Acceso Promedio vs Tamaño de Memoria ({titulo})")
    plt.xlabel("Frames de memoria")
    plt.ylabel("Tiempo promedio de acceso (segundos)")
    plt.legend()
    plt.grid(True, linestyle="--", alpha=0.6)
    plt.tight_layout()
    plt.savefig(base / f"grafico_tiempo_{titulo.replace(' ', '_')}.png", dpi=300)
    plt.close()

    print(f"✅ Gráficos generados para {titulo}")
