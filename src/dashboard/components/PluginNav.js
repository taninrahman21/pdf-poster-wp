/**
 * The plugin's own admin navigation, for the header's nav slot.
 *
 * These are real page loads, not hash routes: every item is a separate WordPress admin
 * screen (two of them, All PDF Posters and Add New, are not even plugin pages). So they
 * are plain anchors rather than react-router <Link>s, which would only rewrite the hash
 * and leave the visitor on whichever page they were already on.
 *
 * Class names are bpl-tools' own -- .bPlDashboardNav / .navLink / .active -- so the slot
 * inherits the header's styling, including the 2px primary underline on the current item
 * and the sub-1350px collapse into the hamburger that Header wires up.
 */
const PluginNav = ({ adminUrl = '', current = 'analytics' }) => {
    const base = `${adminUrl}/edit.php?post_type=pdfposter`;

    const items = [
        { key: 'list', name: 'All PDF Posters', href: base },
        { key: 'new', name: 'Add New', href: `${adminUrl}/post-new.php?post_type=pdfposter` },
        { key: 'settings', name: 'Settings', href: `${base}&page=fpdf-settings` },
        { key: 'analytics', name: 'Analytics', href: `${base}&page=pdf-poster-analytics` },
        { key: 'help', name: 'Demo and Help', href: `${base}&page=pdf-poster` },
    ];

    return (
        <nav className='bPlDashboardNav' aria-label='PDF Poster'>
            {items.map((item) => (
                <a
                    key={item.key}
                    href={item.href}
                    className={`navLink${current === item.key ? ' active' : ''}`}
                    aria-current={current === item.key ? 'page' : undefined}
                >
                    {item.name}
                </a>
            ))}
        </nav>
    );
};

export default PluginNav;
