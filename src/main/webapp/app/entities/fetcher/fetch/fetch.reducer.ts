import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-coolybot';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IFetch, defaultValue } from 'app/shared/model/fetcher/fetch.model';

export const ACTION_TYPES = {
  SEARCH_FETCHES: 'fetch/SEARCH_FETCHES',
  FETCH_FETCH_LIST: 'fetch/FETCH_FETCH_LIST',
  FETCH_FETCH: 'fetch/FETCH_FETCH',
  CREATE_FETCH: 'fetch/CREATE_FETCH',
  UPDATE_FETCH: 'fetch/UPDATE_FETCH',
  DELETE_FETCH: 'fetch/DELETE_FETCH',
  RESET: 'fetch/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFetch>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FetchState = Readonly<typeof initialState>;

// Reducer

export default (state: FetchState = initialState, action): FetchState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_FETCHES):
    case REQUEST(ACTION_TYPES.FETCH_FETCH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FETCH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FETCH):
    case REQUEST(ACTION_TYPES.UPDATE_FETCH):
    case REQUEST(ACTION_TYPES.DELETE_FETCH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_FETCHES):
    case FAILURE(ACTION_TYPES.FETCH_FETCH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FETCH):
    case FAILURE(ACTION_TYPES.CREATE_FETCH):
    case FAILURE(ACTION_TYPES.UPDATE_FETCH):
    case FAILURE(ACTION_TYPES.DELETE_FETCH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_FETCHES):
    case SUCCESS(ACTION_TYPES.FETCH_FETCH_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FETCH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FETCH):
    case SUCCESS(ACTION_TYPES.UPDATE_FETCH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FETCH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'fetcher/api/fetches';
const apiSearchUrl = 'fetcher/api/_search/fetches';

// Actions

export const getSearchEntities: ICrudSearchAction<IFetch> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_FETCHES,
  payload: axios.get<IFetch>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IFetch> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FETCH_LIST,
    payload: axios.get<IFetch>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IFetch> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FETCH,
    payload: axios.get<IFetch>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFetch> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FETCH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFetch> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FETCH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFetch> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FETCH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
