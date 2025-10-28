import { useEffect, useState } from "react";

const healthUrl =
  import.meta.env.VITE_HEALTH_URL ??
  `${import.meta.env.VITE_API_URL ?? "http://localhost:3333"}/health`;

type StatusTone = "pending" | "ok" | "warn" | "error";

export default function App() {
  const [status, setStatus] = useState<{ message: string; tone: StatusTone }>({
    message: "Sincronizando API...",
    tone: "pending",
  });
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(healthUrl)
      .then((response) => response.text())
      .then((body) => {
        if (cancelled) return;

        const cleaned = body.trim().toLowerCase();
        if (cleaned === "ok") {
          setStatus({ message: "API online", tone: "ok" });
        } else if (cleaned.length === 0) {
          setStatus({ message: "Resposta vazia da API", tone: "warn" });
        } else {
          setStatus({ message: `Resposta inesperada: ${body}`, tone: "warn" });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus({ message: "API offline", tone: "error" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const toneClasses: Record<StatusTone, string> = {
    pending: "border-white/20 bg-white/10 text-white/80",
    ok: "border-emerald-400/60 bg-emerald-500/15 text-emerald-200",
    warn: "border-amber-400/60 bg-amber-500/15 text-amber-200",
    error: "border-rose-500/60 bg-rose-500/15 text-rose-200",
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-slate-100">
      <section className="relative flex w-full max-w-2xl flex-col items-center gap-10 rounded-[3rem] border border-white/10 bg-white/[0.06] p-16 text-center shadow-[0_50px_120px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl">
        <div className="absolute inset-x-20 -top-8 h-16 rounded-full border border-white/15 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-3xl" />

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.5em] text-white/40">
            Ambiente Integrado
          </span>
          <h1 className="text-6xl font-semibold tracking-tight text-white drop-shadow-sm">
            RVR
          </h1>
          <p className="text-base text-white/70">
            Monitoramento instantâneo do backend.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-7 py-3 shadow-inner shadow-black/40">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400/80" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/50">Status</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span
            className={`rounded-full border px-6 py-3 text-sm font-medium transition-colors ${toneClasses[status.tone]}`}
          >
            {status.message}
          </span>
          <button
            type="button"
            onClick={() => setShowManual((current) => !current)}
            className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-white/25 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Manual de uso
          </button>
        </div>

        {showManual && (
          <article className="mt-6 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-black/25 text-left text-sm leading-relaxed text-white/70 shadow-inner shadow-black/40">
            <header className="border-b border-white/10 bg-white/5 px-6 py-4">
              <h2 className="text-base font-semibold text-white">
                Manifesto Técnico — RVR Starter
              </h2>
              <p className="mt-1 text-xs uppercase tracking-[0.35em] text-white/40">
                RVR = React + Vite + Render
              </p>
            </header>
            <div className="max-h-[60vh] space-y-8 overflow-y-auto px-6 py-6 pr-8 text-sm">
              <section className="space-y-3">
                <p>
                  Um boilerplate inteligente para lançar apps web completos (frontend +
                  API) em minutos, sem ritual de setup.
                </p>
                <h3 className="text-sm font-semibold text-white">1) Visão</h3>
                <p>
                  O RVR é um starter universal: clone, renomeie e construa. Ele
                  padroniza o esqueleto técnico, acelera a entrega e mantém consistência
                  entre projetos.
                </p>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  Princípios
                </h4>
                <ul className="space-y-2 text-white/70">
                  <li>Zero-fricção: <code>git clone</code> → <code>npm i</code> → <code>npm run dev</code>.</li>
                  <li>Acoplamento leve: front e API separados, comunicando por HTTP.</li>
                  <li>Deploy trivial: Render como alvo padrão (compatível com Vercel/Netlify para o front).</li>
                  <li>Observável: <code>/health</code>, <code>/version</code>, logs previsíveis.</li>
                  <li>Evolutivo: updates de DX propagáveis a projetos-filho.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">2) Stack base</h3>
                <ul className="space-y-2 text-white/70">
                  <li>Frontend: React + Vite + TypeScript + React Router.</li>
                  <li>Backend: Node + Express + TypeScript (ESM), CORS, Helmet.</li>
                  <li>Qualidade: ESLint, Prettier, Vitest.</li>
                  <li>PWA: manifest e service worker simples (opcional desde o start).</li>
                  <li>Infra: Docker (opcional), Render (deploy), GitHub Actions (CI) opcional.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">3) Estrutura de pastas</h3>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`RVR/
├─ apps/
│  ├─ web/                  # React + Vite
│  │  ├─ src/
│  │  │  ├─ pages/
│  │  │  ├─ components/
│  │  │  ├─ lib/
│  │  │  └─ main.tsx
│  │  ├─ index.html
│  │  ├─ vite.config.ts
│  │  ├─ public/ (manifest, icons, favicon)
│  │  └─ .env.example (VITE_API_URL)
│  └─ api/                  # Express TS
│     ├─ src/
│     │  ├─ index.ts        # server bootstrap
│     │  ├─ routes.ts       # rotas públicas
│     │  ├─ health.ts       # /health e /version
│     │  └─ config.ts       # env, cors
│     ├─ .env.example (PORT=3334)
│     └─ tsconfig.json
├─ packages/
│  └─ shared/               # tipos utilitários compartilhados (opcional)
├─ infra/
│  ├─ docker/               # Dockerfile(s), compose (opcional)
│  └─ ci/                   # GitHub Actions (opcional)
├─ package.json             # workspaces, scripts raiz
└─ README.md`}</pre>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">4) Scripts e Workspaces</h3>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  package.json (raiz)
                </h4>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`{
  "name": "rvr-starter",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "npm-run-all -p dev:web dev:api",
    "dev:web": "npm --workspace apps/web run dev",
    "dev:api": "npm --workspace apps/api run dev",
    "build": "npm-run-all build:web build:api",
    "build:web": "npm --workspace apps/web run build",
    "build:api": "npm --workspace apps/api run build",
    "lint": "eslint .",
    "format": "prettier -w .",
    "test": "vitest"
  },
  "devDependencies": {
    "npm-run-all": "^4",
    "eslint": "^9",
    "prettier": "^3",
    "vitest": "^2"
  }
}`}</pre>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  apps/web/package.json
                </h4>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`{
  "name": "rvr-web",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5173"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "^6"
  },
  "devDependencies": {
    "vite": "^5",
    "typescript": "^5"
  }
}`}</pre>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  apps/api/package.json
                </h4>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`{
  "name": "rvr-api",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4",
    "cors": "^2",
    "helmet": "^7"
  },
  "devDependencies": {
    "tsx": "^4",
    "typescript": "^5"
  }
}`}</pre>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">5) Backend mínimo (observável)</h3>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  apps/api/src/health.ts
                </h4>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`import { Router } from 'express';

export const health = Router();

health.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

health.get('/version', (_req, res) => {
  const version = process.env.APP_VERSION || '0.1.0';
  res.json({ version });
});`}</pre>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  apps/api/src/index.ts
                </h4>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { health } from './health';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(health);

app.get('/', (_req, res) => res.send('API OK'));

const PORT = Number(process.env.PORT || 3334);
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(\`[API] Online em http://\${HOST}:\${PORT}\`);
});`}</pre>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`PORT=3334
HOST=0.0.0.0
APP_VERSION=0.1.0`}</pre>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">6) Frontend mínimo</h3>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  apps/web/vite.config.ts
                </h4>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3334',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\\/api/, '')
      }
    }
  }
});`}</pre>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  apps/web/src/pages/Home.tsx
                </h4>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<'checking'|'ok'|'fail'>('checking');

  useEffect(() => {
    fetch('/api/health')
      .then((r) => (r.ok ? 'ok' : 'fail'))
      .then((s) => setStatus(s as any))
      .catch(() => setStatus('fail'));
  }, []);

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>Hello World — RVR</h1>
      <p>API status: <strong>{status === 'checking' ? '…' : status}</strong></p>
    </main>
  );
}`}</pre>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`VITE_API_URL=https://<sua-api-no-render>.onrender.com`}</pre>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">7) PWA básico</h3>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`{
  "name": "RVR App",
  "short_name": "RVR",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0b0b0b",
  "theme_color": "#0b0b0b",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}`}</pre>
                <p>Registrar um service worker simples (ex.: <code>apps/web/src/sw.ts</code>) quando necessário.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">8) Checklist “clonar → renomear → rodar”</h3>
                <ol className="list-decimal space-y-2 pl-5 text-white/70">
                  <li>Clonar: <code>git clone &lt;repo-rvr&gt; meu-app && cd meu-app</code>.</li>
                  <li>
                    Renomear pacotes:
                    <ul className="mt-2 space-y-1 pl-4">
                      <li><code>apps/web/package.json</code> → <code>name: "meu-app-web"</code></li>
                      <li><code>apps/api/package.json</code> → <code>name: "meu-app-api"</code></li>
                      <li><code>package.json</code> raiz → <code>name: "meu-app"</code></li>
                    </ul>
                  </li>
                  <li>Criar <code>.env</code> a partir dos exemplos.</li>
                  <li>Instalar: <code>npm i</code>.</li>
                  <li>Rodar: <code>npm run dev</code> (abre 5173 e 3334).</li>
                  <li>Testar: acessar <code>http://localhost:5173</code>.</li>
                </ol>
                <p className="text-white/60">
                  Renomeação semi-automática:
                </p>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">{`npx replace-in-files-cli "RVR" "MeuApp" --string-targets "**/*.*" --ignore "**/node_modules/**"`}</pre>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">9) Deploy no Render</h3>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  API (Web Service)
                </h4>
                <ul className="space-y-2 text-white/70">
                  <li>Build Command: <code>npm i && npm --workspace apps/api run build</code></li>
                  <li>Start Command: <code>npm --workspace apps/api run start</code></li>
                  <li>Env: <code>PORT</code>, <code>APP_VERSION</code>, outros.</li>
                </ul>
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  Frontend (Static Site)
                </h4>
                <ul className="space-y-2 text-white/70">
                  <li>Build Command: <code>npm i && npm --workspace apps/web run build</code></li>
                  <li>Publish Directory: <code>apps/web/dist</code></li>
                  <li>Env: <code>VITE_API_URL=https://&lt;sua-api&gt;.onrender.com</code></li>
                </ul>
                <p>Alternativa: hospedar o front na Vercel/Netlify.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">10) Qualidade e DX</h3>
                <ul className="space-y-2 text-white/70">
                  <li>ESLint + Prettier prontos no root.</li>
                  <li>Vitest com testes de fumaça.</li>
                  <li>Logs padronizados com prefixos de workspace.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">11) Observabilidade mínima</h3>
                <ul className="space-y-2 text-white/70">
                  <li><code>/health</code>: liveness.</li>
                  <li><code>/version</code>: versão do deploy.</li>
                  <li><code>/time</code> (opcional): hora do servidor.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">12) Roadmap evolutivo</h3>
                <ul className="space-y-2 text-white/70">
                  <li>Autenticação: JWT no API, guard no front.</li>
                  <li>Camada shared: tipos DTO, zod schemas.</li>
                  <li>PWA+: cache inteligente e fallback offline.</li>
                  <li>CI/CD: GitHub Actions para build + lint + testes em PR.</li>
                  <li>Telemetry: analytics + error boundary.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">13) Filosofia de uso (Protocolo RVR)</h3>
                <ol className="list-decimal space-y-2 pl-5 text-white/70">
                  <li>Não reconfigure, derive.</li>
                  <li>Sem segredos no repo.</li>
                  <li>Uma melhoria, muitos apps.</li>
                  <li>Diagnóstico rápido.</li>
                </ol>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-white">14) TL;DR — lançar um site em 15 minutos</h3>
                <ul className="space-y-2 text-white/70">
                  <li>Clone → <code>npm i</code> → <code>npm run dev</code> → confirme “Hello / API ok”.</li>
                  <li>Configure Render: API + Front.</li>
                  <li>Defina <code>VITE_API_URL</code>.</li>
                  <li>Ship it.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <p className="text-white/65">
                  Pronto. O RVR não é só um starter — é um ritual de velocidade para as
                  próximas ideias de produto.
                </p>
              </section>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}
