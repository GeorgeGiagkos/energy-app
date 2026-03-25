import type { Asset, AssetEvent } from '@/types/asset';

const TREND_LEN = 18;

function trendSeed(value: number): number[] {
	return Array.from({ length: TREND_LEN }, () => value);
}

const now = () => new Date().toISOString();

export const MOCK_ASSETS: Asset[] = [
	{
		id: 'wt-alpha',
		name: 'Wind Turbine Alpha',
		type: 'Wind turbine',
		location: 'North Ridge Farm',
		status: 'running',
		subtitle: 'Nominal',
		healthScorePercent: 94,
		lastFaultAt: new Date(Date.now() - 86400_000 * 4).toISOString(),
		anomalyDetected: false,
		activeAlarms: [],
		performanceVsTarget: {
			label: 'Power',
			actual: 2.4,
			target: 2.5,
			unit: 'MW',
		},
		miniTrend: trendSeed(2.4),
		lastUpdatedAt: now(),
		sensors: [
			{
				id: 'power_mw',
				label: 'Power',
				unit: 'MW',
				value: 2.4,
				min: 0,
				max: 3,
			},
			{
				id: 'wind_ms',
				label: 'Wind speed',
				unit: 'm/s',
				value: 8.2,
				min: 0,
				max: 25,
			},
			{
				id: 'temp_c',
				label: 'Nacelle temp.',
				unit: '°C',
				value: 42,
				min: -10,
				max: 90,
			},
		],
	},
	{
		id: 'inv-12',
		name: 'Solar Inverter 12',
		type: 'Solar inverter',
		location: 'Station 12',
		status: 'warning',
		subtitle: 'Grid constraint',
		healthScorePercent: 76,
		lastFaultAt: new Date(Date.now() - 3600_000 * 6).toISOString(),
		anomalyDetected: true,
		activeAlarms: [
			{
				id: 'a1',
				message: 'Overheating',
				severity: 'warning',
			},
			{
				id: 'a2',
				message: 'MPPT derated',
				severity: 'info',
			},
		],
		performanceVsTarget: {
			label: 'AC power',
			actual: 480,
			target: 520,
			unit: 'kW',
		},
		miniTrend: trendSeed(480),
		lastUpdatedAt: now(),
		sensors: [
			{
				id: 'power_kw',
				label: 'AC power',
				unit: 'kW',
				value: 480,
				min: 0,
				max: 600,
			},
			{
				id: 'temp_c',
				label: 'Internal temp.',
				unit: '°C',
				value: 58,
				min: 0,
				max: 85,
			},
		],
	},
	{
		id: 'comp-b',
		name: 'Compressor B',
		type: 'Compressor',
		location: 'Plant Hall 2',
		status: 'running',
		healthScorePercent: 88,
		lastFaultAt: new Date(Date.now() - 86400_000 * 12).toISOString(),
		anomalyDetected: false,
		activeAlarms: [
			{
				id: 'a3',
				message: 'Low pressure',
				severity: 'warning',
			},
		],
		performanceVsTarget: {
			label: 'Outlet pressure',
			actual: 7.1,
			target: 7.5,
			unit: 'bar',
		},
		miniTrend: trendSeed(7.1),
		lastUpdatedAt: now(),
		sensors: [
			{
				id: 'pressure_bar',
				label: 'Outlet pressure',
				unit: 'bar',
				value: 7.1,
				min: 0,
				max: 10,
			},
			{
				id: 'vibration',
				label: 'Vibration',
				unit: 'mm/s',
				value: 2.3,
				min: 0,
				max: 10,
			},
		],
	},
	{
		id: 'ps-north',
		name: 'North Substation',
		type: 'Power station',
		location: 'Grid tie North',
		status: 'alarm',
		subtitle: 'Protection trip',
		healthScorePercent: 32,
		lastFaultAt: new Date(Date.now() - 120_000).toISOString(),
		anomalyDetected: true,
		activeAlarms: [
			{
				id: 'a4',
				message: 'Underfrequency trip',
				severity: 'critical',
			},
			{
				id: 'a5',
				message: 'Breaker failure',
				severity: 'critical',
			},
		],
		performanceVsTarget: {
			label: 'Load',
			actual: 0,
			target: 40,
			unit: 'MW',
		},
		miniTrend: trendSeed(0),
		lastUpdatedAt: now(),
		sensors: [
			{ id: 'load_mw', label: 'Load', unit: 'MW', value: 0, min: 0, max: 50 },
			{
				id: 'freq_hz',
				label: 'Frequency',
				unit: 'Hz',
				value: 49.92,
				min: 49,
				max: 51,
			},
		],
	},
	{
		id: 'line-7',
		name: 'Production Line 7',
		type: 'Manufacturing',
		location: 'Factory B',
		status: 'offline',
		subtitle: 'Scheduled stop',
		healthScorePercent: 0,
		lastFaultAt: new Date(Date.now() - 1800_000).toISOString(),
		anomalyDetected: false,
		activeAlarms: [],
		performanceVsTarget: {
			label: 'OEE',
			actual: 0,
			target: 85,
			unit: '%',
		},
		miniTrend: trendSeed(0),
		lastUpdatedAt: now(),
		sensors: [
			{ id: 'oee', label: 'OEE', unit: '%', value: 0, min: 0, max: 100 },
			{
				id: 'cyc_s',
				label: 'Cycle time',
				unit: 's',
				value: 0,
				min: 0,
				max: 120,
			},
		],
	},
	{
		id: 'bess-east',
		name: 'BESS East',
		type: 'Battery storage',
		location: 'East yard',
		status: 'running',
		subtitle: 'Ancillary services',
		healthScorePercent: 91,
		lastFaultAt: new Date(Date.now() - 86400_000 * 2).toISOString(),
		anomalyDetected: false,
		activeAlarms: [],
		performanceVsTarget: {
			label: 'Power',
			actual: 12.5,
			target: 15,
			unit: 'MW',
		},
		miniTrend: trendSeed(12.5),
		lastUpdatedAt: now(),
		sensors: [
			{
				id: 'power_mw',
				label: 'Power',
				unit: 'MW',
				value: 12.5,
				min: 0,
				max: 25,
			},
			{ id: 'soc_pct', label: 'SOC', unit: '%', value: 68, min: 0, max: 100 },
		],
	},
];

export const MOCK_EVENTS_BY_ASSET: Record<string, AssetEvent[]> = {
	'wt-alpha': [
		{
			id: 'e1',
			timestamp: new Date(Date.now() - 3600_000).toISOString(),
			severity: 'info',
			message: 'Yaw adjustment completed',
		},
		{
			id: 'e2',
			timestamp: new Date(Date.now() - 7200_000).toISOString(),
			severity: 'info',
			message: 'SCADA heartbeat OK',
		},
	],
	'inv-12': [
		{
			id: 'e3',
			timestamp: new Date(Date.now() - 900_000).toISOString(),
			severity: 'warning',
			message: 'Output capped by grid operator',
		},
	],
};
