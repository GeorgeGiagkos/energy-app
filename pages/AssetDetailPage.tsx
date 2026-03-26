import { useMemo } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AppShell } from '@/components/layout/AppShell';
import { MOCK_EVENTS_BY_ASSET } from '@/data/mockAssets';
import { AlertsHealthSection } from '@/features/assets/components/detail/AlertsHealthSection';
import { DetailPageHeader } from '@/features/assets/components/detail/DetailPageHeader';
import { LiveSensorsSection } from '@/features/assets/components/detail/LiveSensorsSection';
import { PerformanceInsightSection } from '@/features/assets/components/detail/PerformanceInsightSection';
import { PrimaryMetricSection } from '@/features/assets/components/detail/PrimaryMetricSection';
import { RecentEventsSection } from '@/features/assets/components/detail/RecentEventsSection';
import { buildSimulatedHistory } from '@/lib/buildSimulatedHistory';
import { useSimulation } from '@/simulation/SimulationContext';

export function AssetDetailPage() {
	const { assetId } = useParams<{ assetId: string }>();
	const { assets, tick } = useSimulation();

	const asset = assets.find((item) => item.id === assetId);
	const primarySensor = asset?.sensors[0];

	const chartData = useMemo(() => {
		if (!primarySensor) return [];

		return buildSimulatedHistory(
			primarySensor.value,
			primarySensor.min,
			primarySensor.max,
			tick,
		);
	}, [primarySensor, tick]);

	if (!asset) {
		return (
			<AppShell title="Not found">
				<Typography gutterBottom>Unknown asset.</Typography>
				<Link component={RouterLink} to="/" color="primary">
					Back to overview
				</Link>
			</AppShell>
		);
	}

	const events = MOCK_EVENTS_BY_ASSET[asset.id] ?? [];

	return (
		<AppShell title={asset.name}>
			<Stack spacing={3}>
				<DetailPageHeader asset={asset} />
				<PerformanceInsightSection asset={asset} />
				<AlertsHealthSection asset={asset} />
				<PrimaryMetricSection
					chartData={chartData}
					primarySensor={primarySensor}
				/>
				<LiveSensorsSection sensors={asset.sensors} />
				<RecentEventsSection events={events} />
			</Stack>
		</AppShell>
	);
}
