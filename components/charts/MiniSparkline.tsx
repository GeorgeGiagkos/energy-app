import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 32;
const COMPACT_WIDTH = 100;
const COMPACT_HEIGHT = 24;

type MiniSparklineProps = {
	values: number[];
	compact?: boolean;
};

export function MiniSparkline({ values, compact = false }: MiniSparklineProps) {
	const theme = useTheme();
	const width = compact ? COMPACT_WIDTH : DEFAULT_WIDTH;
	const height = compact ? COMPACT_HEIGHT : DEFAULT_HEIGHT;

	if (values.length < 2) {
		return (
			<Box
				sx={{
					height,
					opacity: 0.35,
					borderRadius: 0.5,
					bgcolor: 'action.hover',
				}}
			/>
		);
	}

	const min = Math.min(...values);
	const max = Math.max(...values);
	const span = max - min || 1;

	const points = values
		.map((value, index) => {
			const x = (index / (values.length - 1)) * width;
			const y = height - ((value - min) / span) * (height - 4) - 2;
			return `${x},${y}`;
		})
		.join(' ');

	return (
		<Box sx={{ width: '100%', maxWidth: 140, lineHeight: 0 }}>
			<svg
				width="100%"
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				preserveAspectRatio="none"
				aria-hidden
			>
				<polyline
					fill="none"
					stroke={theme.palette.primary.main}
					strokeWidth={1.5}
					strokeLinejoin="round"
					strokeLinecap="round"
					points={points}
				/>
			</svg>
		</Box>
	);
}
