import { collectionRequest, createRequest, deleteRequest, getRequest, updateRequest } from "../commons/services/fetch-utils";
import { env } from "../env";
import { ICreateUpdateGuestContactBody, IGuestContactResponse } from "./guest-contact-api";
import { ICollectionResponse } from "./places-api";

export interface ISearchGuestQuery {
  search?: string;
  withContacts?: boolean;
  sortBy?: string;
  skip?: number;
  take?: number;
}

export interface IGuestWithContactsResponse {
  id: string;
  name: string;
  contacts: Array<IGuestContactResponse>;
}

export interface ICreateGuestWithContactsBody {
  contacts: Array<ICreateUpdateGuestContactBody>;
  name: string;
}

export interface IUpdateGuestBody {
  name: string;
}

export async function getGuestCollection(query?: ISearchGuestQuery, signal?: AbortSignal): Promise<ICollectionResponse<IGuestWithContactsResponse>> {
  return collectionRequest(`${env.REACT_APP_API_HOST}/api/v1/guests`, query, signal);
}

export async function getGuestByKey(id: string, signal?: AbortSignal): Promise<IGuestWithContactsResponse> {
  return getRequest(`${env.REACT_APP_API_HOST}/api/v1/guests/${id}`, signal);
}

export async function createGuest(body: ICreateGuestWithContactsBody, signal?: AbortSignal): Promise<IGuestWithContactsResponse> {
  return createRequest(`${env.REACT_APP_API_HOST}/api/v1/guests`, JSON.stringify(body), signal);
}

export async function updateGuest(id: string, body: IUpdateGuestBody, signal?: AbortSignal): Promise<IGuestWithContactsResponse> {
  return updateRequest(`${env.REACT_APP_API_HOST}/api/v1/guests/${id}`, JSON.stringify(body), signal);
}

export async function deleteGuest(id: string, signal?: AbortSignal): Promise<void> {
  return deleteRequest(`${env.REACT_APP_API_HOST}/api/v1/guests/${id}`, signal);
}

