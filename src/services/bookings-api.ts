import { ICollectionResponse, IPlaceResponse } from "./places-api";
import { IGuestContactResponse } from './guest-contact-api';
import { collectionRequest, createRequest, deleteRequest, getRequest, handleErrors, updateRequest } from "../commons/services/fetch-utils";
import { env } from "../env";

export enum BookingStatusEnum {
  Unknown = 0,
  Pending = 1,
  Confirmed = 2,
  Cancelled = 3
}

export interface ISearchBookingsQuery {
  byPlace?: string;
  date?: Date;
  status?: BookingStatusEnum;
  search?: string;
  take?: number;
  skip?: number;
  sortBy?: string;
}

export interface IBookingGuestResponse {
  id: string;
  name: string;
  isPrincipal: boolean;
  contacts: Array<IGuestContactResponse>;
}

export interface IBookingResponse {
  id: string;
  placeId: string;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatusEnum;
  description: string;
  place: IPlaceResponse;
  guests: Array<IBookingGuestResponse>;

}

export function castBookingResponse({ checkIn, checkOut, ...response }: any): IBookingResponse {
  return {
    ...response,
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut)
  };
}

export function searchBookings(query?: ISearchBookingsQuery, abort?: AbortSignal): Promise<ICollectionResponse<IBookingResponse>> {
  return collectionRequest(`${env.REACT_APP_API_HOST}/api/v1/bookings`, query, abort)
    .then(({ items, ...res }) => ({ ...res, items: items.map(castBookingResponse) }));
}

export interface ICreateUpdateBookingBody {
  placeId: string;
  description: string;
  checkIn: Date;
  checkOut: Date;
}

export function createBooking(body: ICreateUpdateBookingBody, abort?: AbortSignal): Promise<IBookingResponse> {
  return createRequest(`${env.REACT_APP_API_HOST}/api/v1/bookings`, JSON.stringify(body), abort)
    .then(castBookingResponse);
}

export function updateBooking(id: string, body: ICreateUpdateBookingBody, abort?: AbortSignal): Promise<IBookingResponse> {
  return updateRequest(`${env.REACT_APP_API_HOST}/api/v1/bookings/${id}`, JSON.stringify(body), abort)
    .then(castBookingResponse);
}

export function getBookingByKey(id: string, abort?: AbortSignal): Promise<IBookingResponse> {
  return getRequest(`${env.REACT_APP_API_HOST}/api/v1/bookings/${id}`, abort)
    .then(castBookingResponse);
}

export function deleteBooking(id: string, abort?: AbortSignal): Promise<void> {
  return deleteRequest(`${env.REACT_APP_API_HOST}/api/v1/bookings/${id}`, abort);
}

export function confirmBooking(id: string, signal?: AbortSignal): Promise<void> {
  return fetch(`${env.REACT_APP_API_HOST}/api/v1/bookings/${id}/confirm`, { method: 'POST', signal })
    .then(handleErrors)
    .then();
}

export function unConfirmBooking(id: string, signal?: AbortSignal): Promise<void> {
  return fetch(`${env.REACT_APP_API_HOST}/api/v1/bookings/${id}/unconfirm`, { method: 'POST', signal })
    .then(handleErrors)
    .then();
}

export function cancelBooking(id: string, signal?: AbortSignal): Promise<void> {
  return fetch(`${env.REACT_APP_API_HOST}/api/v1/bookings/${id}/cancel`, { method: 'POST', signal })
    .then(handleErrors)
    .then();
}

export interface IBookingGuestBody {
  guestId: string;
  isPrimary: boolean;
}

export function addBookingGuest(bookingId: string, guest: IBookingGuestBody, signal?: AbortSignal): Promise<void> {
  return createRequest(`${env.REACT_APP_API_HOST}/api/v1/bookings/${bookingId}/guests`, JSON.stringify(guest), signal)
    .then();
}

export function removeBookingGuest(bookingId: string, guestId: string, abort?: AbortSignal): Promise<void> {
  return deleteRequest(`${env.REACT_APP_API_HOST}/api/v1/bookings/${bookingId}/guests/${guestId}`, abort);
}

export function setPrimaryBookingGuest(bookingId: string, guestId: string, signal?: AbortSignal): Promise<void> {
  return fetch(`${env.REACT_APP_API_HOST}/api/v1/bookings/${bookingId}/guests/${guestId}`, { method: 'POST', signal })
    .then(handleErrors)
    .then();
}
