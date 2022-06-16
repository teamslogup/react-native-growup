export interface Terms {
  _id: string;
  esnt_clau_yn: boolean;
  clau_cd: string;
  clau_nm: string;
  clau_ctts: string;
  clau_strt_date: string;
  clau_vrsn_val: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMPCertificationResponse {
  imp_uid: string;
  success: 'true' | 'false';
}
