import Chip from '@mui/material/Chip';
import type { AlarmSeverity } from '@/types/asset';

const LABELS: Record<AlarmSeverity, string> = {
	critical: 'Critical',
	warning: 'Warning',
	info: 'Info',
};

const COLORS: Record<AlarmSeverity, 'error' | 'warning' | 'info'> = {
	critical: 'error',
	warning: 'warning',
	info: 'info',
};

type AlarmSeverityChipProps = {
	severity: AlarmSeverity;
	size?: 'small' | 'medium';
};

export function AlarmSeverityChip({
	severity,
	size = 'small',
}: AlarmSeverityChipProps) {
	return (
		<Chip
			label={LABELS[severity]}
			color={COLORS[severity]}
			size={size}
			variant="outlined"
		/>
	);
}
