import type { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { Link as RouterLink } from 'react-router-dom';

type AppShellProps = {
	title?: string;
	children: ReactNode;
};

export function AppShell({ title = 'Asset monitor', children }: AppShellProps) {
	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
			<AppBar
				position="sticky"
				color="inherit"
				elevation={0}
				sx={{
					bgcolor: 'background.default',
					backgroundImage: 'none',
					borderBottom: '1px solid',
					borderColor: 'divider',
				}}
			>
				<Toolbar>
					<Link
						component={RouterLink}
						to="/"
						underline="none"
						color="inherit"
						sx={{
							display: 'flex',
							alignItems: 'baseline',
							gap: 1,
						}}
					>
						<Typography variant="h6" component="span" color="primary">
							i4energy
						</Typography>

						<Typography variant="body2" color="text.secondary">
							{title}
						</Typography>
					</Link>
				</Toolbar>
			</AppBar>

			<Container maxWidth="lg" sx={{ pt: 3, pb: { xs: 5, sm: 7 } }}>
				{children}
			</Container>
		</Box>
	);
}
