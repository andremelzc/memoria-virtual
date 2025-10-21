import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

# ==========================================================
# 🔹 CONFIGURACIÓN
# ==========================================================
# Carpeta donde se guardaron tus resultados
BASE_PATH = Path(__file__).resolve().parent

# Archivos de resultados generados
CSV_FILES = {
    "Frames": BASE_PATH / "resultados_aleatorio_frames.csv",
    "Páginas": BASE_PATH / "resultados_aleatorio_pages.csv",
    "Accesos": BASE_PATH / "resultados_aleatorio_accesses.csv",
    "Combinado": BASE_PATH / "resultados_aleatorio_mix.csv"
}

# Métricas a graficar
METRICAS = {
    "hit_ratio": "Tasa de aciertos (Hit Ratio)",
    "avg_access_time_s": "Tiempo de acceso promedio (s)",
    "memory_utilization": "Uso de memoria (%)"
}


# ==========================================================
# 🔹 FUNCIÓN PARA GRAFICAR CADA CSV
# ==========================================================
def graficar_resultados(nombre_escenario, df):
    # Convertir posibles valores nulos
    df = df.fillna(0)

    # Detectar eje X dinámicamente (frames o n_pages o n_accesses)
    if "frames" in df.columns and len(df["frames"].unique()) > 1:
        eje_x = "frames"
        etiqueta_x = "Frames de memoria"
    elif "n_pages" in df.columns and len(df["n_pages"].unique()) > 1:
        eje_x = "n_pages"
        etiqueta_x = "Número de páginas virtuales"
    elif "n_accesses" in df.columns and len(df["n_accesses"].unique()) > 1:
        eje_x = "n_accesses"
        etiqueta_x = "Cantidad de accesos"
    else:
        eje_x = "frames"
        etiqueta_x = "Frames"

    # Graficar cada métrica
    for columna, titulo in METRICAS.items():
        plt.figure(figsize=(8, 5))
        for algo in df["algorithm"].unique():
            subset = df[df["algorithm"] == algo]
            plt.plot(subset[eje_x], subset[columna], marker="o", label=algo)

        plt.title(f"{titulo} - Escenario: {nombre_escenario}")
        plt.xlabel(etiqueta_x)
        plt.ylabel(titulo)
        plt.legend()
        plt.grid(True)

        # Guardar gráfico
        out_file = BASE_PATH / f"grafico_{columna.lower()}_{nombre_escenario.lower()}.png"
        plt.savefig(out_file, dpi=300)
        plt.close()
        print(f"✅ Gráfico guardado: {out_file}")


# ==========================================================
# 🔹 PROCESAR TODOS LOS CSV
# ==========================================================
for nombre, ruta in CSV_FILES.items():
    if ruta.exists():
        print(f"\n📊 Procesando escenario: {nombre}")
        df = pd.read_csv(ruta)
        graficar_resultados(nombre, df)
    else:
        print(f"⚠️ No se encontró el archivo: {ruta.name}")

print("\n🎯 ¡Todos los gráficos generados exitosamente!")
