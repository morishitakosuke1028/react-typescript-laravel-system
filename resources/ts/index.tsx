import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // <- 追加

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  // <React.StrictMode>
    <div className="text-red-500">
        {/* Hello World */}
        <App /> {/* <- 追加 */}
    </div>
// </React.StrictMode>,
);