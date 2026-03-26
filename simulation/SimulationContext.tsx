import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import { MOCK_ASSETS } from '@/data/mockAssets';
import type { Asset } from '@/types/asset';

type SimulationContextValue = {
	assets: Asset[];
	tick: number;
};

const SimulationContext = createContext<SimulationContextValue | null>(null);

const TICK_MS = 2000;
const MINI_TREND_MAX = 18;

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

function simulateOneAsset(asset: Asset): Asset {
	const next = structuredClone(asset);

	for (const sensor of next.sensors) {
		if (next.status === 'offline') {
			sensor.value = Math.max(0, sensor.value * 0.98);
			continue;
		}

		const span =
			sensor.max != null && sensor.min != null
				? sensor.max - sensor.min
				: Math.abs(sensor.value) + 1;

		const delta = (Math.random() - 0.5) * span * 0.02;
		let nextValue = sensor.value + delta;

		if (sensor.min != null) nextValue = Math.max(sensor.min, nextValue);
		if (sensor.max != null) nextValue = Math.min(sensor.max, nextValue);

		sensor.value = nextValue;
	}

	const primarySensor = next.sensors[0];

	if (primarySensor) {
		next.performanceVsTarget.actual = primarySensor.value;
		next.performanceVsTarget.label = primarySensor.label;
		next.miniTrend = [...next.miniTrend, primarySensor.value].slice(
			-MINI_TREND_MAX,
		);
		next.lastUpdatedAt = new Date().toISOString();
	}

	let nextHealth = next.healthScorePercent + (Math.random() - 0.5) * 1.2;

	if (next.status === 'offline') {
		nextHealth = clamp(nextHealth, 0, 45);
	} else if (next.status === 'alarm') {
		nextHealth = clamp(nextHealth, 15, 55);
	} else if (next.status === 'warning') {
		nextHealth = clamp(nextHealth, 55, 90);
	} else {
		nextHealth = clamp(nextHealth, 75, 100);
	}

	next.healthScorePercent = Math.round(nextHealth * 10) / 10;

	const hasSeriousAlarm = next.activeAlarms.some(
		(alarm) => alarm.severity === 'warning' || alarm.severity === 'critical',
	);

	next.anomalyDetected =
		next.status === 'offline' && next.activeAlarms.length === 0
			? false
			: hasSeriousAlarm || next.healthScorePercent < 70;

	return next;
}

export function SimulationProvider({ children }: { children: ReactNode }) {
	const [assets, setAssets] = useState<Asset[]>(() =>
		structuredClone(MOCK_ASSETS),
	);
	const [tick, setTick] = useState(0);

	useEffect(() => {
		const id = window.setInterval(() => {
			setTick((currentTick) => currentTick + 1);
			setAssets((prev) => prev.map((asset) => simulateOneAsset(asset)));
		}, TICK_MS);

		return () => window.clearInterval(id);
	}, []);

	return (
		<SimulationContext.Provider value={{ assets, tick }}>
			{children}
		</SimulationContext.Provider>
	);
}

export function useSimulation(): SimulationContextValue {
	const ctx = useContext(SimulationContext);

	if (!ctx) {
		throw new Error('useSimulation must be used within SimulationProvider');
	}

	return ctx;
}
