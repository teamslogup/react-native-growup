import axios from 'axios';

type InstanceType = 'carpet' | 'kakao';

const baseURLs: Record<InstanceType, string> = {
  carpet: 'https://api-dev.the-carpet.co.kr/apis/v1',
  kakao: 'https://dapi.kakao.com/v2',
};

type CreateInstanceConfig = {
  type: InstanceType;
  withCredentials?: boolean;
};

const createInstance = (config: CreateInstanceConfig) => {
  const { type, withCredentials = false } = config;

  return axios.create({ baseURL: baseURLs[type], withCredentials });
};

export const carpetAxios = createInstance({
  type: 'carpet',
  withCredentials: true,
});

export const kakaoAxios = createInstance({ type: 'kakao' });
