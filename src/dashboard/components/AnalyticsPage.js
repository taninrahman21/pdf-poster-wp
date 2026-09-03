import Header from '../../../../bpl-tools/Admin/Header';
import Analytics from './Analytics';
import PluginNav from './PluginNav';

/**
 * Standalone wrapper for the Analytics screen.
 *
 * The screen has its own submenu under PDF Poster, so it renders outside the dashboard's
 * router. It keeps the same chrome -- .bPlDashboard ground, the bpl-tools Header, the
 * .bPlDashboardMain padding -- so the page is indistinguishable from the dashboard route
 * it also still answers on.
 *
 * The header's nav slot carries the plugin's real admin menu rather than the dashboard's
 * hash routes -- those belong to the Demo and Help page and would be dead ends here.
 */
const AnalyticsPage = (props) => (
    <div className='bPlDashboard'>
        <Header {...props}>
            <PluginNav adminUrl={props.adminUrl} current='analytics' />
        </Header>

        <main className='bPlDashboardMain'>
            <Analytics {...props} />
        </main>
    </div>
);

export default AnalyticsPage;
