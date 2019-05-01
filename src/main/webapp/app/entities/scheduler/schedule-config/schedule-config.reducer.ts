import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-coolybot';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IScheduleConfig, defaultValue } from 'app/shared/model/scheduler/schedule-config.model';

export const ACTION_TYPES = {
  SEARCH_SCHEDULECONFIGS: 'scheduleConfig/SEARCH_SCHEDULECONFIGS',
  FETCH_SCHEDULECONFIG_LIST: 'scheduleConfig/FETCH_SCHEDULECONFIG_LIST',
  FETCH_SCHEDULECONFIG: 'scheduleConfig/FETCH_SCHEDULECONFIG',
  CREATE_SCHEDULECONFIG: 'scheduleConfig/CREATE_SCHEDULECONFIG',
  UPDATE_SCHEDULECONFIG: 'scheduleConfig/UPDATE_SCHEDULECONFIG',
  DELETE_SCHEDULECONFIG: 'scheduleConfig/DELETE_SCHEDULECONFIG',
  RESET: 'scheduleConfig/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IScheduleConfig>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ScheduleConfigState = Readonly<typeof initialState>;

// Reducer

export default (state: ScheduleConfigState = initialState, action): ScheduleConfigState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SCHEDULECONFIGS):
    case REQUEST(ACTION_TYPES.FETCH_SCHEDULECONFIG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SCHEDULECONFIG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SCHEDULECONFIG):
    case REQUEST(ACTION_TYPES.UPDATE_SCHEDULECONFIG):
    case REQUEST(ACTION_TYPES.DELETE_SCHEDULECONFIG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_SCHEDULECONFIGS):
    case FAILURE(ACTION_TYPES.FETCH_SCHEDULECONFIG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SCHEDULECONFIG):
    case FAILURE(ACTION_TYPES.CREATE_SCHEDULECONFIG):
    case FAILURE(ACTION_TYPES.UPDATE_SCHEDULECONFIG):
    case FAILURE(ACTION_TYPES.DELETE_SCHEDULECONFIG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SCHEDULECONFIGS):
    case SUCCESS(ACTION_TYPES.FETCH_SCHEDULECONFIG_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCHEDULECONFIG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SCHEDULECONFIG):
    case SUCCESS(ACTION_TYPES.UPDATE_SCHEDULECONFIG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SCHEDULECONFIG):
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

const apiUrl = 'scheduler/api/schedule-configs';
const apiSearchUrl = 'scheduler/api/_search/schedule-configs';

// Actions

export const getSearchEntities: ICrudSearchAction<IScheduleConfig> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_SCHEDULECONFIGS,
  payload: axios.get<IScheduleConfig>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IScheduleConfig> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SCHEDULECONFIG_LIST,
    payload: axios.get<IScheduleConfig>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IScheduleConfig> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SCHEDULECONFIG,
    payload: axios.get<IScheduleConfig>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IScheduleConfig> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SCHEDULECONFIG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IScheduleConfig> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SCHEDULECONFIG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IScheduleConfig> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SCHEDULECONFIG,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
