import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type errorMessageType = FetchBaseQueryError & {
  data: {
    error: string;
  };
  status: string;
};
