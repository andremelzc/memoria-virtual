"""
Políticas de reemplazo de páginas.
Cada función de política decide qué índice de frame reemplazar cuando ocurre un page fault.
"""
from collections import deque
from typing import Dict, Any, List, Tuple, Callable

PolicyFn = Callable[[Dict[str, Any], List[int], Dict[int, int], List[int], int], int]


def policy_fifo(ctx: Dict[str, Any], frames_state: List[int], last_used: Dict[int, int], pages: List[int], i: int) -> int:
    """
    FIFO (First In First Out): reemplaza el frame que se cargó primero.
    Usa una cola (deque) almacenada en ctx["fifo_queue"] para trackear el orden.
    """
    q: deque = ctx.setdefault("fifo_queue", deque())
    if not q:
        # fallback: si la cola está vacía (no debería pasar), reemplazar índice 0
        return 0
    idx = q.popleft()
    q.append(idx)
    return idx


def policy_lru(ctx: Dict[str, Any], frames_state: List[int], last_used: Dict[int, int], pages: List[int], i: int) -> int:
    """
    LRU (Least Recently Used): reemplaza el frame usado hace más tiempo.
    """
    return min(last_used, key=last_used.get)


def policy_mru(ctx: Dict[str, Any], frames_state: List[int], last_used: Dict[int, int], pages: List[int], i: int) -> int:
    """
    MRU (Most Recently Used): reemplaza el frame usado más recientemente.
    """
    return max(last_used, key=last_used.get)


def policy_optimal(ctx: Dict[str, Any], frames_state: List[int], last_used: Dict[int, int], pages: List[int], i: int) -> int:
    """
    Optimal (Bélády): reemplaza el frame que no se usará por más tiempo en el futuro.
    """
    remaining = pages[i + 1:]
    future_uses: List[Tuple[int, float]] = []
    for idx_cur, val in enumerate(frames_state):
        if val == -1:
            next_use = float("inf")
        else:
            next_use = remaining.index(val) if val in remaining else float("inf")
        future_uses.append((idx_cur, next_use))
    idx = max(future_uses, key=lambda t: t[1])[0]
    return idx


def get_policy(name: str) -> PolicyFn:
    """
    Devuelve la función de política correspondiente al algoritmo solicitado.
    """
    name = name.lower()
    if name == "fifo":
        return policy_fifo
    if name == "lru":
        return policy_lru
    if name == "mru":
        return policy_mru
    if name in ("optimal","opt"):
        return policy_optimal
    raise ValueError(f"Unknown algorithm policy: {name}")
