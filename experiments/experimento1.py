# ...existing code...
from pathlib import Path
import sys

# añadir la raíz del proyecto (memoria-virtual) a sys.path para que `backend` sea importable
project_root = str(Path(__file__).resolve().parent.parent)
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from backend.core.simulator import run_simulation

#tmp se que hace lo de arriba:v

pages = [1,2,3,1,4,2,5,1,2,3,4,5]
frames = 50
algorithm_name = "FIFO"
algorithm_name2 = "LRU"
algorithm_name3 = "MRU"
algorithm_name4 = "OPT"
print(run_simulation(pages, frames, algorithm_name))
# ...existing code...