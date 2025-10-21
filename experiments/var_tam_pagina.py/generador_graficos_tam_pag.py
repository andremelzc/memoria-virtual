# graficos_tamano_pagina.py
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

# ------------------------------------------------------------
# 🔹 Configuración inicial
# ------------------------------------------------------------
base_dir = Path(__file__).resolve().parent

# Carga los tres CSV (ajusta nombres si cambiaste alguno)
files = {
    "Memoria pequeña": base_dir / "resultados_tamano_pagina_pequena.csv",
    "Memoria media": base_dir / "resultados_tamano_pagina_media.csv",
    "Memoria grande": base_dir / "resultados_tamano_pagina_grande.csv",
}

# Paleta y marcadores por algoritmo
colors = {
    "FIFO": "#FF6B6B",
    "LRU": "#4ECDC4",
    "MRU": "#FFD93D",
    "OPT": "#1A535C"
}

markers = {
    "FIFO": "o",
    "LRU": "s",
    "MRU": "D",
    "OPT": "^"
}

# ------------------------------------------------------------
# 🔹 Función para graficar una métrica
# ------------------------------------------------------------
def plot_metric(df, metric, title, ylabel, filename):
    plt.figure(figsize=(8,5))
    for algo, subdf in df.groupby("algorithm"):
        plt.plot(
            subdf["page_size"], 
            subdf[metric],
            marker=markers.get(algo, "o"),
            color=colors.get(algo, None),
            label=algo,
            linewidth=2,
            markersize=6
        )

    plt.title(title, fontsize=13, weight="bold")
    plt.xlabel("Tamaño de página", fontsize=11)
    plt.ylabel(ylabel, fontsize=11)
    plt.grid(alpha=0.3)
    plt.legend()
    plt.tight_layout()
    out = base_dir / filename
    plt.savefig(out, dpi=300)
    plt.close()
    print(f"✅ Gráfico generado: {out.name}")

# ------------------------------------------------------------
# 🔹 Generar gráficos para cada escenario (pequeña, media, grande)
# ------------------------------------------------------------
for name, path in files.items():
    df = pd.read_csv(path)
    
    # Normaliza nombres (por si se grabaron en minúsculas)
    df["algorithm"] = df["algorithm"].str.upper()

    # --- Gráfico 1: Tasa de fallos de página ---
    plot_metric(
        df,
        metric="page_faults",
        title=f"Tasa de fallos de página - {name}",
        ylabel="Número de fallos de página",
        filename=f"grafico_fallos_{name.replace(' ', '_').lower()}.png"
    )

    # --- Gráfico 2: Hit ratio ---
    plot_metric(
        df,
        metric="hit_ratio",
        title=f"Hit Ratio - {name}",
        ylabel="Proporción de aciertos",
        filename=f"grafico_hitratio_{name.replace(' ', '_').lower()}.png"
    )

    # --- Gráfico 3: Tiempo promedio de acceso ---
    plot_metric(
        df,
        metric="avg_access_time_s",
        title=f"Tiempo promedio de acceso - {name}",
        ylabel="Tiempo (segundos)",
        filename=f"grafico_tiempo_{name.replace(' ', '_').lower()}.png"
    )
