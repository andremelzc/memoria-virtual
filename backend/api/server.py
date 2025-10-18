from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Literal
from collections import deque
import os

try:
	from dotenv import load_dotenv
	load_dotenv()
except Exception:
	pass

from ..algorithms.fifo import fifo
from ..algorithms.lru import lru
from ..algorithms.optimal import optimal


class SimulationRequest(BaseModel):
	algorithm: Literal["fifo", "lru", "optimal", "mru"]
	pages: List[int] = Field(..., description="Sequence of page references")
	frames: int = Field(..., gt=0, description="Number of frames in memory")


class Step(BaseModel):
	page: int
	frames: List[int]
	result: Literal["HIT", "FAULT"]


class Metrics(BaseModel):
	total_requests: int
	hits: int
	faults: int
	fault_rate: float


class DetailedSimulationResult(BaseModel):
	metrics: Metrics
	steps: List[Step]


def create_app() -> FastAPI:
	app = FastAPI(title="Memoria Virtual API", version="1.0.0")

	origins = [
		os.getenv("CORS_ORIGIN", "http://localhost:5173"),
		os.getenv("CORS_ORIGIN_ALT", "http://127.0.0.1:5173"),
	]

	app.add_middleware(
		CORSMiddleware,
		allow_origins=origins,
		allow_credentials=True,
		allow_methods=["*"],
		allow_headers=["*"],
	)

	@app.get("/health")
	def health():
		return {"status": "ok"}

	@app.get("/api/algorithms")
	def list_algorithms():
		return ["fifo", "lru", "optimal", "mru"]

	@app.get("/api/hello")
	def hello(name: str | None = None):
		who = name or "mundo"
		return {"message": f"Hola {who}!"}

	@app.post("/api/simulate", response_model=DetailedSimulationResult)
	def simulate(req: SimulationRequest):
		pages = req.pages
		frames = req.frames
		if frames <= 0:
			raise HTTPException(status_code=400, detail="frames must be > 0")
		if not isinstance(pages, list) or any(not isinstance(p, int) for p in pages):
			raise HTTPException(status_code=400, detail="pages must be a list of integers")

		def simulate_detailed(algorithm: str, pages: List[int], frames: int) -> DetailedSimulationResult:
			# Estado inicial
			frames_state: List[int] = [-1] * frames
			steps: List[Step] = []
			faults = 0
			hits = 0
			last_used = {i: -1 for i in range(frames)}  # índice -> última vez usada
			fifo_queue = deque()  # para FIFO almacenamos índices

			for i, page in enumerate(pages):
				if page in frames_state:
					# HIT
					idx = frames_state.index(page)
					last_used[idx] = i
					result = "HIT"
					hits += 1
				else:
					# FAULT
					faults += 1
					result = "FAULT"
					if -1 in frames_state:
						# espacio libre: usar el primer hueco
						idx = frames_state.index(-1)
						frames_state[idx] = page
						last_used[idx] = i
						if algorithm == "fifo":
							fifo_queue.append(idx)
					else:
						# elegir índice a reemplazar según algoritmo
						if algorithm == "fifo":
							if not fifo_queue:
								# cola vacía no debería ocurrir si frames llenos
								raise HTTPException(status_code=500, detail="FIFO queue in invalid state")
							idx = fifo_queue.popleft()
							frames_state[idx] = page
							fifo_queue.append(idx)
							last_used[idx] = i
						elif algorithm == "lru":
							# mínimo last_used
							idx = min(last_used, key=last_used.get)
							frames_state[idx] = page
							last_used[idx] = i
						elif algorithm == "mru":
							# máximo last_used
							idx = max(last_used, key=last_used.get)
							frames_state[idx] = page
							last_used[idx] = i
						elif algorithm == "optimal":
							# mirar hacia adelante
							future_uses = []  # (idx, next_use_distance)
							remaining = pages[i+1:]
							for idx_cur, val in enumerate(frames_state):
								if val == -1:
									# no debería haber -1 si entramos aquí
									next_use = float("inf")
								else:
									if val in remaining:
										next_use = remaining.index(val)
									else:
										next_use = float("inf")
								future_uses.append((idx_cur, next_use))
							# elegir el que se usará más tarde
							idx = max(future_uses, key=lambda t: t[1])[0]
							frames_state[idx] = page
							last_used[idx] = i
						else:
							raise HTTPException(status_code=400, detail="Unknown algorithm")

				# snapshot después de procesar la página
				steps.append(Step(page=page, frames=list(frames_state), result=result))

			total_requests = len(pages)
			metrics = Metrics(
				total_requests=total_requests,
				hits=hits,
				faults=faults,
				fault_rate=(faults / total_requests) if total_requests > 0 else 0.0,
			)
			return DetailedSimulationResult(metrics=metrics, steps=steps)

		return simulate_detailed(req.algorithm, pages, frames)

	return app


app = create_app()

