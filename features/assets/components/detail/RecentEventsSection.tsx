import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import type { AssetEvent } from '@/types/asset';

type RecentEventsSectionProps = {
	events: AssetEvent[];
};

export function RecentEventsSection({ events }: RecentEventsSectionProps) {
	return (
		<Paper variant="outlined" sx={{ p: 0 }}>
			<Typography variant="subtitle1" sx={{ p: 2, pb: 0 }}>
				Recent events
			</Typography>

			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Time</TableCell>
							<TableCell>Severity</TableCell>
							<TableCell>Message</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{events.length === 0 ? (
							<TableRow>
								<TableCell colSpan={3}>
									<Typography variant="body2" color="text.secondary">
										No events for this asset.
									</Typography>
								</TableCell>
							</TableRow>
						) : (
							events.map((event) => (
								<TableRow key={event.id}>
									<TableCell>
										{new Date(event.timestamp).toLocaleString()}
									</TableCell>
									<TableCell>{event.severity}</TableCell>
									<TableCell>{event.message}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
