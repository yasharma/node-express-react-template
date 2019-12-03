import React, { useState } from 'react';
import Storage from '../utils/Storage';
import csvp from 'papaparse';
import { IQuestion } from '../models/IQuestion';
import { Button } from 'reactstrap';
export const Export = () => {
  const [link, setLink] = useState<string>();
  const onExport: React.MouseEventHandler<HTMLButtonElement> = () => {
    const data: IQuestion[] = Storage.get('csv');
    const csv = csvp.unparse(data);
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    setLink(url);
  }
  return (
    <Button className="mt-3" tag="a" href={link} download="questions.csv" onClick={onExport}>Export</Button>
  )
}