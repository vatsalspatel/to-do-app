import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient()

root.render(
  <QueryClientProvider client={client}>
    <App />
    {/*<ReactQueryDevtools />*/}
  </QueryClientProvider>
);
