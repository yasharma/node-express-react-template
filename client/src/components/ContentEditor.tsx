import React, { useState } from 'react';
import { IQuestion } from '../models/IQuestion';
import CKEditor from './ckeditor/index.jsx';
import Storage from '../utils/Storage';
import convertToCKEditorFormatedXHTML from './ckeditor/convertToCKEditorFormatedXHTML';

export const ContentEditor = ({ row, keyName, text }: { row: IQuestion, keyName: string, text: string }) => {

    const udpateData = (updatedQuestion: IQuestion) => {
        const _data: IQuestion[] = Storage.get('csv');
        const updatedData: IQuestion[] = _data.map((question: IQuestion) => {
            return question.id === updatedQuestion.id ? updatedQuestion : question;
        });
        Storage.set('csv',updatedData);
    };

    const onChangeValue = (updatedValue: string) => {
        console.log('updated value', updatedValue);
        let updatedValueWithoutPluginTags = updatedValue.replace('<mathquill>','');
        updatedValueWithoutPluginTags = updatedValueWithoutPluginTags.replace('</mathquill>','');
        console.log('removed mathquill plugin tag', updatedValueWithoutPluginTags);

        const updatedRow : IQuestion = { ...row, [keyName]: updatedValueWithoutPluginTags };
        console.log('updatedRow', updatedRow);
        udpateData(updatedRow);
    }

    const ckEditorFormatedXHTMLString = convertToCKEditorFormatedXHTML(text);
    return (
        <CKEditor
            data={ckEditorFormatedXHTMLString}
            config={{
                extraPlugins: 'mathquill',
                allowedContent: true,
                toolbarGroups: [
                    { name: 'clipboard', groups: ['clipboard', 'undo'] },
                    { name: 'links' },
                    { name: 'insert' },
                    { name: 'document', groups: ['mode'] },
                    '/',
                    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                    { name: 'paragraph', groups: ['list', 'indent'] },
                    { name: 'styles' },
                    { name: 'about' }
                ],
                removePlugins: 'font,iframe,pagebreak,flash,stylescombo,print,preview,save,smiley,pastetext,pastefromword',
                removeButtons: 'Anchor,Font,Strike,Subscript,Superscript'
            }}
            type={'replace'}
            onChange={(data: string) => onChangeValue(data) }
        />
    );
}