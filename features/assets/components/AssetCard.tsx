import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import type { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { OperationalStatusChip } from '@/components/status/OperationalStatusChip';
import { getAssetInsight } from '@/lib/assetInsight';
import { formatNumber, formatRelativeTime } from '@/lib/format';
import type { Asset } from '@/types/asset';


const titleClampSx = {
	overflow: 'hidden',
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical' as const,
};

const insightClampSx = {
	overflow: 'hidden',
	display: '-webkit-box',
	WebkitLineClamp: 2,
	WebkitBoxOrient: 'vertical' as const,
};

function RowBetween({ children, ...props }: StackProps) {
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			{...props}
		>
			{children}
		</Stack>
	);
}

function MutedCaption({ children, sx, ...props }: TypographyProps) {
	return (
		<Typography variant="caption" color="text.secondary" sx={sx} {...props}>
			{children}
		</Typography>
	);
}

function healthBarColor(score: number): string {
	if (score >= 80) return 'success.main';
	if (score >= 55) return 'warning.main';
	return 'error.main';
}

function CardHeadline({ asset }: { asset: Asset }) {
	return (
		<>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="flex-start"
				gap={1}
			>
				<Typography
					variant="subtitle1"
					component="h2"
					fontWeight={600}
					sx={{ lineHeight: 1.3, ...titleClampSx }}
				>
					{asset.name}
				</Typography>
				<OperationalStatusChip status={asset.status} />
			</Stack>
			{asset.subtitle ? <MutedCaption>{asset.subtitle}</MutedCaption> : null}
		</>
	);
}

function Metric({
	label,
	value,
	unit,
}: {
	label: string;
	value: number;
	unit: string;
}) {
	return (
		<Box>
			<MutedCaption display="block">{label}</MutedCaption>
			<Typography variant="body2" fontWeight={500} component="span">
				{formatNumber(value)}{' '}
				<Box
					component="span"
					sx={{ typography: 'caption', color: 'text.secondary' }}
				>
					{unit}
				</Box>
			</Typography>
		</Box>
	);
}

function HealthSummary({ healthScorePercent }: { healthScorePercent: number }) {
	return (
		<Stack spacing={0.75}>
			<RowBetween>
				<MutedCaption>Health</MutedCaption>
				<Typography variant="caption" fontWeight={600}>
					{formatNumber(healthScorePercent, 0)}%
				</Typography>
			</RowBetween>
			<LinearProgress
				variant="determinate"
				value={healthScorePercent}
				sx={{
					height: 6,
					borderRadius: 1,
					bgcolor: 'action.hover',
					'& .MuiLinearProgress-bar': {
						bgcolor: healthBarColor(healthScorePercent),
					},
				}}
			/>
		</Stack>
	);
}

export type AssetCardProps = {
	asset: Asset;
};

export function AssetCard({ asset }: AssetCardProps) {
	const primary = asset.sensors[0];
	const secondary = asset.sensors[1];
	const insight = getAssetInsight(asset);

	return (
		<Card
			variant="outlined"
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				minHeight: 0,
			}}
		>
			<CardActionArea
				component={RouterLink}
				to={`/assets/${asset.id}`}
				sx={{
					alignItems: 'stretch',
					height: '100%',
					flex: 1,
					minHeight: 0,
				}}
			>
				<CardContent
					sx={{
						px: 2,
						py: 2,
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						'&:last-child': { pb: 2 },
					}}
				>
					<Stack spacing={1.5} sx={{ flex: 1, minHeight: 0 }}>
						<CardHeadline asset={asset} />
						<HealthSummary healthScorePercent={asset.healthScorePercent} />
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ lineHeight: 1.45, ...insightClampSx }}
						>
							{insight}
						</Typography>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							flexWrap="wrap"
							gap={0.5}
						>
							<MutedCaption>
								Alerts{' '}
								<Box component="span" sx={{ fontWeight: 600 }}>
									{asset.activeAlarms.length}
								</Box>
							</MutedCaption>
							<MutedCaption>
								Updated {formatRelativeTime(asset.lastUpdatedAt)}
							</MutedCaption>
						</Stack>
						{asset.anomalyDetected ? (
							<Chip
								size="small"
								label="Anomaly"
								color="error"
								variant="outlined"
							/>
						) : null}
						<Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
							{primary ? (
								<Metric
									label={primary.label}
									value={primary.value}
									unit={primary.unit}
								/>
							) : null}
							{secondary ? (
								<Metric
									label={secondary.label}
									value={secondary.value}
									unit={secondary.unit}
								/>
							) : null}
						</Stack>
						<MutedCaption>
							{asset.type} · {asset.location}
						</MutedCaption>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
