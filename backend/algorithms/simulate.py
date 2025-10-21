from collections import deque
from typing import List, Dict, Any
from .policies import get_policy


def simulate_detailed(algorithm: str, pages: List[int], frames: int) -> Dict[str, Any]:
    """
    Driver de simulación que ejecuta paso a paso el algoritmo de reemplazo.
    
    - Mantiene el estado de los frames y calcula hits/faults.
    - Captura un snapshot en cada acceso (paso).
    - Usa las políticas de reemplazo definidas en policies.py para decidir qué frame reemplazar.
    
    Args:
        algorithm: nombre del algoritmo (fifo, lru, mru, optimal)
        pages: secuencia de referencias a páginas
        frames: número de frames en memoria
        
    Returns:
        dict con keys "metrics" y "steps"
    """
    if frames <= 0:
        raise ValueError("frames must be > 0")
    if not isinstance(pages, list) or any(not isinstance(p, int) for p in pages):
        raise ValueError("pages must be a list of integers")

    # Obtener la política de reemplazo para el algoritmo solicitado
    policy = get_policy(algorithm)
    
    # Estado de la simulación
    frames_state: List[int] = [-1] * frames  # -1 = frame vacío
    steps: List[Dict[str, Any]] = []
    faults = 0
    hits = 0
    last_used = {i: -1 for i in range(frames)}  # índice -> última vez usado
    ctx: Dict[str, Any] = {}  # contexto para la política (ej: cola FIFO)

    for i, page in enumerate(pages):
        if page in frames_state:
            # HIT: la página ya está en memoria
            idx = frames_state.index(page)
            last_used[idx] = i
            result = "HIT"
            hits += 1
        else:
            # FAULT: la página no está en memoria
            faults += 1
            result = "FAULT"
            
            if -1 in frames_state:
                # Hay espacio libre: usar el primer hueco
                idx = frames_state.index(-1)
                frames_state[idx] = page
                last_used[idx] = i
                # Si es FIFO, agregar índice a la cola
                if algorithm == "fifo":
                    q = ctx.setdefault("fifo_queue", deque())
                    q.append(idx)
            else:
                # Memoria llena: llamar a la política para decidir qué reemplazar
                idx = policy(ctx, frames_state, last_used, pages, i)
                frames_state[idx] = page
                last_used[idx] = i

        # Capturar snapshot del estado después de procesar esta página
        steps.append({"page": page, "frames": list(frames_state), "result": result})

    total_requests = len(pages)
    
    # Calcular uso de marcos (simulado) a partir del estado final de frames_state
    #lo de aca tambien es nuevo, calcula memoria utilizada
    frames_used = sum(1 for frame in frames_state if frame != -1)
    total_frames = frames
    
    metrics = {
        "total_requests": total_requests,
        "hits": hits,
        "faults": faults,
        "fault_rate": (faults / total_requests) if total_requests > 0 else 0.0,
        #aca nuevas metricas, aunque solo se uasata el de memoria utilziada
        "frames_used": frames_used,    # marcos ocupados al final de la simulación
        "total_frames": total_frames,  # total de marcos disponibles
        "memory_utilization": frames_used / total_frames if total_frames > 0 else 0.0
    }
    
    print(f"[DEBUG simulate_detailed] frames_used={frames_used}, total_frames={total_frames}, utilization={frames_used/total_frames*100:.2f}%")

    return {"metrics": metrics, "steps": steps}
