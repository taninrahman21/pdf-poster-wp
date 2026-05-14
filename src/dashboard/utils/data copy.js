const slug = 'pdf-poster';

export const dashboardInfo = (info) => {
    const { version, isPremium, hasPro } = info;

    const proSuffix = isPremium ? ' Pro' : '';

    return {
        name: `PDF Poster${proSuffix}`,
        displayName: `PDF Poster${proSuffix} - Display PDF Files with Custom Viewer`,
        description: `PDF Poster${proSuffix} lets you embed PDF files in WordPress using a responsive viewer and block support, including full-screen, download, and print options.`,
        slug,
        logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
        banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
        // video: 'https://www.youtube.com/watch?v=milYZrqLJsE',
        // isYoutube: true,
        version,
        isPremium,
        hasPro,
        pages: {
            org: `https://wordpress.org/plugins/${slug}/`,
            landing: `https://bplugins.com/products/${slug}/`,
            docs: `https://bplugins.com/docs/${slug}/`,
            pricing: `https://bplugins.com/products/${slug}/#pricing`,
        },
        freemius: {
            product_id: 14261,
            plan_id: 23852,
            public_key: 'pk_6e833032174d131283193892a44a2'
        }
    }
}

export const changelogs = [
    {
        version: '2.0.0 - 13 Aug 2025',
        list: [
            'Fix Post Type Issues',
            'Update SDK',
            'Change UI',
            'Admin Dashboard'
        ]
    },
    {
        version: '1.16.1 - 3 Jul 2025',
        list: [
            'Fix Pagination issue'
        ]
    },
    {
        version: '1.16.0 - 18 Jun 2025',
        list: [
            'Update Upgrade Page',
            'Fix other users premium unlock issue',
            'Update SDK'
        ]
    }
];

export const demoInfo = {
    title: 'Live Overview',
    description: 'Click on any section to view it live',
    layout: 'list',
    // allInOneLabel: 'See All Demos',
    // allInOneLink: 'https://apb.bplugins.com/all-demos-in-one-place/',
    "demos": [
        {
            "title": "Default PDF Viewer",
            "description": "Standard PDF viewer",
            "url": "https://pdfposter.com/demo/default/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'\u003e\u003cpath d='M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Custom Width Viewer",
            "description": "Viewer with adjustable width",
            "url": "https://pdfposter.com/demo/custom-width/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'\u003e\u003cpath d='M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Custom Height Viewer",
            "description": "Viewer with adjustable height",
            "url": "https://pdfposter.com/demo/custom-height/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'\u003e\u003cpath d='M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Allow Print Option",
            "description": "Enables printing of PDF",
            "url": "https://pdfposter.com/demo/allow-print/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'\u003e\u003cpath d='M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Title on Top",
            "description": "Displays file name at top",
            "url": "https://pdfposter.com/demo/show-file-name-on-top/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'\u003e\u003cpath d='M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Download Button on Top",
            "description": "Shows download button on top",
            "url": "https://pdfposter.com/demo/show-download-button-on-top/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'\u003e\u003cpath d='M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Full-Screen Button on Top",
            "description": "Full-screen toggle appears top",
            "url": "https://pdfposter.com/demo/show-view-full-screen-button-on-top/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'\u003e\u003cpath d='M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Protected Content View",
            "description": "Content is protected from copying",
            "url": "https://pdfposter.com/demo/protect-content/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'\u003e\u003cpath d='M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Thumbnail Toggle Menu",
            "description": "Show/hide thumbnail navigation",
            "url": "https://pdfposter.com/demo/thumbnails-toggle-menu/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' id='layout-sidebar-inset'\u003e\u003cpath d='M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z'/\u003e\u003cpath d='M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Jump-to-Page Navigation",
            "description": "Quickly jump to chosen page",
            "url": "https://pdfposter.com/demo/jump-to-page/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'\u003e\u003cpath d='M137.4 502.6c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V288H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H448V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L384 109.3V224H192 128 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96zM128 192h64V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V192zM448 320H384V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Quick Embed",
            "description": "Easy PDF embed code generation",
            "url": "https://pdfposter.com/demo/quick-embed/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'\u003e\u003cpath d='M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        },
        {
            "title": "Adobe Embedder Integration",
            "description": "Uses Adobe embedder inside viewer",
            "url": "https://pdfposter.com/demo/embed-pdf-with-adobe-embedder/",
            "icon": "\u003csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' id='file-earmark-pdf-fill'\u003e\u003cpath d='M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z'/\u003e\u003cpath fill-rule='evenodd' d='M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103'/\u003e\u003c/svg\u003e",
            "category": "",
            type: 'iframe'
        }
    ],
}


export const pricingInfo = {
    cycles: [
        {
            cycle: 'monthly',
            label: 'Monthly',
            isDefault: false
        },
        {
            cycle: 'annual',
            label: 'Yearly',
            isDefault: true
        },
        {
            cycle: 'lifetime',
            label: 'Lifetime',
            isDefault: false
        }
    ],
    plans: [
        {
            name: 'Single Site',
            quantity: 1,
            prices: {
                monthly: '4.99',
                annual: '47.88',
                lifetime: '149.99'
            },
            pricePrefix: '',
            priceSuffix: '',
            isFeatured: false,
            note: ''
        },
        {
            name: '3 Sites',
            quantity: 3,
            prices: {
                monthly: '8.99',
                annual: '83.88',
                lifetime: '259.99'
            },
            pricePrefix: '',
            priceSuffix: '',
            isFeatured: true,
            note: ''
        },
        {
            name: 'Unlimited Sites',
            quantity: 'null',
            prices: {
                monthly: '33.99',
                annual: '323.88',
                lifetime: '979.99'
            },
            pricePrefix: '',
            priceSuffix: '',
            isFeatured: false,
            note: ''
        }
    ],
    "features": [
        "Quick Embedder",
        "Custom CSS",
        "Preset",
        "Shortcode",
        "Gutenberg Block",
        "Dropbox API",
        "Google Drive API",
        "Adobe Embedder API",
        "Lightbox",
        "Show Inline PDF (look like webpage)",
        "Protect PDF from download/print",
        "Horizontal scrollbar",
        "Set initial page",
        "Download button",
        "Print button",
        "Fullscreen button"
    ],
    button: {
        label: 'Buy Now ➜'
    },
    featured: {
        text: 'Best Value'
    }
}

export const featureCompareInfo = {
    title: 'Features',
    "plans": [
        {
            "id": "ztbk4ex2fyi",
            "name": "Free Plan",
            "color": "#485781",
            "cta": {
                "label": "Download Now",
                "url": "https://downloads.wordpress.org/plugin/pdf-poster.latest-stable.zip",
                "className": ""
            }
        },
        {
            "id": "lhmjqhkeyi",
            "name": "\u003cspan style='color: var(\u002d\u002dcontent-color);'\u003ePro Start from \u003c/span\u003e\u003cspan style='font-size: 1.3em;'\u003e47.88/y\u003c/span\u003e",
            "color": "#146EF5",
            "cta": {
                "label": "Buy Now",
                "url": "#pricing",
                "className": "two"
            }
        }
    ],
    "features": [
        {
            "label": "Custom Width \u0026amp; Height",
            "plans": [
                "ztbk4ex2fyi",
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Print Support",
            "plans": [
                "ztbk4ex2fyi",
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Filename Display",
            "plans": [
                "ztbk4ex2fyi",
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Full-Screen Button",
            "plans": [
                "ztbk4ex2fyi",
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Download Button",
            "plans": [
                "ztbk4ex2fyi",
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Gutenberg Block Integration",
            "plans": [
                "ztbk4ex2fyi",
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "User-Friendly Viewer",
            "plans": [
                "ztbk4ex2fyi",
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Raw PDF Viewer",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Content Protection",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Preset Viewer Settings",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Shortcode Embedding",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Classic Editor Tools",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Additional Gutenberg Blocks",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Sidebar Toggle Menu",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Full Control Over Buttons",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Translate Buttons",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Jump to Page",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Zoom Level",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Open in New Window",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Google Doc Viewer",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Horizontal Scrollbar",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Thumbnails Toggle",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Thumbnails Open by Default",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Always Load the Latest Version",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Enable Popup Viewer",
            "plans": [
                "lhmjqhkeyi"
            ]
        },
        {
            "label": "Show Only PDF",
            "plans": [
                "lhmjqhkeyi"
            ]
        }
    ],
}