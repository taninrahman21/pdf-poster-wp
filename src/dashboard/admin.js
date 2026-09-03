import './admin.scss';
import { dashboardInfo } from './utils/data';
// import { createRoot } from 'react-dom/client';


import App from './components/App';
import AnalyticsPage from './components/AnalyticsPage';

document.addEventListener('DOMContentLoaded', () => {
  // Two mounts, one bundle. The dashboard is the router; Analytics has its own submenu
  // and renders the same screen standalone. Guarded individually so a page carrying only
  // one of them cannot throw on the other's missing element.
  const dashboardEl = document.getElementById('pdfpAdminDashboard');
  if (dashboardEl) {
    ReactDOM.createRoot(dashboardEl).render(<App {...dashboardInfo(JSON.parse(dashboardEl.dataset.info))} />);
  }

  const analyticsEl = document.getElementById('pdfpAnalyticsPage');
  if (analyticsEl) {
    ReactDOM.createRoot(analyticsEl).render(<AnalyticsPage {...dashboardInfo(JSON.parse(analyticsEl.dataset.info))} />);
  }
});