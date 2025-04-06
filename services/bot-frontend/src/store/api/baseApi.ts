import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery, reducerPath, tagTypes} from './consts';
import {endpoints, TEndpoints} from './endpoints.ts';

export const baseApi = createApi({
    reducerPath,
    baseQuery,
    tagTypes,
    endpoints: (builder): TEndpoints => {
        return <TEndpoints>Object.entries(endpoints).reduce((result, [key, endpointDefinition]) => {
            return {
                ...result,
                [key]: endpointDefinition(builder),
            };
        }, {});
    },
});