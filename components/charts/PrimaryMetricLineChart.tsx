import { useMemo } from 'react';
import {
	CategoryScale,
	Chart as ChartJS,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
	type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

import { formatNumber } from '@/lib/format';
import type { SimulatedHistoryPoint } from '@/lib/buildSimulatedHistory';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
);

type PrimaryMetricLineChartProps = {
	data: SimulatedHistoryPoint[];
	metricLabel: string;
	height?: number;
};

export function PrimaryMetricLineChart({
	data,
	metricLabel,
	height = 280,
}: PrimaryMetricLineChartProps) {
	const theme = useTheme();
	const primaryColor = theme.palette.primary.main;
	const textSecondary = theme.palette.text.secondary;
	const gridColor = 'rgba(148, 163, 184, 0.12)';

	const chartData = useMemo(
		() => ({
			labels: data.map((point) => point.label),
			datasets: [
				{
					label: metricLabel,
					data: data.map((point) => point.value),
					borderColor: primaryColor,
					backgroundColor: 'transparent',
					borderWidth: 2,
					fill: false,
					tension: 0.25,
					pointRadius: 0,
					pointHoverRadius: 4,
				},
			],
		}),
		[data, metricLabel, primaryColor],
	);

	const options = useMemo<ChartOptions<'line'>>(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			interaction: {
				mode: 'index',
				intersect: false,
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					backgroundColor: theme.palette.background.paper,
					titleColor: theme.palette.text.primary,
					bodyColor: textSecondary,
					borderColor: gridColor,
					borderWidth: 1,
					padding: 10,
					callbacks: {
						label: (context) => {
							const value = context.parsed.y;
							if (value == null) return metricLabel;
							return `${metricLabel}: ${formatNumber(value, 2)}`;
						},
					},
				},
			},
			scales: {
				x: {
					grid: { color: gridColor },
					ticks: {
						color: textSecondary,
						maxRotation: 0,
						autoSkip: true,
						maxTicksLimit: 8,
						font: { size: 11 },
					},
				},
				y: {
					grid: { color: gridColor },
					ticks: {
						color: textSecondary,
						font: { size: 11 },
					},
				},
			},
		}),
		[
			gridColor,
			metricLabel,
			textSecondary,
			theme.palette.background.paper,
			theme.palette.text.primary,
		],
	);

	if (data.length === 0) {
		return null;
	}

	return (
		<div style={{ width: '100%', height }}>
			<Line data={chartData} options={options} />
		</div>
	);
}
