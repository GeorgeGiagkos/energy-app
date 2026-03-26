import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatNumber } from '@/lib/format';
import type { SensorReading } from '@/types/asset';

type LiveSensorsSectionProps = {
	sensors: SensorReading[];
};

export function LiveSensorsSection({ sensors }: LiveSensorsSectionProps) {
	return (
		<Paper variant="outlined" sx={{ p: 2 }}>
			<Typography variant="subtitle1" gutterBottom>
				Live sensors
			</Typography>

			<Stack spacing={1}>
				{sensors.map((sensor) => (
					<Stack
						key={sensor.id}
						direction="row"
						justifyContent="space-between"
						alignItems="baseline"
					>
						<Typography color="text.secondary">{sensor.label}</Typography>
						<Typography>
							{formatNumber(sensor.value, 2)} {sensor.unit}
						</Typography>
					</Stack>
				))}
			</Stack>
		</Paper>
	);
}
