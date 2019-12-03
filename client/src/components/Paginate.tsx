import React, { PureComponent } from 'react';
import { ControlledPagination } from './ControlledPagination';
import { IPaginate } from '../models/IPaginate';

interface paginateState {
  currentPage: number;
  pagesCount: number;
  dataCount: number;
  pageSize: number;
}

class Paginate extends PureComponent<IPaginate, paginateState> {

  constructor(props: IPaginate) {
    super(props);
    this.state = {
      currentPage: 0,
      pagesCount: 0,
      dataCount: 0,
      pageSize: 50
    };
    this.updateState = this.updateState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dataCount, pageSize } = this.props;
    this.updateState(dataCount, pageSize);
  }

  componentWillReceiveProps(newProps: IPaginate) {
    const { dataCount, pageSize, handlePageChange } = newProps;
    if (dataCount !== this.state.dataCount) {
      this.updateState(dataCount, pageSize);
      this.setState({ currentPage: 0 });
      handlePageChange(0);
    }
  }

  updateState(dataCount: number, pageSize: number) {
    if (dataCount) this.setState({ pagesCount: Math.ceil(dataCount / this.state.pageSize), dataCount });
    if (pageSize) this.setState({ pageSize })
  }

  handleClick = (e: any, index: number) =>{
    const { handlePageChange } = this.props;
    e.preventDefault();
    this.setState({ currentPage: index });
    handlePageChange(index);
  }

  render() {
    const { currentPage, pagesCount } = this.state;
    return (
      <div className="pagination-wrapper">
        <ControlledPagination currentPage={currentPage} pagesCount={pagesCount} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default Paginate;