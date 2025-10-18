from .simulate import simulate_detailed

def fifo(pages, frames, detailed=False):
    """
    Algoritmo FIFO (First In First Out).
    Reemplaza la página que fue cargada hace más tiempo (la primera en entrar).
    
    Args:
        pages: Lista de referencias a páginas.
        frames: Número de frames en memoria.
        detailed: Si True, devuelve dict con metrics y steps detallados.
                  Si False, devuelve solo el conteo de page faults.
    
    Returns:
        int: Número de page faults (si detailed=False)
        dict: {"metrics": {...}, "steps": [...]} (si detailed=True)
    
    Examples:
        >>> fifo([1, 2, 3, 1, 2, 4], 3)
        4
        >>> result = fifo([1, 2, 3, 1], 2, detailed=True)
        >>> result["metrics"]["faults"]
        3
    """
    result = simulate_detailed("fifo", pages, frames)
    if detailed:
        return result
    return result["metrics"]["faults"]
