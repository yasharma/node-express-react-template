/**
 * Copyright (c) 2014-2018, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * Basic sample plugin inserting abbreviation elements into the CKEditor editing area.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/ckeditor4/docs/#!/guide/plugin_sdk_sample_1
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'mathquill', {

	// Register the icons.
	icons: 'mathquill',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
        // var pluginDirectory = this.path;
        // editor.addContentsCss( pluginDirectory + 'mathquill-0.10.1/mathquill.css' );

		// Define an editor command that opens our dialog window.
		editor.addCommand( 'mathquill', new CKEDITOR.dialogCommand( 'mathquillDialog' ) );

		// Create a toolbar button that executes the above command.
		editor.ui.addButton( 'Math', {

			// The text part of the button (if available) and the tooltip.
			label: 'Insert Math',

			// The command to execute on click.
			command: 'mathquill',

			// The button placement in the toolbar (toolbar group name).
			toolbar: 'insert'
		});

		if ( editor.contextMenu ) {
			
			// Add a context menu group with the Edit Abbreviation item.
			editor.addMenuGroup( 'mathquillGroup' );
			editor.addMenuItem( 'mathquillItem', {
				label: 'Edit Math',
				icon: this.path + 'icons/mathquill.png',
				command: 'mathquill',
				group: 'mathquillGroup'
			});

			editor.contextMenu.addListener( function( element ) {
				if ( element.getAscendant( 'mathquill', true ) ) {
					return { mathquillItem: CKEDITOR.TRISTATE_OFF };
				}
			});
		}


		// Register our dialog file -- this.path is the plugin folder path.
        CKEDITOR.dialog.add( 'mathquillDialog', this.path + 'dialogs/mathquill.js' );
	}
});
