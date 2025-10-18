from .simulate import simulate_detailed

def optimal(pages, frames, detailed=False):
    """
    Algoritmo Optimal (Bélády).
    Reemplaza la página que no se usará por más tiempo en el futuro.
    Es el algoritmo óptimo teórico (requiere conocer referencias futuras).
    
    Args:
        pages: Lista de referencias a páginas.
        frames: Número de frames en memoria.
        detailed: Si True, devuelve dict con metrics y steps detallados.
                  Si False, devuelve solo el conteo de page faults.
    
    Returns:
        int: Número de page faults (si detailed=False)
        dict: {"metrics": {...}, "steps": [...]} (si detailed=True)
    
    Examples:
        >>> optimal([1, 2, 3, 1, 2, 4], 3)
        4
        >>> result = optimal([1, 2, 3, 1], 2, detailed=True)
        >>> result["metrics"]["faults"]
        3
    """
    result = simulate_detailed("optimal", pages, frames)
    if detailed:
        return result
    return result["metrics"]["faults"]
