import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AppShell } from '@/components/layout/AppShell';
import { AssetCard } from '@/features/assets/components/AssetCard';
import { useSimulation } from '@/simulation/SimulationContext';

export function DashboardPage() {
	const { assets } = useSimulation();

	return (
		<AppShell title="Overview">
			<Stack spacing={2}>
				<Box>
					<Typography variant="h5" fontWeight={600} gutterBottom>
						Fleet overview
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Six assets at a glance — live simulation updates every few seconds.
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'grid',
						gap: 2,
						gridTemplateColumns: {
							xs: '1fr',
							sm: 'repeat(2, minmax(0, 1fr))',
							md: 'repeat(3, minmax(0, 1fr))',
						},
					}}
				>
					{assets.map((asset) => (
						<AssetCard key={asset.id} asset={asset} />
					))}
				</Box>
			</Stack>
		</AppShell>
	);
}
