/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals window */

import React from 'react';
import PropTypes from 'prop-types';
import getEditorNamespace from './getEditorNamespace.js';
import Button from 'reactstrap/lib/Button';

class CKEditor extends React.Component {
	constructor( props ) {
		super( props );

		this.element = null;
        this.editor = null;
        this.saveMe = this.saveMe.bind(this);
    }
    
    // shouldComponentUpdate(nextProps, nextState){
    //     return true;
    // }
	componentDidMount() {
		this._initEditor();
	}

	componentWillUnmount() {
		this._destroyEditor();
	}

	componentDidUpdate( prevProps ) {
		const { props, editor } = this;

		/* istanbul ignore next */
		if ( !editor ) {
			return;
		}

		if ( prevProps.data !== props.data && editor.getData() !== props.data ) {
			editor.setData( props.data );
		}

		if ( prevProps.readOnly !== props.readOnly ) {
			editor.setReadOnly( props.readOnly );
		}

		if ( prevProps.style !== props.style ) {
			editor.container.setStyles( props.style );
		}

		this._attachEventHandlers( prevProps );
    }
    
    saveMe(){
        const { props: {onChange = ()=>{}}, editor} = this;
        const udpateData = editor.getData();
        onChange(udpateData);
    }

	render() {
        const {saveMe} = this;
        const wrapperStyles = {
            position: 'relative',
        };
        const buttonStyles = {
            position: 'absolute',
            right: 0,
            marginRight: '26px',
            marginTop: '22px',
        };
        return <div style={wrapperStyles}>
                <Button className="float-right" style={buttonStyles} size="sm" onClick={() => saveMe()}>Save</Button>
                <div contentEditable="true" style={ this.props.style } ref={ ref => ( this.element = ref ) }></div>
         </div>;
	}

	_initEditor() {
		this.props.config.readOnly = this.props.readOnly;

		getEditorNamespace( CKEditor.editorUrl ).then( CKEDITOR => {
			const constructor = this.props.type === 'inline' ? 'inline' : 'replace';

			const editor = this.editor = CKEDITOR[ constructor ]( this.element, this.props.config );

			this._attachEventHandlers();

			if ( this.props.style && this.props.type !== 'inline' ) {
				editor.on( 'loaded', () => {
					editor.container.setStyles( this.props.style );
				} );
			}

			if ( this.props.data ) {
				editor.setData( this.props.data );
			}
		} ).catch( window.console.error );
	}

	_attachEventHandlers( prevProps = {} ) {
		const props = this.props;

		Object.keys( this.props ).forEach( propName => {
			if ( !propName.startsWith( 'on' ) || prevProps[ propName ] === props[ propName ] ) {
				return;
			}

			this._attachEventHandler( propName, prevProps[ propName ] );
		} );
	}

	_attachEventHandler( propName, prevHandler ) {
		const evtName = `${ propName[ 2 ].toLowerCase() }${ propName.substr( 3 ) }`;

		if ( prevHandler ) {
			this.editor.removeListener( evtName, prevHandler );
		}

		this.editor.on( evtName, this.props[ propName ] );
	}

	_destroyEditor() {
		this.editor.destroy();

		this.editor = null;
		this.element = null;
	}
}

CKEditor.propTypes = {
	type: PropTypes.oneOf( [
		'classic',
		'inline',
		'replace'
	] ),
	data: PropTypes.string,
	config: PropTypes.object,
	style: PropTypes.object,
	readOnly: PropTypes.bool
};

CKEditor.defaultProps = {
	type: 'classic',
	data: '',
	config: {},
	readOnly: false
};

CKEditor.editorUrl = '/ckeditor-dev-release-4.1.x/ckeditor.js';

export default CKEditor;
