<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$required_files = [
    'includes/helper/functions.php',
    'includes/admin/class-pdfp-admin.php', 
    'includes/base/class-pdfp-registerblock.php',
    'includes/base/class-pdfp-licenseactivation.php',
];

foreach ($required_files as $file) {
    if(file_exists(PDFPRO_PATH . $file)) {
        require_once(PDFPRO_PATH . $file);
    }
}
