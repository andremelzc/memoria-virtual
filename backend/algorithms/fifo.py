from collections import deque

def fifo(pages, frames):
    queue = deque()
    in_mem = set()
    faults = 0

    for page in pages:
        if page not in in_mem:
            faults += 1
            if len(in_mem) == frames:
                removed = queue.popleft()
                in_mem.remove(removed)
            queue.append(page)
            in_mem.add(page)
    return faults
