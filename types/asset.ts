export type AssetOperationalStatus =
  | 'running'
  | 'warning'
  | 'alarm'
  | 'offline';

export interface SensorReading {
  id: string;
  label: string;
  unit: string;
  value: number;
  min?: number;
  max?: number;
}

export type AlarmSeverity = 'critical' | 'warning' | 'info';

export interface ActiveAlarm {
  id: string;
  message: string;
  severity: AlarmSeverity;
}

export interface PerformanceVsTarget {
  label: string;
  actual: number;
  target: number;
  unit: string;
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  status: AssetOperationalStatus;
  sensors: SensorReading[];
  subtitle?: string;
  healthScorePercent: number;
  lastFaultAt: string | null;
  anomalyDetected: boolean;
  activeAlarms: ActiveAlarm[];
  performanceVsTarget: PerformanceVsTarget;
  miniTrend: number[];
  lastUpdatedAt: string;
}

export interface AssetEvent {
  id: string;
  timestamp: string;
  severity: AlarmSeverity;
  message: string;
}