export function buildLegacyCity({
  buildPhase1,
  buildPhase2,
  onPhase1Done,
  onPhase2Done,
  delayMs = 0
}) {
  buildPhase1();
  if (typeof onPhase1Done === 'function') onPhase1Done();

  setTimeout(async () => {
    await buildPhase2();
    if (typeof onPhase2Done === 'function') onPhase2Done();
  }, delayMs);
}
