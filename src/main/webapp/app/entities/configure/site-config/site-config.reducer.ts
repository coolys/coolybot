import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-coolybot';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ISiteConfig, defaultValue } from 'app/shared/model/configure/site-config.model';

export const ACTION_TYPES = {
  SEARCH_SITECONFIGS: 'siteConfig/SEARCH_SITECONFIGS',
  FETCH_SITECONFIG_LIST: 'siteConfig/FETCH_SITECONFIG_LIST',
  FETCH_SITECONFIG: 'siteConfig/FETCH_SITECONFIG',
  CREATE_SITECONFIG: 'siteConfig/CREATE_SITECONFIG',
  UPDATE_SITECONFIG: 'siteConfig/UPDATE_SITECONFIG',
  DELETE_SITECONFIG: 'siteConfig/DELETE_SITECONFIG',
  RESET: 'siteConfig/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISiteConfig>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SiteConfigState = Readonly<typeof initialState>;

// Reducer

export default (state: SiteConfigState = initialState, action): SiteConfigState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SITECONFIGS):
    case REQUEST(ACTION_TYPES.FETCH_SITECONFIG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SITECONFIG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SITECONFIG):
    case REQUEST(ACTION_TYPES.UPDATE_SITECONFIG):
    case REQUEST(ACTION_TYPES.DELETE_SITECONFIG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_SITECONFIGS):
    case FAILURE(ACTION_TYPES.FETCH_SITECONFIG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SITECONFIG):
    case FAILURE(ACTION_TYPES.CREATE_SITECONFIG):
    case FAILURE(ACTION_TYPES.UPDATE_SITECONFIG):
    case FAILURE(ACTION_TYPES.DELETE_SITECONFIG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SITECONFIGS):
    case SUCCESS(ACTION_TYPES.FETCH_SITECONFIG_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SITECONFIG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SITECONFIG):
    case SUCCESS(ACTION_TYPES.UPDATE_SITECONFIG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SITECONFIG):
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

const apiUrl = 'configure/api/site-configs';
const apiSearchUrl = 'configure/api/_search/site-configs';

// Actions

export const getSearchEntities: ICrudSearchAction<ISiteConfig> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_SITECONFIGS,
  payload: axios.get<ISiteConfig>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<ISiteConfig> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SITECONFIG_LIST,
    payload: axios.get<ISiteConfig>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISiteConfig> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SITECONFIG,
    payload: axios.get<ISiteConfig>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISiteConfig> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SITECONFIG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISiteConfig> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SITECONFIG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISiteConfig> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SITECONFIG,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
