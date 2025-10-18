def compute_metrics(total_accesses, page_faults, exec_time, algorithm):
    # Hit/Miss ratio
    hits = total_accesses - page_faults
    hit_ratio = hits / total_accesses
    miss_ratio = page_faults / total_accesses

    # Throughput: accesos por segundo
    throughput = total_accesses / exec_time if exec_time > 0 else 0

    # Uso de CPU (simulado): % de tiempo útil / total
    # Supongamos que cada hit toma 1µs y cada fallo 10ms (10,000µs)
    t_hit = 1e-6
    t_fault = 0.01
    total_cpu_time = hits*t_hit + page_faults*t_fault
    cpu_usage = (total_accesses*t_hit) / total_cpu_time if total_cpu_time > 0 else 0

    # Fairness (solo útil si comparas varios algoritmos)
    fairness = 1.0  # placeholder: se compara luego entre algoritmos

    return {
        "algorithm": algorithm,
        "total_accesses": total_accesses,
        "page_faults": page_faults,
        "hit_ratio": round(hit_ratio, 4),
        "miss_ratio": round(miss_ratio, 4),
        "exec_time_s": round(exec_time, 6),
        "throughput": round(throughput, 2),
        "cpu_usage": round(cpu_usage * 100, 2),  # %
        "fairness": fairness
    }
