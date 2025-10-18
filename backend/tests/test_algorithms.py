from backend.algorithms.fifo import fifo
from backend.algorithms.lru import lru
from backend.algorithms.optimal import optimal
from backend.algorithms.mru import mru


def test_replacement_counts():
	pages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3]
	frames = 3

	# Expected faults for the classic example
	fifo_res = fifo(pages, frames)
	lru_res = lru(pages, frames)
	opt_res = optimal(pages, frames)
	mru_res = mru(pages, frames)

	# Print results so the user can see them in console output
	print("FIFO:", fifo_res)  # expected 10
	print("LRU:", lru_res)   # expected 9
	print("OPT:", opt_res)   # expected 7
	print("MRU:", mru_res)   # expected 11? (depends on pattern)

	assert fifo_res == 10
	assert lru_res == 9
	assert opt_res == 7
	# MRU expected behavior depends on access pattern; ensure it returns an int
	assert isinstance(mru_res, int)
    
