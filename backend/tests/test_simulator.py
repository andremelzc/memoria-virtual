from backend.core.simulator import run_simulation


def test_run_simulation_metrics():
    # Small deterministic workload
    pages = [1, 2, 3, 2, 1, 4, 1, 2, 5]
    frames = 3

    for algo in ["FIFO", "LRU", "OPT", "MRU"]:
        result = run_simulation(pages, frames, algo)

        # Print the metrics so they appear in console output
        print(f"Result for {algo}:", result)

        # Basic structure expectations
        assert isinstance(result, dict)
        assert "algorithm" in result
        assert result["algorithm"] == algo
        assert "total_accesses" in result and result["total_accesses"] == len(pages)
        assert "page_faults" in result
        assert "exec_time_s" in result

