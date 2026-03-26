export type SimulatedHistoryPoint = {
  label: string;
  value: number;
};

export function buildSimulatedHistory(
  current: number,
  min: number | undefined,
  max: number | undefined,
  tick: number,
  points = 28
): SimulatedHistoryPoint[] {
  const hasBounds = min != null && max != null;
  const span = hasBounds ? max - min : Math.abs(current) + 1;

  const history: SimulatedHistoryPoint[] = [];
  let value = current;

  for (let i = points - 1; i >= 0; i--) {
    history.push({
      label: `-${points - 1 - i}m`,
      value,
    });

    const seed = (tick + i * 11) % 100;
    const noise = (seed / 100 - 0.5) * span * 0.04;
    let nextValue = value - noise;

    if (min != null) nextValue = Math.max(min, nextValue);
    if (max != null) nextValue = Math.min(max, nextValue);

    value = nextValue;
  }

  return history.reverse();
}