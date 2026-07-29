import { useRef, useEffect, useState } from "react";

const FlipbookViewer = ({ attributes, source, viewerType = "flipbook", isRtl = false, theme = "light" }) => {
    const containerRef = useRef(null);
    const flipbookRef = useRef(null);

    const { initialPage, print, downloadButton, thumbMenu, height: attrHeight, onlyPDF, popupOptions, sidebarOpen, fullscreenButton, socialShare, actionsPosition, flipbookSound = true, progressiveLoading = true, keyboardNav = false } = attributes || {};

    const pdfUrl = source || attributes?.file?.url || attributes?.file;

    // Image-gallery flipbook: when enabled with images, dFlip renders an array of image
    // URLs as pages (providerType "image") instead of loading a PDF.
    const flipbookImages = Array.isArray(attributes?.flipbookImages) ? attributes.flipbookImages.filter(Boolean) : [];
    const useImages = attributes?.flipbookSourceType === "images" && flipbookImages.length > 0;
    const dflipSource = useImages ? flipbookImages : pdfUrl;

    const isPopup = popupOptions?.enabled;
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const currentFullscreen = !!document.fullscreenElement;
            setIsFullscreen(currentFullscreen);
            if (flipbookRef.current) {
                window.dispatchEvent(new Event('resize'));
            }
        };

        const initFlipbook = async () => {
            try {
                if (containerRef.current && window.jQuery && (pdfUrl || useImages)) {
                    if (containerRef.current.dataset.dflipInitialized === 'true') {
                        return;
                    }

                    // Map the chosen viewer to a dFlip viewerType:
                    //  - "scroll" -> dFlip "reader" (continuous vertical scroll)
                    //  - "slider" -> dFlip "slider" (one page at a time, slide/swipe)
                    //  - "flipbook" (default) -> page-turning book
                    const dflipViewerType = viewerType === "scroll" ? "reader" : (viewerType === "slider" ? "slider" : "flipbook");

                    // Map attributes to dFlip options
                    const options = {
                        viewerType: dflipViewerType,
                        openPage: initialPage > 0 ? initialPage : 1,
                        showDownloadControl: downloadButton,
                        showPrintControl: print,
                        autoOpenThumbnail: sidebarOpen,
                        // Dark theme only shades the area AROUND the pages, never the page content itself.
                        backgroundColor: theme === "dark" ? "#2a2a2e" : "transparent",
                        controlsPosition: actionsPosition,
                        // Page-turn sound (Flipbook/Slider only; dFlip's "reader"/scroll mode is always silent).
                        // dFlip defaults this to true, so we pass it explicitly to keep it user-controllable.
                        enableSound: flipbookSound !== false,
                        // Progressive/range loading: dFlip forwards this to its internal pdf.js getDocument.
                        // Default (range on) = progressive; turning it off forces the whole file to download first.
                        disableRange: progressiveLoading === false,
                        // Keyboard navigation: dFlip's arrow-key nav is gated by arrowKeysAction.
                        // Uniform control across viewers -> only navigate when the toggle is on.
                        arrowKeysAction: keyboardNav ? "nav" : "none",
                        // RTL reading direction (dFlip maps direction 2 -> RTL, anything else -> LTR).
                        direction: isRtl ? 2 : 1,
                    };

                    // Handle hidden controls
                    const hiddenControls = [];
                    if (!thumbMenu) hiddenControls.push("thumbnail");
                    if (!fullscreenButton) hiddenControls.push("fullScreen");
                    if (socialShare && !socialShare.enabled) hiddenControls.push("share");

                    if (hiddenControls.length > 0) {
                        options.hideControls = hiddenControls.join(",");
                    }

                    // Handle Reader Mode (onlyPDF)
                    if (onlyPDF) {
                        options.hideToolbar = true;
                        options.allControls = "";
                    }

                    // Map height - use 100% if in popup or if we detect we're likely going fullscreen
                    const isNowFullscreen = !!document.fullscreenElement;
                    if (isPopup || isNowFullscreen) {
                        options.height = '100%';
                    } else if (attrHeight) {
                        options.height = typeof attrHeight === 'object' ? attrHeight.desktop : attrHeight;
                    }

                    containerRef.current.dataset.dflipInitialized = 'true';
                    flipbookRef.current = window.jQuery(containerRef.current).flipBook(dflipSource, options);
                }
            } catch (error) {
                console.error('Error loading dFlip:', error);
            }
        };

        const handleFlipbookFullscreen = (e) => {
            // Check if this event is for this specific wrapper/viewer
            const wrapper = containerRef.current?.closest('.pdfp_wrapper');
            if (e.detail?.wrapper === wrapper && flipbookRef.current) {
                if (flipbookRef.current.switchFullscreen) {
                    flipbookRef.current.switchFullscreen();
                } else if (flipbookRef.current.toggleFullscreen) {
                    flipbookRef.current.toggleFullscreen();
                }
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initFlipbook();
                    window.dispatchEvent(new Event('resize'));
                }
            });
        }, { threshold: 0.1 });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        window.addEventListener('PDFP_TOGGLE_FLIPBOOK_FULLSCREEN', handleFlipbookFullscreen);

        return () => {
            observer.disconnect();
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            window.removeEventListener('PDFP_TOGGLE_FLIPBOOK_FULLSCREEN', handleFlipbookFullscreen);
            if (flipbookRef.current && typeof flipbookRef.current.dispose === 'function') {
                try {
                    flipbookRef.current.dispose();
                } catch (err) {
                    console.warn('dFlip dispose error:', err);
                }
            }
            if (containerRef.current) {
                containerRef.current.dataset.dflipInitialized = 'false';
                try {
                    containerRef.current.innerHTML = '';
                } catch(e) {}
            }
        };
    }, [containerRef, attributes, pdfUrl, isPopup, viewerType]);

    const displayHeight = typeof attrHeight === 'object' ? attrHeight.desktop : attrHeight;
    const computedHeight = (isPopup || isFullscreen) ? '100%' : (displayHeight || 'auto');

    const exitFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            const wrapper = containerRef.current?.closest('.pdfp_wrapper');
            if (wrapper) {
                wrapper.classList.remove('pdfp_fullscreen_opened');
            }
        }
    };

    return (
        <div 
          className={`dflipWrapper ${(isPopup || isFullscreen) ? 'pdfp_popup_wrapper' : ''}`} 
          style={{ height: computedHeight }}
        >
            <div className="iframe_wrapper">
                <div ref={containerRef} className="dflip-container" />
                <span className="close" onClick={exitFullScreen}>
                    &times;
                </span>
            </div>
        </div>
    );
};

export default FlipbookViewer;
