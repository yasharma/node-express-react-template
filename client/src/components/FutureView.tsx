import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Storage from '../utils/Storage';
import { IQuestion } from '../models/IQuestion';

import {
    Card,
    CardHeader,
    CardText,
    CardBody,
    Button,
    Col,
    Row
} from 'reactstrap';
import { ContentEditor } from './ContentEditor';

const EditingValueNames = {
    NONE: 'none',
    CONTENT: 'question_text',
    OPTION_A: 'option_A',
    OPTION_B: 'option_B',
    OPTION_C: 'option_C',
    OPTION_D: 'option_D',
};

interface Identifiable { id: string; }
export const View = (mathedRoute: RouteComponentProps<Identifiable>) => {
    const [editableText, setEditableText] = useState<string>('');
    const [key, setKey] = useState<string>('');
    const [row, setRow] = useState<IQuestion>();
    const { match: { params } } = mathedRoute;
    const _data: IQuestion[] = Storage.get('csv');
    const _row = _data.find((question: IQuestion) => question.id === params.id);
    
    
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

    const onEdit = (text: string, key: string) => {
        setEditableText(text);
        setKey(key);
    }

    const OptionView = ({ title, value, valueName, func }) => (
        <Col sm="3" >
            <Card >
                <CardHeader>
                    {title}
                    <Button
                        className={"float-right"}
                        size="sm"
                        onClick={func}
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
                <ContentEditor row={row} keyName={key} text={editableText} />
            </div>
            <Card >
                <CardHeader>Question Text <Button className="float-right" size="sm" onClick={() => onEdit(row.question_text, 'question_text')}>Edit</Button></CardHeader>
                <CardBody>
                    <CardText dangerouslySetInnerHTML={{ __html: row.question_text }}></CardText>
                </CardBody>
            </Card>
            <Row className="mt-3">
                <OptionView
                    title={'Option (1)'}
                    value={row.option_A}

                    valueName={EditingValueNames.OPTION_A}
                    func={() => onEdit(row.option_A, 'option_A')}
                />
                <OptionView
                    title={'Option (2)'}
                    value={row.option_B}

                    valueName={EditingValueNames.OPTION_B}
                    func={() => onEdit(row.option_B, 'option_B')}
                />
                <OptionView
                    title={'Option (3)'}
                    value={row.option_C}

                    valueName={EditingValueNames.OPTION_C}
                    func={() => onEdit(row.option_C, 'option_C')}
                />
                <OptionView
                    title={'Option (4)'}
                    value={row.option_D}

                    valueName={EditingValueNames.OPTION_D}
                    func={() => onEdit(row.option_D, 'option_D')}
                />
            </Row>
        </div>
    );

}

const Styles = {
    selected: {
        backgroundColor: 'rgba(255, 251, 221, 0.9)',
    }
}