import type { Asset } from '@/types/asset';

export function getAssetInsight(asset: Asset): string {
  if (asset.status === 'offline') {
    return 'Asset is offline. Check connectivity or planned downtime first.';
  }

  const { actual, target } = asset.performanceVsTarget;
  const ratio = target ? (actual / target) * 100 : 0;
  const alarmCount = asset.activeAlarms.length;

  if (asset.status === 'alarm' || alarmCount >= 2) {
    return 'There are multiple active alarms. Resolve them before reviewing performance.';
  }

  if (ratio < 80) {
    return 'Performance is well below target. Check operating conditions or site limits.';
  }

  if (ratio >= 99) {
    return 'Performance is on target. Keep monitoring for any changes.';
  }

  return 'Performance is close to target. Keep an eye on trend and alerts.';
}
