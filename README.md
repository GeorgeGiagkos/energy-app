# i4energy — Asset Monitoring Dashboard (Assignment)

## Overview

This project is a lightweight industrial asset monitoring dashboard built with **React + TypeScript**.  
The goal was to simulate a small real-time monitoring interface similar to what operators might use to observe the health and performance of industrial equipment.

The application displays multiple assets in an overview dashboard and allows navigation to a detailed view for each asset, including simulated live readings, performance insights, and recent events.

The implementation focuses on:

- Clean architecture
- Real-time UI updates
- Reusable components
- Readable and maintainable code

---

## Tech Stack

- React 18
- TypeScript
- Vite
- Material UI
- React Router
- Chart.js (react-chartjs-2)

---

## Getting Started

### Install & Run

```bash
npm install
npm run dev
```

Open:

http://localhost:5173

Build production version:

```bash
npm run build
npm run preview
```

---

## Features Implemented

### Asset Overview

- Grid dashboard of assets
- Status indicator (Running, Warning, Alarm, Offline)
- Live sensor values
- Health score indicator
- Performance insight
- Real-time updates

### Asset Detail Page

- Asset metadata (name, type, location)
- Performance insight section
- Alerts & health section
- Live sensors list
- Simulated history chart
- Recent events table

---

## Real-Time Simulation

Real-time behavior is simulated on the client using a timer:

- `setInterval` updates every 2 seconds
- Sensor values change gradually
- Health score dynamically adjusts
- Anomaly detection logic updates UI
- UI automatically re-renders via React state updates

This approach keeps the application lightweight while demonstrating how real-time dashboards behave.

---

## Architecture Decisions

### Context for Simulation State

I used a React Context (`SimulationContext`) to manage asset state and updates.

Reasons:

- Simple global state
- No need for Redux in small scope
- Easy to extend later

---

In a real production environment this would be replaced by:

- WebSockets
- Handle API
- Redux

---

### Material UI

Material UI was used for:

- Consistent spacing
- Typography
- Fast UI development
- Clean design

---

## What I Would Improve With More Time

- API integration
- Error handling
- Loading states
- Unit tests
- Performance optimizations

---
