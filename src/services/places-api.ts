import { collectionRequest, createRequest, deleteRequest, getRequest, updateRequest } from "../commons/services/fetch-utils";
import { env } from "../env";

/**
 * Query string filters to get places collection
 */
export interface IGetPlacesQuery {
  search?: string;
  take?: number;
  skip?: number;
  sortBy?: string;
}

/**
 * Place standard response type
 */
export interface IPlaceResponse {
  id: string;
  name: string;
  address: string;
}

/**
 * Api collection response type.
 */
export interface ICollectionResponse<TResponse> {
  items: Array<TResponse>;
  count: number;
}

/**
 * Body data to create/update places
 */
export interface ICreateUpdatePlaceBody {
  name: string;
  address: string;
}

/**
 * Get all places by some criteria.
 * 
 * @param query 
 * @param signal 
 * @returns 
 */
export async function getPlacesCollection(query?: IGetPlacesQuery, signal?: AbortSignal): Promise<ICollectionResponse<IPlaceResponse>> {
  return collectionRequest(`${env.REACT_APP_API_HOST}/api/v1/places`, query, signal);
}

/**
 * Get one place by id
 * @param id 
 * @param signal 
 * @returns 
 */
export async function getPlaceByKey(id: string, signal?: AbortSignal): Promise<IPlaceResponse> {
  return getRequest(`${env.REACT_APP_API_HOST}/api/v1/places/${id}`, signal);
}

/**
 * Create a new place
 */
export async function createPlace(place: ICreateUpdatePlaceBody, signal?: AbortSignal): Promise<IPlaceResponse> {
  return createRequest(`${env.REACT_APP_API_HOST}/api/v1/places`, JSON.stringify(place), signal);
}

/**
 * Update data from some existing place
 * @param id 
 * @param body 
 * @param signal 
 * @returns 
 */
export async function updatePlace(id: string, body: ICreateUpdatePlaceBody, signal?: AbortSignal): Promise<IPlaceResponse> {
  return updateRequest(`${env.REACT_APP_API_HOST}/api/v1/places/${id}`, JSON.stringify(body), signal);
}

/**
 * Delete permanently one place
 * @param id 
 * @param signal 
 * @returns 
 */
export async function deletePlace(id: string, signal?: AbortSignal): Promise<void> {
  return deleteRequest(`${env.REACT_APP_API_HOST}/api/v1/places/${id}`, signal);
}
