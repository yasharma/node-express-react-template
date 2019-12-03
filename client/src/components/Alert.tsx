import React from 'react';
import { Alert } from 'reactstrap';
import { IAlert } from '../models/IAlert';

export const AlertMessage = ({ color, errors, visible, onDismiss }: IAlert) => {
  return (
    <div className="container mt-3">
      {errors.map((error, index) =>
        <Alert key={index} isOpen={visible} color={color} toggle={onDismiss}> {error.message} </Alert>
      )}
    </div>
  )
}