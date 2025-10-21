import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

# ------------------------------------------------------------
# Configuración
# ------------------------------------------------------------
base_dir = Path(__file__).resolve().parent
csv_path = base_dir / "resultados_localidad.csv"

# Cargar y normalizar datos
df = pd.read_csv(csv_path)
df["algorithm"] = df["algorithm"].str.upper()

# Paleta de colores y marcadores (asegurando visibilidad)
colors = {
    "FIFO": "#E63946",   # rojo intenso
    "LRU": "#457B9D",    # azul grisáceo
    "MRU": "#F4A261",    # naranja claro
    "OPT": "#2A9D8F"     # verde agua
}
markers = {
    "FIFO": "X",   # marcador grande para destacarlo
    "LRU": "o",
    "MRU": "s",
    "OPT": "^"
}

def plot_metric(metric, ylabel, title, filename):
    plt.figure(figsize=(8,5))
    for algo, subdf in df.groupby("algorithm"):
        plt.plot(
            subdf["loop_size"],
            subdf[metric],
            label=algo,
            color=colors.get(algo, "#000000"),
            marker=markers.get(algo, "o"),
            linewidth=2,
            markersize=7,
            alpha=0.9 if algo != "FIFO" else 0.7  # FIFO un poco transparente
        )

    plt.title(title, fontsize=13, weight="bold")
    plt.xlabel("Tamaño del loop (cantidad de páginas por ciclo)", fontsize=11)
    plt.ylabel(ylabel, fontsize=11)
    plt.grid(alpha=0.3)
    plt.legend()
    plt.tight_layout()
    out_path = base_dir / filename
    plt.savefig(out_path, dpi=300)
    plt.close()
    print(f"✅ Gráfico generado: {out_path.name}")

# ------------------------------------------------------------
# 🔹 Gráficos generados
# ------------------------------------------------------------
plot_metric("page_faults", "Número de fallos de página",
             "Fallos de página vs Tamaño de loop", "grafico_localidad_fallos.png")

plot_metric("hit_ratio", "Proporción de aciertos (Hit Ratio)",
             "Hit Ratio vs Tamaño de loop", "grafico_localidad_hitratio.png")

plot_metric("avg_access_time_s", "Tiempo promedio de acceso (s)",
             "Tiempo promedio vs Tamaño de loop", "grafico_localidad_tiempo.png")
