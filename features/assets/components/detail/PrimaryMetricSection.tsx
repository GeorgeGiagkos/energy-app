import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PrimaryMetricLineChart } from '@/components/charts/PrimaryMetricLineChart';
import type { SimulatedHistoryPoint } from '@/lib/buildSimulatedHistory';
import type { SensorReading } from '@/types/asset';

type PrimaryMetricSectionProps = {
	chartData: SimulatedHistoryPoint[];
	primarySensor: SensorReading | undefined;
};

export function PrimaryMetricSection({
	chartData,
	primarySensor,
}: PrimaryMetricSectionProps) {
	return (
		<Paper variant="outlined" sx={{ p: 2 }}>
			<Typography variant="subtitle2" color="text.secondary" gutterBottom>
				Primary metric (simulated history)
			</Typography>
			{primarySensor ? (
				<PrimaryMetricLineChart
					data={chartData}
					metricLabel={primarySensor.label}
					height={280}
				/>
			) : null}
		</Paper>
	);
}
