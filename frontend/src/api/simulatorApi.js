import { http } from './httpClient';

// Adjust endpoints to match your Python backend
// Examples assume a prefix like /api

export async function getAlgorithms() {
  return http.get('/api/algorithms');
}

export async function runSimulation(payload) {
  // payload example: { algorithm: 'fifo', pages: [1,2,3], frames: 3 }
  return http.post('/api/simulate', payload);
}

export async function getHealth() {
  return http.get('/health');
}

// Example with query params
export async function getSimulationResult(id) {
  return http.get('/api/simulation', { query: { id } });
}
