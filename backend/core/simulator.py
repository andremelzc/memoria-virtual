import time
from backend.algorithms.fifo import fifo
from backend.algorithms.lru import lru
from backend.algorithms.optimal import optimal
from backend.algorithms.mru import mru
from backend.core.metrics import compute_metrics
from backend.algorithms.simulate import simulate_detailed  # nuevo import

ALGORITHMS = {
    "FIFO": fifo,
    "LRU": lru,
    "OPT": optimal,
    "MRU": mru
}

def run_simulation(pages, frames, algorithm_name):
    algo_fn = ALGORITHMS[algorithm_name]

    start = time.perf_counter()

    # Intentar usar simulate_detailed para obtener frames_used exacto
    frames_used = None
    detailed = None
    try:
        detailed = simulate_detailed(algorithm_name.lower(), pages, frames)
        detailed_metrics = detailed.get("metrics", {}) if isinstance(detailed, dict) else {}
        faults = detailed_metrics.get("faults", None)
        frames_used = detailed_metrics.get("frames_used", None)
        # si simulate_detailed devolvió faults use ese valor
        if faults is None:
            # fallback a la versión simple si no viene faults
            faults = algo_fn(pages, frames)
    except Exception:
        # Fallback: llamar a la función del algoritmo que devuelve número de fallos
        faults = algo_fn(pages, frames)

    end = time.perf_counter()
    elapsed = end - start  # segundos

    metrics = compute_metrics(
        total_accesses=len(pages),
        page_faults=faults,
        exec_time=elapsed,
        algorithm=algorithm_name,
        frames_used=frames_used,
        total_frames=frames
    )

    # Adjuntar datos detallados si están disponibles
    if isinstance(detailed, dict):
        metrics["raw_metrics"] = detailed.get("metrics")
        metrics["steps"] = detailed.get("steps")

    return metrics
