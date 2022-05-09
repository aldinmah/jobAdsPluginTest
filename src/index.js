import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/main.css'
import App from './App';

const WidgetDivs = document.querySelectorAll('.job-ads-container')

WidgetDivs.forEach(widgetElement => {
  const widgetRoot = ReactDOM.createRoot(widgetElement);
  widgetRoot.render(
      <App />
  );
})