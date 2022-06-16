import { User } from '@src/data';

export interface BadReqeustResponse {
  rows: {
    domain: string;
    code: string;
    param: string;
    msg: string;
    value: string;
  }[];
  count: number;
}

export interface SignInParams {
  id: string;
  password: string;
}

export interface SignUpParams {
  user_eml_addr: string;
  user_encr_pwd?: string;
  impId: string;
  user_choc_clau_agrm?: string[];
  user_sns_crtf_info?: {
    sns_splr_nm: string;
    sns_id: string;
    acs_tkn_val: string;
    rfrs_tkn_val: string;
  }[];
  fcm_tkn_val?: string;
  bAcceptsSMSMarketing?: boolean;
  bAcceptsEmailMarketing?: boolean;
  bAcceptsPushMarketing?: boolean;
  submitted_code?: string;
}

export interface SignInSuccessResponse {
  row: {
    _id: string;
    tkn_val: string;
    user: User;
    user_ip_addr: string;
    plfm_nm: string;
    plfm_vrsn_val: string;
    os_nm: string;
    brws_nm: string;
    lgn_yn: boolean;
    admr_id: string;
    admr_nm: string;
    unread_noti_count: number;
    createdAt: string;
    updatedAt: string;
  };
}

export type SignUpSuccessResponse = SignInSuccessResponse;
