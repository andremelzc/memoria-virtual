def optimal(pages, frames):
    in_mem = []
    faults = 0

    for i, page in enumerate(pages):
        if page not in in_mem:
            faults += 1
            if len(in_mem) < frames:
                in_mem.append(page)
            else:
                # Buscar la que se usará más tarde o nunca
                future = {}
                for p in in_mem:
                    if p in pages[i+1:]:
                        future[p] = pages[i+1:].index(p)
                    else:
                        future[p] = float('inf')
                to_remove = max(future, key=future.get)
                in_mem.remove(to_remove)
                in_mem.append(page)
    return faults
