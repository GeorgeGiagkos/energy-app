import Chip from '@mui/material/Chip';
import type { AssetOperationalStatus } from '@/types/asset';

type OperationalStatusChipProps = {
	status: AssetOperationalStatus;
	size?: 'small' | 'medium';
};

const STATUS_LABELS: Record<AssetOperationalStatus, string> = {
	running: 'Running',
	warning: 'Warning',
	alarm: 'Alarm',
	offline: 'Offline',
};

const STATUS_COLORS: Record<
	AssetOperationalStatus,
	'success' | 'warning' | 'error' | 'default'
> = {
	running: 'success',
	warning: 'warning',
	alarm: 'error',
	offline: 'default',
};

export function OperationalStatusChip({
	status,
	size = 'small',
}: OperationalStatusChipProps) {
	return (
		<Chip
			label={STATUS_LABELS[status]}
			color={STATUS_COLORS[status]}
			size={size}
			variant="outlined"
		/>
	);
}
