/**
 * Copyright (c) 2014-2018, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * The mathquill plugin dialog window definition.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/ckeditor4/docs/#!/guide/plugin_sdk_sample_1
 */

var States = {
    MATH: "MATH",
    LATEX: "LATEX",
    NONE: "NONE",
};
var updatingState = States.NONE;
var newMQ = MathQuill.getInterface(2);

var mathEditField;
var configureMathField = function (latex = "") {
    if (!mathEditField) {
        var htmlElement = document.getElementById('jj');
        var config = {
            handlers: {
                edit: function (mathField) {
                    console.log("updated");
                    var latexFieldValue = document.getElementById('mathquill').value;
                    var currentLatex = mathField.latex();
                    console.log('latexFieldValue', latexFieldValue);
                    console.log('currentLatex', currentLatex);

                    if (updatingState !== States.LATEX) document.getElementById('mathquill').value = currentLatex;
                }
            },
            restrictMismatchedBrackets: false
        };
        mathEditField = newMQ.MathField(htmlElement, config);

        const htmlStaticElement = document.createElement("div");
        htmlStaticElement.display = 'none';
        htmlStaticElement.className = 'math-convert';
        htmlStaticElement.id = 'ck-math-convert';
        document.body.appendChild(htmlStaticElement);
    }
};

var convertLatexToStaticMathHtml = function (latex) {

    const htmlElement = document.getElementsByClassName('math-convert');
    if (htmlElement.length === 0) return latex;
    htmlElement[0].innerHTML = '<span class="equ" contenteditable="false">' + latex + '</span>';
    const problems = document.getElementsByClassName("equ");
    for (let el = 0; el < problems.length; el++) {
        newMQ.StaticMath(problems[el]);
    }
    const staticHtml = htmlElement[0].innerHTML;
    htmlElement[0].innerHTML = '';
    return staticHtml;
};

var onLatexFieldFocusOut = function () {
    updatingState = States.MATH;
};
var onLatexFieldFocus = function () {
    updatingState = States.LATEX;
};

var onLatexChange = function (event) {
    var latex = document.getElementById('mathquill').value;
    if (updatingState !== States.MATH) {
        configureMathField()
        console.log('setLatex', latex);
        mathEditField.latex(latex);
    }
}


var setNewLatex = function(latex){
    var latexField = document.getElementById('mathquill');
    latexField.value = latex;
    mathEditField.latex(latex);
}



// Our dialog definition.
CKEDITOR.dialog.add('mathquillDialog', function (editor) {
    return {

        // Basic properties of the dialog window: title, minimum size.
        title: 'Latex editor',
        minWidth: 400,
        minHeight: 200,

        // Dialog window content definition.
        contents: [
            {
                // Definition of the Basic Settings dialog tab (page).
                id: 'tab-basic',
                label: 'Basic Settings',

                // The tab content.
                elements: [
                    {
                        // Text input field for the mathquilleviation text.
                        id: 'mathquill',
                        type: 'html',
                        html: '<div>Latex</div><textarea cols="40" wrap="hard" style="font-size:16px; width: 100%; min-height:100px; border: solid 1px #afafaf;" id="mathquill"  onkeyup="onLatexChange()" onfocus="onLatexFieldFocus()" onfocusout="onLatexFieldFocusOut()"></textarea>',
                        // Validation checking whether the field is not empty.
                        // validate: CKEDITOR.dialog.validate.notEmpty("mathquill field cannot be empty."),

                        // Called by the main setupContent method call on dialog initialization.
                        setup: function (element) {
                            // this.setValue( element.getText() );
                            console.log('in setup', element);
                            var htmlElement = document.getElementById('mathquill');
                            htmlElement.value = '';
                            // if(this.insertMode === false) 
                            // const strHtml = 
                            // htmlElement.value = element.html
                            // this.getIn
                        },

                        // Called by the main commitContent method call on dialog confirmation.
                        commit: function (element) {
                            console.log('in commit', element);

                        }
                    },
                    {
                        // Text input field for the mathquill title (explanation).
                        id: 'jj',
                        type: 'html',
                        html: '<div>Math</div><span id="math-wrapper" style="ext-align: center; font-size: 16px;" ><div id="jj" style="width: 100%; min-height:100px; font-size:16px; border: solid 1px #afafaf;"></div></span>',
                        // validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty."),

                        // Called by the main setupContent method call on dialog initialization.
                        setup: function (element) {

                            
                            // this.setValue(element.getAttribute("title"));
                        },

                        // Called by the main commitContent method call on dialog confirmation.
                        commit: function (element) {
                            var latextElement = document.getElementById('mathquill');
                            var latexStr = latextElement.value;
                            mathEditField.revert();
                            mathEditField = null;
                            var staticMathString = convertLatexToStaticMathHtml(latexStr);
                            console.log(staticMathString);
                            element.setHtml(staticMathString);
                            var htmlElement = document.getElementById('mathquill');
                            htmlElement.value = '';
                            // alert(el.innerHTML);
                            // element.setAttribute("title", htmlElement.innerText);
                        }
                    }
                ]
            },

            // Definition of the Advanced Settings dialog tab (page).
            {
                id: 'tab-adv',
                label: 'Advanced Settings',
                elements: [
                    {
                        // Another text field for the mathquill element id.
                        type: 'text',
                        id: 'id',
                        label: 'Id',

                        // Called by the main setupContent method call on dialog initialization.
                        setup: function (element) {
                            this.setValue(element.getAttribute("id"));
                        },

                        // Called by the main commitContent method call on dialog confirmation.
                        commit: function (element) {
                            var id = this.getValue();
                            if (id)
                                element.setAttribute('id', id);
                            else if (!this.insertMode)
                                element.removeAttribute('id');
                        }
                    }
                ]
            }
        ],

        // Invoked when the dialog is loaded.
        onShow: function () {

            var selection = editor.getSelection();
            var element = selection.getStartElement();
            // Get the <mathquill> element closest to the selection, if it exists.
            if (element)
                element = element.getAscendant('mathquill', true);

            // Create a new <mathquill> element if it does not exist.
            if (!element || element.getName() != 'mathquill') {
                element = editor.document.createElement('mathquill');

                // Flag the insertion mode for later use.
                this.insertMode = true;
            }
            else
                this.insertMode = false;

            // Store the reference to the <mathquill> element in an internal property, for later use.
            this.element = element;

            // Invoke the setup methods of all dialog window elements, so they can load the element attributes.
            if (!this.insertMode){
                this.setupContent(this.element);
            }

            const {0: latextElement = {}} = element.$.getElementsByClassName('mq-selectable');
            const { innerText: scrappedLatex= ''} = latextElement;
            const latex = scrappedLatex.slice(1,-1);
            
            configureMathField(latex);
            setNewLatex(latex);

        },

        // This method is invoked once a user clicks the OK button, confirming the dialog.
        onOk: function () {
            console.log('onOK');
            // Create a new <mathquill> element.
            var mathquill = this.element;

            // Invoke the commit methods of all dialog window elements, so the <mathquill> element gets modified.
            this.commitContent(mathquill);

            // Finally, if in insert mode, insert the element into the editor at the caret position.
            if (this.insertMode)
                editor.insertElement(mathquill);
        }
    };
});
