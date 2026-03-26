export function formatNumber(value: number, fractionDigits = 1): string {
	if (!Number.isFinite(value)) return '—';
	return value.toLocaleString(undefined, {
		maximumFractionDigits: fractionDigits,
		minimumFractionDigits: Math.min(1, fractionDigits),
	});
}

export function formatRelativeTime(iso: string | null): string {
	if (!iso) return 'None recorded';

	const timestamp = new Date(iso).getTime();
	if (!Number.isFinite(timestamp)) return '—';

	const seconds = Math.round((Date.now() - timestamp) / 1000);

	if (seconds < 60) return 'just now';

	const minutes = Math.round(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;

	const hours = Math.round(minutes / 60);
	if (hours < 48) return `${hours}h ago`;

	const days = Math.round(hours / 24);
	return `${days}d ago`;
}
