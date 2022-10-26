import { collectionRequest } from "../commons/services/fetch-utils";
import { env } from "../env";
import { ICollectionResponse, IPlaceResponse } from "./places-api";

export interface ISearchAvailablePlacesQuery {
  checkIn: Date;
  checkOut: Date;
  take?: number;
  skip?: number;
  sortBy?: string;
}

export function searchAvailablePlaces(query: ISearchAvailablePlacesQuery, abort?: AbortSignal): Promise<ICollectionResponse<IPlaceResponse>> {
  return collectionRequest(`${env.REACT_APP_API_HOST}/api/v1/search`, query, abort);
}