import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { MiniSparkline } from '@/components/charts/MiniSparkline';
import { getAssetInsight } from '@/lib/assetInsight';
import { formatNumber, formatRelativeTime } from '@/lib/format';
import type { Asset } from '@/types/asset';

type PerformanceInsightSectionProps = {
	asset: Asset;
};

function attainmentChipColor(pct: number): 'success' | 'warning' | 'error' {
	if (pct >= 95) return 'success';
	if (pct >= 80) return 'warning';
	return 'error';
}

export function PerformanceInsightSection({
	asset,
}: PerformanceInsightSectionProps) {
	const perf = asset.performanceVsTarget;
	const attainmentPct =
		perf.target !== 0 ? (perf.actual / perf.target) * 100 : 0;
	const insight = getAssetInsight(asset);
	const updatedText = `${formatRelativeTime(asset.lastUpdatedAt)} · ${new Date(
		asset.lastUpdatedAt,
	).toLocaleTimeString()}`;

	return (
		<Paper variant="outlined" sx={{ p: 2 }}>
			<Typography variant="subtitle1" gutterBottom>
				Performance & insight
			</Typography>

			<Stack spacing={2}>
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					spacing={2}
					justifyContent="space-between"
				>
					<Box>
						<Typography variant="caption" color="text.secondary">
							{perf.label} vs target
						</Typography>

						<Typography variant="h6" sx={{ mt: 0.5 }}>
							{formatNumber(perf.actual, 2)} / {formatNumber(perf.target, 2)}{' '}
							<Box
								component="span"
								sx={{ typography: 'body1', color: 'text.secondary' }}
							>
								{perf.unit}
							</Box>
						</Typography>
					</Box>

					<Chip
						label={`${formatNumber(attainmentPct, 1)}% of target`}
						color={attainmentChipColor(attainmentPct)}
						variant="outlined"
					/>
				</Stack>

				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					justifyContent="space-between"
				>
					<Typography variant="body2" color="text.secondary">
						Last updated: {updatedText}
					</Typography>

					<Typography variant="body2" color="text.secondary">
						Active alerts:{' '}
						<Box
							component="span"
							sx={{ fontWeight: 600, color: 'text.primary' }}
						>
							{asset.activeAlarms.length}
						</Box>
					</Typography>
				</Stack>

				<Box>
					<Typography variant="caption" color="text.secondary" gutterBottom>
						Mini trend (primary KPI)
					</Typography>
					<MiniSparkline values={asset.miniTrend} />
				</Box>

				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ lineHeight: 1.5 }}
				>
					{insight}
				</Typography>
			</Stack>
		</Paper>
	);
}
