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

	wp_enqueue_script(
		'mytheme-hero-mug',
		get_theme_file_uri( '/assets/js/hero-mug.js' ),
		array(),
		$theme->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue_styles' );

function mytheme_hero_mug_script_type( $tag, $handle, $src ) {
	if ( 'mytheme-hero-mug' !== $handle ) {
		return $tag;
	}

	return sprintf(
		'<script type="module" src="%s" id="%s-js"></script>' . "\n",
		esc_url( $src ),
		esc_attr( $handle )
	);
}
add_filter( 'script_loader_tag', 'mytheme_hero_mug_script_type', 10, 3 );

function mytheme_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'mytheme_editor_styles' );
