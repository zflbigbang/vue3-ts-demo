export class InitData {
    selectData: SelectDataInt = {
      records: [],
      total: 0,
      size: 10,
      current: 1,
      orders: [],
      optimizeCountSql: true,
      searchCount: true,
      countId: null,
      maxLimit: null,
      pages: 1
    }
  }
  export interface PostRecord {
    id: number;
    starttime: string;
    userId: number;
    ispass: number;
    isend: number;
    timecoin: number;
    volunteers: number;
    content: string;
  }
  
  export interface SelectDataInt {
    records: PostRecord[];
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: any;
    maxLimit: any;
    pages: number;
  }
