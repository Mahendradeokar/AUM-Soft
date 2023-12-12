export type TCommonAPICallHandler = {
  url: string;
  method: string;
  data?: object;
};

export type TCommonAPIResponse = {
  data?: object;
  status_code?: number;
  status_message?: string;
  response_error?: boolean;
  token?: string;
  refreshToken?: string;
};
