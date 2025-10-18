from .simulate import simulate_detailed

def mru(pages, frames, detailed=False):
    """
    Algoritmo MRU (Most Recently Used).
    Reemplaza la página que se usó más recientemente.
    Es el opuesto a LRU y útil en ciertos patrones de acceso.
    
    Args:
        pages: Lista de referencias a páginas.
        frames: Número de frames en memoria.
        detailed: Si True, devuelve dict con metrics y steps detallados.
                  Si False, devuelve solo el conteo de page faults.
    
    Returns:
        int: Número de page faults (si detailed=False)
        dict: {"metrics": {...}, "steps": [...]} (si detailed=True)
    
    Examples:
        >>> mru([1, 2, 3, 1, 2, 4], 3)
        5
        >>> result = mru([1, 2, 3, 1], 2, detailed=True)
        >>> result["metrics"]["faults"]
        3
    """
    result = simulate_detailed("mru", pages, frames)
    if detailed:
        return result
    return result["metrics"]["faults"]
