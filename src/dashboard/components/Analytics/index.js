import './style.scss';

/**
 * PDF Poster › Analytics.
 *
 * Counting views and downloads is part of PDF Poster Pro, so on this build the screen has
 * no numbers to fetch and does not try: nothing is recorded without a licence, so a
 * loading state or an empty chart would imply data that will never arrive. What is left
 * is a straight description of the feature and what upgrading turns on.
 *
 * It renders at two addresses -- the '/analytics' dashboard route and the standalone
 * Analytics submenu -- from the one component, so the two cannot drift apart.
 */

const INCLUDED = [
    'Views and downloads counted for every document',
    'Sortable Views and Downloads columns on your PDF Posters list',
    'A panel on each document, in both the block and classic editors',
    'A report over 7, 30 or 90 days, with your best performers ranked',
    'Download rates, busiest day, and CSV export',
];

const Analytics = ({ adminUrl = '' }) => (
    <div className='bPlDashboardContainer'>
        <div className='pdfpAnalytics'>
            <div className='pdfpAnalyticsHead'>
                <div>
                    <h2 className='pdfpAnalyticsTitle'>Analytics</h2>
                    <p className='pdfpAnalyticsSub'>Find out which of your PDFs people actually read.</p>
                </div>
            </div>

            <div className='bPlDashboardCard pdfpAnalyticsUpgrade'>
                <h3>Document Insights is part of PDF Poster Pro</h3>
                <p>
                    It counts every view and every download in the visitor&apos;s browser, so the numbers keep
                    working behind a page cache. No IP address is stored and nothing is sent to a third party
                    &mdash; the data stays in your own database.
                </p>

                <ul className='pdfpUpgradeList'>
                    {INCLUDED.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <p className='pdfpUpgradeNote'>
                    Counting begins the moment you upgrade. There is no history to import, so the sooner it is on,
                    the sooner you have a trend to read.
                </p>

                <div className='bPlDashboardButtons'>
                    {/* Absolute, not '#pricing': this page is also mounted standalone with
                        no router, so a bare hash would only rewrite the fragment here. The
                        dashboard route is '#/pricing'. */}
                    <a className='bPlButton' href={`${adminUrl}/edit.php?post_type=pdfposter&page=pdf-poster#/pricing`}>
                        See Pro pricing
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default Analytics;
