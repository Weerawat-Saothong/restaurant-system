export interface MenuListRes {
    meta: any;
    items: any;
  }
  export interface MenuListReq {
    page: string;
    limit: string;
    sort?: string;
    search?: string;
    project_id?: string;
  }