import random

# n_pages: numero de paginas que tiene el "prceso"
# length: longitud de la secuencia de accesos (cuantas veces la memoria pide el acceso a una pagina)
def generate_random_accesses(n_pages, length):
    return [random.randint(0, n_pages-1) for _ in range(length)]

def generate_loop_pattern(loop_size, repeats):
    pattern = list(range(loop_size))
    return (pattern * repeats)[:loop_size*repeats]

def generate_mixed_pattern(n_pages, loop_size, repeats):
    pattern = []
    for _ in range(repeats):
        pattern.extend(list(range(loop_size)))
        pattern.extend(random.sample(range(n_pages), loop_size))
    return pattern
