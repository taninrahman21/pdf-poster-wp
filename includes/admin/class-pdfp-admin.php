<?php

namespace PDFPro\Admin;

if ( ! defined( 'ABSPATH' ) ) { exit; }

if (!class_exists('PDFPro\Admin\PDFP_AdminLoader')) {
	class PDFP_AdminLoader {
		public function __construct() {
			add_action('admin_enqueue_scripts', [$this, 'adminEnqueueScripts']);
			add_action('admin_menu', [$this, 'adminMenu'], 15);
			
		}

		public function adminEnqueueScripts($hook) {
			if (strpos($hook, 'pdf-poster') !== false) {
				$asset_file = file_exists(PDFPRO_PATH . 'build/dashboard.asset.php') 
					? include(PDFPRO_PATH . 'build/dashboard.asset.php') 
					: ['dependencies' => ['react', 'react-dom', 'wp-components', 'wp-api-fetch', 'wp-data'], 'version' => PDFPRO_VER];

				wp_enqueue_style('pdfp-dashboard-style', PDFPRO_PLUGIN_DIR . 'build/dashboard.css', [], $asset_file['version']);
				
				// Guarded on the file actually being enqueued: it used to test for
				// dashboard.css while enqueueing style-dashboard.css, which are emitted by
				// different rules -- the Analytics screen's styles live in the latter.
				if (file_exists(PDFPRO_PATH . 'build/style-dashboard.css')) {
					wp_enqueue_style('pdfp-dashboard-extra-style', PDFPRO_PLUGIN_DIR . 'build/style-dashboard.css', [], $asset_file['version']);
				}

				wp_enqueue_script('pdfp-dashboard-script', PDFPRO_PLUGIN_DIR . 'build/dashboard.js', array_merge($asset_file['dependencies'], ['react-dom']), $asset_file['version'], true);
				
				wp_localize_script('pdfp-dashboard-script', 'pdfpDashboard', [
					'dir' => PDFPRO_PLUGIN_DIR,
				]);
			}
		}

		public function adminMenu() {
			// Slug deliberately starts with 'pdf-poster' so it matches the
			// strpos($hook, 'pdf-poster') test in adminEnqueueScripts() and picks up the
			// dashboard bundle without a second condition to keep in step.
			add_submenu_page(
				'edit.php?post_type=pdfposter',
				__('Analytics', 'pdf-poster'),
				__('Analytics', 'pdf-poster') . $this->proBadge(),
				'edit_others_posts',
				'pdf-poster-analytics',
				[$this, 'analyticsPage'],
				14
			);

			add_submenu_page(
				'edit.php?post_type=pdfposter',
				__('Demo and Help', 'pdf-poster'),
				'<span style="color: #f18500;">' . __('Demo and Help', 'pdf-poster') . '</span>',
				'edit_others_posts',
				'pdf-poster',
				[$this, 'dashboardPage'],
				15
			);
		}

		/**
		 * "PRO" chip for the admin menu label.
		 *
		 * Styled inline rather than through admin.scss: the menu renders on every screen
		 * in wp-admin, so the chip stays correct even if the stylesheet's scope is ever
		 * narrowed. Colour and shape match .pdfp-pro-badge (#146ef5, square).
		 */
		private function proBadge() {
			return ' <span style="display:inline-block;background:#146ef5;color:#fff;'
				. 'font-size:9px;font-weight:600;line-height:1;padding:2px 5px;margin-left:4px;'
				. 'text-transform:uppercase;letter-spacing:.04em;vertical-align:middle;'
				. 'border-radius:0;">' . esc_html__('Pro', 'pdf-poster') . '</span>';
		}

		public function dashboardPage() { 
			?>
			<div id='pdfpAdminDashboard' data-info='<?php echo esc_attr(wp_json_encode([
														'version' => PDFPRO_VER,
														'isPremium' => false,
														'hasPro' => false,
														// Trailing slash trimmed: every consumer in
														// src/dashboard/utils/data.js appends its own
														// '/wp-admin'-relative path.
														'adminUrl' => rtrim(admin_url(), '/'),
														'licenseActiveNonce' => wp_create_nonce('bPlLicenseActivation')
													])); ?>'></div>
			<?php
		}	

		/**
		 * PDF Poster > Analytics.
		 *
		 * Its own submenu rather than a link into the Demo and Help dashboard, so WordPress
		 * highlights the right item in the sidebar. Renders from the same bundle -- a
		 * separate mount id is all that distinguishes it. Counting itself is Pro, so what
		 * this screen shows is what the feature does and what upgrading turns on.
		 */
		public function analyticsPage() {
			?>
			<div id='pdfpAnalyticsPage' data-info='<?php echo esc_attr(wp_json_encode([
														'version' => PDFPRO_VER,
														'isPremium' => false,
														'hasPro' => false,
														'adminUrl' => rtrim(admin_url(), '/'),
													])); ?>'></div>
			<?php
		}

		public function upgradePage() { 
			?>
			<div id='pdfpAdminUpgrade' data-info='<?php echo esc_attr(wp_json_encode([
														'version' => PDFPRO_VER,
														'isPremium' => false,
														'hasPro' => false
													])); ?>'>Coming soon...</div>
			<?php
		}

	}
    new PDFP_AdminLoader();
}
