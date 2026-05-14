import './admin.scss';
import { dashboardInfo } from './utils/data';
// import { createRoot } from 'react-dom/client';


import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const dashboardEl = document.getElementById('pdfpAdminDashboard');
  const info = JSON.parse(dashboardEl.dataset.info);

  ReactDOM.createRoot(dashboardEl).render(<App {...dashboardInfo(info)} />);
});