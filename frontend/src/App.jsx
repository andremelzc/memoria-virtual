import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 antialiased">
      <div className="mx-auto max-w-4xl px-4 py-10 text-left">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={viteLogo} alt="Vite" className="h-8 w-8 drop-shadow" />
            <img src={reactLogo} alt="React" className="h-8 w-8 drop-shadow" />
            <span className="text-sm text-slate-300">Starter</span>
          </div>
          <nav className="flex items-center gap-2">
            <a
              href="https://tailwindcss.com/docs"
              target="_blank"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10"
            >
              Docs Tailwind
            </a>
            <a
              href="https://vite.dev/guide/"
              target="_blank"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10"
            >
              Docs Vite
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Vite + React + Tailwind
            </span>
          </h1>
          <p className="text-slate-300">
            Plantilla lista para construir tu app más rápida. Moderna, minimalista y escalable.
          </p>
        </section>

        {/* Card / Counter */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-lg">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-lg font-semibold">Contador de ejemplo</h2>
              <p className="text-sm text-slate-400">Estado local con React</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCount((c) => c + 1)}
                className="rounded-lg bg-indigo-500 px-4 py-2 text-white shadow hover:bg-indigo-600"
              >
                Incrementar
              </button>
              <button
                onClick={() => setCount(0)}
                className="rounded-lg bg-slate-700 px-4 py-2 text-white/90 shadow hover:bg-slate-600"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-center">
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-xs text-slate-400">Clicks</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-center">
              <div className="text-2xl font-bold">{count * 2}</div>
              <div className="text-xs text-slate-400">x2</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-center">
              <div className="text-2xl font-bold">{Math.max(0, 100 - count)}</div>
              <div className="text-xs text-slate-400">Para 100</div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="mb-2 text-xl">⚡️</div>
            <h3 className="text-lg font-semibold">Vite ultra-rápido</h3>
            <p className="text-sm text-slate-400">HMR instantáneo y build optimizado listo para producción.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="mb-2 text-xl">🎨</div>
            <h3 className="text-lg font-semibold">Tailwind por utilidades</h3>
            <p className="text-sm text-slate-400">Construye interfaces consistentes sin salir del JSX.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="mb-2 text-xl">⚙️</div>
            <h3 className="text-lg font-semibold">React 19</h3>
            <p className="text-sm text-slate-400">Componentes modernos, rendimiento y DX mejorada.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="mb-2 text-xl">🧩</div>
            <h3 className="text-lg font-semibold">Escalable</h3>
            <p className="text-sm text-slate-400">Estructura simple para crecer en rutas, estado y UI.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-slate-500">
          <p>
            Edita <code className="text-slate-400">src/App.jsx</code> y guarda para ver los cambios.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
