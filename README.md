# 🧠 Simulador de Memoria Virtual

Un simulador interactivo de algoritmos de reemplazo de páginas para memoria virtual, desarrollado con React y FastAPI.

![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-blue?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green?logo=fastapi&logoColor=white)
## 📋 Descripción

Este proyecto es un simulador educativo que permite visualizar y comparar diferentes algoritmos de reemplazo de páginas utilizados en sistemas de memoria virtual. Incluye implementaciones de los algoritmos más importantes:

- **FIFO** (First In, First Out)
- **LRU** (Least Recently Used)
- **Optimal** (Algoritmo Óptimo de Belady)

## ✨ Características

- 🎯 **Simulación interactiva** de algoritmos de reemplazo de páginas
- 📊 **Comparación visual** de rendimiento entre algoritmos
- 🧮 **Cálculo automático** de page faults
- 🎨 **Interfaz** con React y TailwindCSS
- 🚀 **API REST** rápida con FastAPI
- 🔧 **Configuración personalizable** de parámetros de simulación

## 📝 Ejecutar frontend y backend

### Backend
```bash
# Ejecutar servidor de desarrollo
python -m uvicorn backend.api.server:app --reload --port 8000

```

### Frontend
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

```


## 📡 API Endpoints

La API REST está documentada automáticamente con Swagger. Una vez ejecutando el backend, visita:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Principales Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/simulate` | Ejecuta simulación de algoritmos |
| `GET` | `/algorithms` | Lista algoritmos disponibles |
| `POST` | `/generate-workload` | Genera secuencia de páginas |
| `GET` | `/health` | Estado del servidor |

## 🎯 Uso del Simulador

1. **Acceder al simulador** en `http://localhost:5173/simulator`
2. **Configurar parámetros:**
   - Secuencia de páginas
   - Número de marcos de página
   - Algoritmos a comparar
3. **Ejecutar simulación** y observar resultados
4. **Analizar métricas** de rendimiento

## 🛠️ Tecnologías Utilizadas

### Backend
- **FastAPI** - Framework web moderno y rápido
- **Python 3.8+** - Lenguaje de programación

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de build y desarrollo
- **TailwindCSS 4** - Framework de CSS
- **React Router** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP



## 📚 Algoritmos Implementados

### FIFO (First In, First Out)
Reemplaza la página que ha estado más tiempo en memoria.

### LRU (Least Recently Used)
Reemplaza la página que no ha sido utilizada por más tiempo.

### Optimal (Algoritmo de Belady)
Reemplaza la página que será referenciada más tarde en el futuro (o nunca).
