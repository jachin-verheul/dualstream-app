* {
  box-sizing: border-box;
}

:root {
  --bg: #081120;
  --bg-soft: #101d33;
  --panel: rgba(10, 17, 30, 0.82);
  --panel-border: rgba(148, 163, 184, 0.18);
  --surface: rgba(15, 23, 42, 0.94);
  --surface-2: #111827;
  --text: #e5eefb;
  --muted: #9dadc5;
  --primary: #6d9dfc;
  --primary-2: #8b5cf6;
  --success: #34d399;
  --warning: #fbbf24;
  --danger: #f87171;
  --shadow: 0 18px 45px rgba(1, 6, 16, 0.45);
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(109, 157, 252, 0.28), transparent 30%),
    radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.34), transparent 28%),
    linear-gradient(135deg, var(--bg) 0%, var(--bg-soft) 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
}

.page-shell {
  width: min(1180px, 100%);
  display: grid;
  gap: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 22px;
  border: 1px solid var(--panel-border);
  background: rgba(9, 16, 29, 0.7);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  box-shadow: var(--shadow);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-weight: 800;
  letter-spacing: 0.08em;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  box-shadow: 0 10px 30px rgba(109, 157, 252, 0.35);
}

.eyebrow {
  margin: 0 0 4px;
  font-size: 0.73rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 1.1;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(52, 211, 153, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.3);
  color: #b7f9de;
  font-weight: 700;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.camera-panel,
.summary-panel {
  background: var(--panel);
  border: 1px solid var(--panel-border);
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.camera-panel {
  padding: 18px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 16px;
}

.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.02rem;
}

.live-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--success);
  display: inline-block;
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.9);
}

.panel-state {
  color: #d7f9eb;
  background: rgba(52, 211, 153, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.25);
  border-radius: 999px;
  padding: 7px 10px;
  font-size: 0.76rem;
  font-weight: 700;
}

.video-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: linear-gradient(135deg, #020817, #111827);
}

video {
  display: block;
  width: 100%;
  height: 320px;
  background: #030712;
  object-fit: cover;
  aspect-ratio: 16 / 10;
}

.camera-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(2, 6, 23, 0.38);
  color: rgba(229, 238, 251, 0.9);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.8rem;
  pointer-events: none;
}

.camera-overlay.hidden {
  display: none;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

button {
  flex: 1;
  border: none;
  border-radius: 12px;
  padding: 12px 14px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s ease, opacity 0.18s ease;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

button.primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: white;
}

button.ghost {
  background: rgba(148, 163, 184, 0.1);
  color: var(--text);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.info-box {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.08);
  color: var(--muted);
  line-height: 1.6;
}

.info-box strong {
  color: var(--text);
}

.summary-panel {
  padding: 20px 18px 18px;
}

.summary-header h2 {
  margin: 0 0 18px;
  font-size: 1.22rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.08);
}

.stat-label {
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-card strong {
  font-size: 1.05rem;
}

.error-box {
  display: none;
  margin-top: 18px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(248, 113, 113, 0.12);
  border: 1px solid rgba(248, 113, 113, 0.26);
  color: #fecaca;
  font-weight: 600;
}

.error-box.visible {
  display: block;
}

@media (max-width: 840px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 520px) {
  body {
    padding: 20px 14px;
  }

  .actions {
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
