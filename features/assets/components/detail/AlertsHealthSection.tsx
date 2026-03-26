import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AlarmSeverityChip } from '@/components/alerts/AlarmSeverityChip';
import { formatNumber, formatRelativeTime } from '@/lib/format';
import type { Asset } from '@/types/asset';

type AlertsHealthSectionProps = {
	asset: Asset;
};

function healthBarColor(score: number): string {
	if (score >= 80) return 'success.main';
	if (score >= 55) return 'warning.main';
	return 'error.main';
}

export function AlertsHealthSection({ asset }: AlertsHealthSectionProps) {
	const lastFaultText = asset.lastFaultAt
		? `${formatRelativeTime(asset.lastFaultAt)} · ${new Date(asset.lastFaultAt).toLocaleString()}`
		: 'None recorded';

	return (
		<Paper variant="outlined" sx={{ p: 2 }}>
			<Typography variant="subtitle1" gutterBottom>
				Alerts & health
			</Typography>

			<Stack spacing={2}>
				<Stack spacing={0.75}>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography color="text.secondary">Health score</Typography>
						<Typography fontWeight={600}>
							{formatNumber(asset.healthScorePercent, 1)}%
						</Typography>
					</Stack>

					<LinearProgress
						variant="determinate"
						value={asset.healthScorePercent}
						sx={{
							height: 8,
							borderRadius: 1,
							bgcolor: 'action.hover',
							'& .MuiLinearProgress-bar': {
								bgcolor: healthBarColor(asset.healthScorePercent),
							},
						}}
					/>
				</Stack>

				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					spacing={1}
					alignItems={{ xs: 'flex-start', sm: 'center' }}
				>
					<Typography variant="body2" color="text.secondary">
						Anomaly detection
					</Typography>

					{asset.anomalyDetected ? (
						<Chip
							size="small"
							label="Flag raised"
							color="error"
							variant="outlined"
						/>
					) : (
						<Chip size="small" label="No anomaly" variant="outlined" />
					)}
				</Stack>

				<Typography variant="body2" color="text.secondary">
					Last fault: {lastFaultText}
				</Typography>

				<Box>
					<Typography variant="subtitle2" color="text.secondary" gutterBottom>
						Active alarms
					</Typography>

					{asset.activeAlarms.length === 0 ? (
						<Typography variant="body2" color="text.secondary">
							None — asset is clear.
						</Typography>
					) : (
						<Stack spacing={1}>
							{asset.activeAlarms.map((alarm) => (
								<Stack
									key={alarm.id}
									direction="row"
									spacing={1}
									alignItems="center"
									justifyContent="space-between"
									flexWrap="wrap"
									useFlexGap
								>
									<Typography fontWeight={500}>{alarm.message}</Typography>
									<AlarmSeverityChip severity={alarm.severity} size="small" />
								</Stack>
							))}
						</Stack>
					)}
				</Box>
			</Stack>
		</Paper>
	);
}
