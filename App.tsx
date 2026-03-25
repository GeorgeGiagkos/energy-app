import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AssetDetailPage } from '@/pages/AssetDetailPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { SimulationProvider } from '@/simulation/SimulationContext';
import { appTheme } from '@/theme/appTheme';

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <SimulationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/assets/:assetId" element={<AssetDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SimulationProvider>
    </ThemeProvider>
  );
}
