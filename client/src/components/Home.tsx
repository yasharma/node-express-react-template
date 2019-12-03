import React, { useRef, useState } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Input } from 'reactstrap';
import csvp from 'papaparse';
import { CSV_FORMAT, isValidCsv } from './Helper';
import { AlertMessage } from './Alert';
import { IErrors } from '../models/IAlert';
import { IQuestion } from '../models/IQuestion';
import { TableList } from './TableList';
import Paginate from './Paginate';
import Storage from '../utils/Storage';
import { Export } from './Export';
import { useMathConverter } from './Hooks/useMathConverter';

export const Home = () => {
  const _data = Storage.get('csv');
  const fileInput = useRef(null);
  const [errors, setErrors] = useState<Array<IErrors>>([]);
  const [data, setData] = useState<Array<IQuestion>>(_data || []);
  const [isProcessing, setProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (!CSV_FORMAT.includes(file.type)) return setErrors([{ message: 'Invalid file type, upload csv file!' }]);
      setProcessing(true);
      csvp.parse(file, {
        complete: (result) => {
          if (!result) return setData([]);
          const { data, meta } = result;
          const _isValid = isValidCsv(meta.fields);
          if (_isValid) {
            setErrors([{ message: _isValid }]);
            setProcessing(false);
            return;
          }
          setErrors([]);
          const convertedData = useMathConverter(data);
          setData(convertedData);
          Storage.set('csv', convertedData);
          setProcessing(false);
        },
        error: (error) => {
          setErrors([{ message: error.message }]);
          setProcessing(false);
        },
        header: true,
        skipEmptyLines: true
      })
      event.target.value = '';
    }
  }

  const handlePageChange = (index: number) => setCurrentPage(index)

  const onDismiss = () => {
    setProcessing(false);
    setErrors([]);
  }

  return (
    <div className="container mt-5">
      <Card>
        <CardHeader>Question List</CardHeader>
        <AlertMessage visible={errors.length > 0} color="danger" errors={errors} onDismiss={onDismiss} />
        <CardBody>
          <CardTitle>Click below button to select the csv</CardTitle>
          <Input
            type="file"
            name="file"
            id="csvFile"
            ref={fileInput}
            onChange={handleChange}
            disabled={isProcessing}
          />
        </CardBody>
      </Card>
      {data.length > 0 && <Export />}
      {data.length > 0 && <TableList list={data.slice(currentPage * 50, (currentPage + 1) * 50)} />}
      {data.length > 0 && <Paginate dataCount={data.length} pageSize={50} handlePageChange={handlePageChange} />}
    </div>
  );
}