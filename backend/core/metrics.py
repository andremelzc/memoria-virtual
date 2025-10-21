def compute_metrics(total_accesses, page_faults, exec_time, algorithm,frames_used=None, total_frames=None, precision=None):
    print(f"[DEBUG compute_metrics] frames_used={frames_used}, total_frames={total_frames}")
    # Hit/Miss ratio
    hits = total_accesses - page_faults #se resta total de accesps menos fallos de pagina
    hit_ratio = hits / total_accesses #porcentaje de aciertos respecto al total de accesos
    miss_ratio = page_faults / total_accesses #porcentaje de fallos respecto al total de accesos -------

    # Throughput: accesos por segundo
    throughput = total_accesses / exec_time if exec_time > 0 else 0

    # Uso de CPU (simulado): % de tiempo útil / total
    # Supongamos que cada hit toma 1µs y cada fallo 10ms (10,000µs)
    t_hit = 1e-6
    t_fault = 0.01
    total_cpu_time = hits*t_hit + page_faults*t_fault #tiempo total de CPU usado
    avg_acces_time = total_cpu_time / total_accesses if total_accesses > 0 else 0 #tiempo promedio por acceso ------
    
    cpu_usage = (total_accesses*t_hit) / total_cpu_time if total_cpu_time > 0 else 0

    # Fairness (solo útil si comparas varios algoritmos)
    fairness = 1.0  # placeholder: se compara luego entre algoritmos

    # Memoria utilizada (porcentaje)
    memory_utilization = (frames_used / total_frames * 100) if frames_used is not None and total_frames and total_frames > 0 else 0

    def _maybe_round(v):
        return round(v, precision) if (precision is not None and isinstance(v, (int, float))) else v


    return {
        "algorithm": algorithm,
        "total_accesses": total_accesses,
        "page_faults": page_faults,
        "hit_ratio": _maybe_round(hit_ratio),
        "miss_ratio": _maybe_round(miss_ratio),
        "exec_time_s": _maybe_round(float(exec_time)),
        "throughput": _maybe_round(throughput),
        "cpu_usage": _maybe_round(cpu_usage * 100),  # % value
        "avg_access_time_s": _maybe_round(avg_acces_time),
        "memory_utilization": _maybe_round(memory_utilization),  # porcentaje
        "fairness": 1.0
    }
