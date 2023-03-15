import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CardView from './CardView';
import Form from './Form';
import MultipleCardView from './MultipleCardView';

const router = createBrowserRouter([
  {
    path: '/cardview',
    element: <CardView />,
  },
  {
    path: '/multiple',
    element: <MultipleCardView />,
  },
  {
    path: '/',
    element: <Form />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
