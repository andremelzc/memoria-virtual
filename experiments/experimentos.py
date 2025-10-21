# ...existing code...
import os
from pathlib import Path
import pandas as pd
import matplotlib.pyplot as plt
import binascii
import sys

# directorio del script y ruta al CSV esperado
script_dir = Path(__file__).resolve().parent
csv_path = script_dir / "results.csv"

# mensajes de diagnóstico mínimos
print(f"cwd = {Path.cwd()}")
print(f"script_dir = {script_dir}")
print(f"csv_path = {csv_path}")
print(f"csv_exists = {csv_path.exists()}")

if not csv_path.exists():
    raise FileNotFoundError(f"No se encontró {csv_path}. Mueve results.csv a esa carpeta o ajusta la ruta.")

# leer primeros bytes para descartar ZIP/corrupción
with open(csv_path, "rb") as f:
    head = f.read(4)
print("first4bytes =", binascii.hexlify(head).upper())

if head.startswith(b"PK"):
    raise RuntimeError(f"{csv_path} parece ser un ZIP (cabecera PK). Descomprime y usa el CSV real.")

#lo de arriba no se para que sirve, pero no me corria sin eso, y notebook tmp me corre

# ahora carga y grafica
df = pd.read_csv(csv_path)

plt.figure(figsize=(8,5))
for algo in df["algorithm"].unique():
    subset = df[df["algorithm"] == algo]
    plt.plot(subset["frames"], subset["hit_ratio"], marker='o', label=algo)

plt.xlabel("Frames de memoria")
plt.ylabel("Hit ratio")
plt.title("Comparación de algoritmos de reemplazo de página")
plt.legend()
plt.grid(True)
plt.show()
# ...existing code...