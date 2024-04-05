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
  export interface UserRecord {
    id: number;
    age: number;
    password:string;
    sex: number;
    name: string;
    timecoin: number;
    email: string;
  }
  
  export interface SelectDataInt {
    records: UserRecord[];
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
