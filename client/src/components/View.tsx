import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Storage from '../utils/Storage';
import { IQuestion } from '../models/IQuestion';
import CKEditor from './ckeditor';
import convertToCKEditorFormatedXHTML from './ckeditor/convertToCKEditorFormatedXHTML';

import {
    Card,
    CardHeader,
    CardText,
    CardBody,
    Button,
    Col,
    Row
} from 'reactstrap';

const EditingValueNames = {
    NONE: 'none',
    CONTENT: 'question_text',
    OPTION_A: 'option_A',
    OPTION_B: 'option_B',
    OPTION_C: 'option_C',
    OPTION_D: 'option_D',
    HINT: 'hint',
    JUSTIFICATION: 'justification'
};

interface Identifiable { id: string; }
interface EditorState { editingValue: string }
export class View extends React.Component<RouteComponentProps<Identifiable>, EditorState> {
    state: EditorState = {
        editingValue: EditingValueNames.NONE,
    }

    encodeHints(strHints){
        strHints = strHints.split('|~|').join('');
        strHints = strHints.replace(new RegExp ("<p>", "g"), "<li>" );
        strHints = strHints.replace(new RegExp ("</p>", "g"), "</li>" );
        if(strHints.indexOf('<ol>') ==  -1)
        strHints = '<ol>' + strHints + '</ol>';
        return strHints;
    }

    decodeHints(strHints){
        strHints = strHints.replace(new RegExp ("<li>", "g"), "|~|<p>" );
        strHints = strHints.replace(new RegExp ("</li>", "g"), "</p>" );
        strHints = strHints.replace(new RegExp ("<ol>", "g"), "" );
        strHints = strHints.replace(new RegExp ("</ol>", "g"), "" );
        if(strHints.indexOf('|~|') > 0){
            strHints = strHints.substr(5, strHints.kength);
        }
        return strHints;
    }

    render() {
        const { match: { params } } = this.props;
        const _data: IQuestion[] = Storage.get('csv');
        const row = _data.find((question: IQuestion) => question.id === params.id);
        
        if (!row) {
            return (
                <div className="container mt-5">
                    <Card>
                        <CardHeader>Empty Storage</CardHeader>
                        <CardBody>
                            <CardText>No data found</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }

        const action = (val: IQuestion) => {
            editMe(EditingValueNames.CONTENT);
        }

        const editMe = (editingValue: string) => {
            this.setState(prevState => ({
                editingValue: editingValue
            }));

        }

        const udpateData = (updatedQuestion: IQuestion) => {
            const _data: IQuestion[] = Storage.get('csv');
            const updatedData: IQuestion[] = _data.map((question: IQuestion) => {
                return question.id === updatedQuestion.id ? updatedQuestion : question;
            });
            Storage.set('csv',updatedData);
        };

        const onChangeValue = (updatedValue) => {

            const updatedValueName = this.state.editingValue;
            updatedValue = this.decodeHints(updatedValue);

            let updatedValueWithoutPluginTags = updatedValue.replace('<mathquill>','');
            updatedValueWithoutPluginTags = updatedValueWithoutPluginTags.replace('</mathquill>','');

            const updatedRow : IQuestion = { ...row, [updatedValueName]: updatedValueWithoutPluginTags };
            udpateData(updatedRow);
            this.setState(prevState => ({
                editingValue: updatedValueName,
            }));

        }

        const contentsToEdit = {
            [EditingValueNames.NONE]: '',
            [EditingValueNames.CONTENT]: row.question_text,
            [EditingValueNames.OPTION_A]: row.option_A,
            [EditingValueNames.OPTION_B]: row.option_B,
            [EditingValueNames.OPTION_C]: row.option_C,
            [EditingValueNames.OPTION_D]: row.option_D,
            [EditingValueNames.HINT]: this.encodeHints(row.hint),
            [EditingValueNames.JUSTIFICATION]: row.justification,
        };

        
        const editingValueName = this.state.editingValue;
        const currentContentToEdit = contentsToEdit[editingValueName];
        const ckEditorFormatedXHTMLString = convertToCKEditorFormatedXHTML(currentContentToEdit);
        const renderEditor = (
            <CKEditor
                data={ckEditorFormatedXHTMLString}
                config={{
                    extraPlugins: 'mathquill',
                    allowedContent: true,
                    toolbarGroups: [
                        { name: 'clipboard', groups: ['clipboard', 'undo'] },
                        { name: 'insert' },
                        { name: 'document', groups: ['mode'] },
                        '/',
                        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                        { name: 'paragraph', groups: ['list'] },
                        { name: 'styles' }
                    ],
                    removePlugins: 'font,iframe,pagebreak,flash,stylescombo,print,preview,save,smiley,pastetext,pastefromword',
                    removeButtons: 'Paste,Indent,Copy,Cut,ImageButton,Image,Anchor,Font,Strike,Subscript,Superscript'
                }}
                type={'replace'}
                onChange={data => {
                    // console.log('data = ', data);
                    onChangeValue(data);
                }}
            />
        );

        const { editingValue } = this.state;
        const OptionView = ({ title, value, isSelected, valueName }) => (
            <Col sm="3" >
                <Card style={isSelected ? Styles.selected : {}}>
                    <CardHeader>
                        {title}
                        <Button
                            className={"float-right"}
                            size="sm"
                            onClick={() => editMe(valueName)}
                        >
                            {'Edit'}
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <CardText dangerouslySetInnerHTML={{ __html: value }}></CardText>
                    </CardBody>
                </Card>
            </Col>
        );

        return (
            <div className="container mt-5 mq-disabled">
                <div className={'mt-5 mb-5'}>
                    {renderEditor}
                </div>
                <Card style={editingValue === EditingValueNames.CONTENT ? Styles.selected : {}}>
                    <CardHeader>Question Text <Button className="float-right" size="sm" onClick={() => editMe(EditingValueNames.CONTENT)}>Edit</Button></CardHeader>
                    <CardBody>
                        <CardText dangerouslySetInnerHTML={{ __html: contentsToEdit[EditingValueNames.CONTENT] }}></CardText>
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <OptionView
                        title={'Option (1)'}
                        value={contentsToEdit[EditingValueNames.OPTION_A]}
                        isSelected={editingValue === EditingValueNames.OPTION_A}
                        valueName={EditingValueNames.OPTION_A}
                    />
                    <OptionView
                        title={'Option (2)'}
                        value={contentsToEdit[EditingValueNames.OPTION_B]}
                        isSelected={editingValue === EditingValueNames.OPTION_B}
                        valueName={EditingValueNames.OPTION_B}
                    />
                    <OptionView
                        title={'Option (3)'}
                        value={contentsToEdit[EditingValueNames.OPTION_C]}
                        isSelected={editingValue === EditingValueNames.OPTION_C}
                        valueName={EditingValueNames.OPTION_C}
                    />
                    <OptionView
                        title={'Option (4)'}
                        value={contentsToEdit[EditingValueNames.OPTION_D]}
                        isSelected={editingValue === EditingValueNames.OPTION_D}
                        valueName={EditingValueNames.OPTION_D}
                    />
                </Row>

                <Card className="mt-3 mb-3" style={editingValue === EditingValueNames.JUSTIFICATION ? Styles.selected : {}}>
                    <CardHeader>Justification <Button className="float-right" size="sm" onClick={() => editMe(EditingValueNames.JUSTIFICATION)}>Edit</Button></CardHeader>
                    <CardBody>
                        <CardText dangerouslySetInnerHTML={{ __html: contentsToEdit[EditingValueNames.JUSTIFICATION] }}></CardText>
                    </CardBody>
                </Card>

                <Card className="mt-3 mb-3" style={editingValue === EditingValueNames.HINT ? Styles.selected : {}}>
                    <CardHeader>Hint <Button className="float-right" size="sm" onClick={() => editMe(EditingValueNames.HINT)}>Edit</Button> </CardHeader>
                    <CardBody>
                        <CardText dangerouslySetInnerHTML={{ __html: contentsToEdit[EditingValueNames.HINT] }}></CardText>
                    </CardBody>
                </Card>
                
            </div>
        );
    }
}

const Styles = {
    selected: {
        backgroundColor: 'rgba(255, 251, 221, 0.9)',
    }
}