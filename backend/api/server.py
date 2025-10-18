from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Literal
import os

try:
	from dotenv import load_dotenv
	load_dotenv()
except Exception:
	pass

from ..algorithms.fifo import fifo
from ..algorithms.lru import lru
from ..algorithms.optimal import optimal
from ..algorithms.mru import mru


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
		try:
			# Llama al algoritmo correspondiente con detailed=True para obtener metrics y steps
			algo_map = {
				"fifo": fifo,
				"lru": lru,
				"optimal": optimal,
				"mru": mru,
			}
			algo_fn = algo_map.get(req.algorithm)
			if not algo_fn:
				raise HTTPException(status_code=400, detail=f"Unknown algorithm: {req.algorithm}")
			
			data = algo_fn(req.pages, req.frames, detailed=True)
			
			# Pydantic validación hacia los modelos definidos
			steps = [Step(**s) for s in data["steps"]]
			metrics = Metrics(**data["metrics"])
			return DetailedSimulationResult(metrics=metrics, steps=steps)
		except ValueError as e:
			raise HTTPException(status_code=400, detail=str(e))

	return app


app = create_app()

