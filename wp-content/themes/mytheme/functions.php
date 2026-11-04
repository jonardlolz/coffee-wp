<?php
/**
 * Theme setup and assets.
 *
 * @package Mytheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load the theme stylesheet on the front end and in the block editor.
 */
function mytheme_enqueue_styles() {
	$theme = wp_get_theme();

	wp_enqueue_style(
		'mytheme-style',
		get_stylesheet_uri(),
		array(),
		$theme->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue_styles' );

function mytheme_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'mytheme_editor_styles' );
