import {DataLensApiError} from 'typings';

export type ErrorItem = {
    error: DataLensApiError;
    itemIndex: number;
};
