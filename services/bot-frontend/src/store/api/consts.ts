import type {EndpointBuilder} from '@reduxjs/toolkit/query';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {API_PREFIX, BASE_URL} from './../../consts';

export const reducerPath = 'api';

export const tagTypes = ['Todos'];

export const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/${API_PREFIX}`,
    prepareHeaders: (headers) => {
        headers.set('Accept', '*/*');

        return headers;
    },
});

export type TBuilder = EndpointBuilder<
    typeof baseQuery,
    (typeof tagTypes)[number],
    typeof reducerPath
>;
