import React from 'react';
import { Table } from 'reactstrap';
import { IQuestion } from '../models/IQuestion';
import { ActionList } from './ActionList';
import { isValidPattern } from './Helper';

export const TableList = ({list}:{list: IQuestion[]}) => {
  
  return (
    <Table className="mt-3" size="sm" bordered responsive hover>
      <thead className="thead-dark">
        <tr>
          <th>id</th>
          <th>Question</th>
          <th>subject</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map((row: IQuestion, index: number) => {
            return (
              <tr key={index} className={isValidPattern(row) ? 'table-danger' : ''}>
                <th scope="row">{row.id}</th>
                <td dangerouslySetInnerHTML={{__html: row.question_text}}></td>
                <td>{row.subject}</td>
                <td><ActionList id={row.id}/></td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}