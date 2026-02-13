export function createDevHUDPanel({ doc = document, state = {}, actions = {}, enabled = false } = {}) {
  let initialized = false;
  let panelState = {
    lastProbe: null
  };
  let container = null;
  let probeSummaryEl = null;

  function formatProbeSummary(summary) {
    if (!summary) return 'No probe run yet';
    if (summary.error) return `Error: ${summary.error}`;
    const lines = [];
    if (Number.isFinite(summary.len)) lines.push(`LEN: ${summary.len}`);
    if (summary.sha) lines.push(`SHA: ${summary.sha}`);
    if (summary.sceneCounts) lines.push(`sceneCounts: ${JSON.stringify(summary.sceneCounts)}`);
    if (summary.blueprintCounts) lines.push(`blueprintCounts: ${JSON.stringify(summary.blueprintCounts)}`);
    if (summary.overlayDrift) lines.push(`overlayDrift: ${JSON.stringify(summary.overlayDrift)}`);
    return lines.join('\n') || 'No probe run yet';
  }

  function ensureContainer() {
    if (!enabled) return null;
    if (container) return container;

    container = doc.createElement('div');
    container.id = 'devHud';
    container.style.position = 'fixed';
    container.style.top = '12px';
    container.style.right = '12px';
    container.style.zIndex = '1600';
    container.style.width = '320px';
    container.style.maxHeight = '35vh';
    container.style.overflow = 'auto';
    container.style.padding = '10px';
    container.style.borderRadius = '8px';
    container.style.background = 'rgba(8, 14, 32, 0.9)';
    container.style.border = '1px solid rgba(100, 200, 255, 0.45)';
    container.style.color = '#d9ebff';
    container.style.font = '12px/1.35 monospace';

    const title = doc.createElement('div');
    title.textContent = 'Dev HUD';
    title.style.fontWeight = '700';
    title.style.marginBottom = '8px';
    title.style.color = '#7ad0ff';

    const runButton = doc.createElement('button');
    runButton.type = 'button';
    runButton.textContent = 'Run Probe';
    runButton.style.marginBottom = '8px';
    runButton.style.width = '100%';
    runButton.addEventListener('click', async () => {
      if (typeof actions.runProbe !== 'function') return;
      const next = await actions.runProbe();
      if (next) {
        sync({ devHud: { lastProbe: next } });
      }
    });

    probeSummaryEl = doc.createElement('pre');
    probeSummaryEl.style.margin = '0';
    probeSummaryEl.style.whiteSpace = 'pre-wrap';
    probeSummaryEl.style.wordBreak = 'break-word';
    probeSummaryEl.textContent = formatProbeSummary(panelState.lastProbe);

    container.appendChild(title);
    container.appendChild(runButton);
    container.appendChild(probeSummaryEl);
    doc.body.appendChild(container);
    return container;
  }

  function sync(nextState = state) {
    if (!enabled) return;
    const nextHudState = nextState?.devHud || nextState || {};
    panelState = {
      ...panelState,
      ...nextHudState
    };
    ensureContainer();
    if (probeSummaryEl) {
      probeSummaryEl.textContent = formatProbeSummary(panelState.lastProbe);
    }
  }

  function init() {
    if (initialized) return;
    initialized = true;
    if (!enabled) return;
    ensureContainer();
    sync(state);
  }

  return {
    init,
    sync
  };
}
