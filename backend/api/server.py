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


class SimulationRequest(BaseModel):
	algorithm: Literal["fifo", "lru", "optimal"]
	pages: List[int] = Field(..., description="Sequence of page references")
	frames: int = Field(..., gt=0, description="Number of frames in memory")


class SimulationResult(BaseModel):
	algorithm: str
	frames: int
	faults: int


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
		return ["fifo", "lru", "optimal"]

	@app.get("/api/hello")
	def hello(name: str | None = None):
		who = name or "mundo"
		return {"message": f"Hola {who}!"}

	@app.post("/api/simulate", response_model=SimulationResult)
	def simulate(req: SimulationRequest):
		pages = req.pages
		frames = req.frames
		if req.algorithm == "fifo":
			faults = fifo(pages, frames)
		elif req.algorithm == "lru":
			faults = lru(pages, frames)
		elif req.algorithm == "optimal":
			faults = optimal(pages, frames)
		else:
			raise HTTPException(status_code=400, detail="Unknown algorithm")
		return SimulationResult(algorithm=req.algorithm, frames=frames, faults=faults)

	return app


app = create_app()

