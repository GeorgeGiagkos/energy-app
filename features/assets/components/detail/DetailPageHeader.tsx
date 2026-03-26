import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { OperationalStatusChip } from '@/components/status/OperationalStatusChip';
import type { Asset } from '@/types/asset';

type DetailPageHeaderProps = {
	asset: Asset;
};

export function DetailPageHeader({ asset }: DetailPageHeaderProps) {
	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link component={RouterLink} to="/" underline="hover" color="inherit">
					Overview
				</Link>
				<Typography color="text.primary">{asset.name}</Typography>
			</Breadcrumbs>

			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={2}
				alignItems={{ xs: 'flex-start', sm: 'center' }}
				justifyContent="space-between"
			>
				<Stack spacing={0.25}>
					<Typography variant="h5">{asset.name}</Typography>
					<Typography variant="body2" color="text.secondary">
						{asset.type} · {asset.location}
					</Typography>
				</Stack>

				<OperationalStatusChip status={asset.status} size="medium" />
			</Stack>
		</>
	);
}
