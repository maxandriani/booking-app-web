import { coerceString } from "../commons/coerces";
import { collectionRequest, createRequest, deleteRequest, getRequest, updateRequest } from "../commons/services/fetch-utils";
import { env } from "../env";
import { ICollectionResponse } from "./places-api";

export enum GuestContactTypeEnum {
  Unknown = 0,
  Email = 1,
  Phone = 2
}

export interface IGuestContactResponse {
  id: string;
  guestId: string;
  type: GuestContactTypeEnum;
  value: string;
}

export interface ICreateUpdateGuestContactBody {
  type: GuestContactTypeEnum;
  value: string;
}

export interface ISearchGuestContactQuery {
  take?: number;
  skip?: number;
  sortBy?: string;
  search?: string;
}

export function getGuestContactCollection(guestId: string, query?: ISearchGuestContactQuery, signal?: AbortSignal): Promise<ICollectionResponse<IGuestContactResponse>> {
  return collectionRequest(`${env.REACT_APP_API_HOST}/api/v1/guests/${guestId}/contacts`, query, signal);
}

export function getGuestContactByKey(guestId: string, contactId: string, signal?: AbortSignal): Promise<IGuestContactResponse> {
  return getRequest(`${env.REACT_APP_API_HOST}/api/v1/guests/${guestId}/contacts/${contactId}`, signal);
}

export function createGuestContact(guestId: string, body: ICreateUpdateGuestContactBody, signal?: AbortSignal): Promise<IGuestContactResponse> {
  return createRequest(`${env.REACT_APP_API_HOST}/api/v1/guests/${guestId}/contacts`, JSON.stringify(body), signal);
}

export function updateGuestContact(guestId: string, contactId: string, body: ICreateUpdateGuestContactBody, signal?: AbortSignal): Promise<IGuestContactResponse> {
  return updateRequest(`${env.REACT_APP_API_HOST}/api/v1/guests/${guestId}/contacts/${contactId}`, JSON.stringify(body), signal);
}

export function deleteGuestContact(guestId: string, contactId: string, signal?: AbortSignal): Promise<void> {
  return deleteRequest(`${env.REACT_APP_API_HOST}/api/v1/guests/${guestId}/contacts/${contactId}`, signal);
}

export function toContactType(type: GuestContactTypeEnum): string {
  switch (type) {
    case GuestContactTypeEnum.Email: return 'Email';
    case GuestContactTypeEnum.Phone: return 'Telefone';
    default: return 'Outro';
  }
}

export function coerceContactType(value: string): GuestContactTypeEnum {
  switch (value) {
    case coerceString(GuestContactTypeEnum.Phone): return GuestContactTypeEnum.Phone;
    case coerceString(GuestContactTypeEnum.Email): return GuestContactTypeEnum.Email;
    default: return GuestContactTypeEnum.Unknown;
  }
}