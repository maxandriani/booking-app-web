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
  let queryStr = '';
  
  if (query !== undefined) {
    var queryParser = new URLSearchParams();
    for (const [k, v] of Object.entries(query))
      queryParser.append(k, v.toString());
    queryStr = `?${queryParser.toString()}`;
  }
  
  return fetch(`${env.REACT_APP_API_HOST}/api/v1/places${queryStr}`, { signal })
    .then(async res => ({
      items: await res.json(),
      count: parseInt(res.headers.get('x-total-count') ?? '0')
    }));
}

/**
 * Get one place by id
 * @param id 
 * @param signal 
 * @returns 
 */
export async function getPlaceByKey(id: string, signal?: AbortSignal): Promise<IPlaceResponse> {
  return fetch(`${env.REACT_APP_API_HOST}/api/v1/places/${id}`, { signal })
    .then(res => res.json());
}

/**
 * Create a new place
 */
export async function createPlace(place: ICreateUpdatePlaceBody, signal?: AbortSignal): Promise<IPlaceResponse> {
  return fetch(`${env.REACT_APP_API_HOST}/api/v1/places`, { signal, body: JSON.stringify(place), method: 'post', headers: { 'Content-Type': 'application/json' } })
    .then(res => res.json());
}

/**
 * Update data from some existing place
 * @param id 
 * @param body 
 * @param signal 
 * @returns 
 */
export async function updatePlace(id: string, body: ICreateUpdatePlaceBody, signal?: AbortSignal): Promise<IPlaceResponse> {
  return fetch(`${env.REACT_APP_API_HOST}/api/v1/places/${id}`, { signal, body: JSON.stringify(body), method: 'put', headers: { 'Content-Type': 'application/json' } })
    .then(res => res.json());
}

/**
 * Delete permanently one place
 * @param id 
 * @param signal 
 * @returns 
 */
export async function deletePlace(id: string, signal?: AbortSignal): Promise<void> {
  return fetch(`${env.REACT_APP_API_HOST}/api/v1/places/${id}`, { signal, method: 'delete' })
    .then(() => undefined);
}
