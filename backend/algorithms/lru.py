def lru(pages, frames):
    in_mem = []
    faults = 0

    for page in pages:
        if page not in in_mem:
            faults += 1
            if len(in_mem) < frames:
                in_mem.append(page)
            else:
                # Reemplazar la menos recientemente usada (al inicio)
                in_mem.pop(0)
                in_mem.append(page)
        else:
            # Si la página ya estaba, se actualiza su “recencia”
            in_mem.remove(page)
            in_mem.append(page)

    return faults
