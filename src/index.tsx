import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteErrorBoundary from './layouts/errors/RouteErrorBoundary';
import DashboardView from './views/dashboards/DashboardView';
import PlaceIndexView from './views/places/PlaceIndexView';
import PlaceEditView from './views/places/PlaceEditView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NewPlaceView from './views/places/NewPlaceView';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './layouts/defaultTheme';
import Alert from './layouts/communications/Alerts';
import GuestIndexView from './views/guests/GuestIndexView';
import NewGuestView from './views/guests/NewGuestView';
import GuestEditView from './views/guests/GuestEditView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardView />,
    errorElement: <RouteErrorBoundary />
  },
  {
    path: 'places',
    element: <PlaceIndexView />
  },
  {
    path: 'places/new',
    element: <NewPlaceView />
  },
  {
    path: 'places/:placeId',
    element: <PlaceEditView />
  },
  {
    path: 'guests',
    element: <GuestIndexView />
  },
  {
    path: 'guests/new',
    element: <NewGuestView />
  },
  {
    path: 'guests/:guestId',
    element: <GuestEditView />
  }
]);

export const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Alert message="Carregando..." />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
