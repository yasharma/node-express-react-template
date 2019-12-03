export interface IPaginate {
  dataCount: number;
  pageSize: number;
  handlePageChange: (index: number) => void;
};