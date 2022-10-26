import { ICollectionResponse } from "../../services/places-api";

export async function handleErrors(response: Response): Promise<Response> {
  if (response.ok) return response;

  // TODO Melhorar isso aqui
  const error = await response.text();
  throw new Error(error);
}

export async function asApiResponse(response: Response): Promise<any> {
  return response.json();
}

export async function asApiCollectionResponse(response: Response): Promise<ICollectionResponse<any>> {
  return {
    items: await response.json(),
    count: parseInt(response.headers.get('x-total-count') ?? '0')
  };
}

export function parseQueryString(query ?: any): string {
  let queryStr = '';
  
  if (query !== undefined) {
    var queryParser = new URLSearchParams();
    for (const [k, v] of Object.entries(query))
      if (v instanceof Date) queryParser.append(k, v?.toISOString() ?? '')
      else queryParser.append(k, v?.toString() ?? '');
    queryStr = `?${queryParser.toString()}`;
  }

  return queryStr;
}

export function parseFormData<TType>(body: FormData): TType {
  return Object.fromEntries(body.entries()) as TType;
}

export async function collectionRequest<TType>(url: string, query?: any, signal?: AbortSignal): Promise<ICollectionResponse<TType>> {
  return fetch(`${url}${parseQueryString(query)}`, { signal })
    .then(handleErrors)
    .then(asApiCollectionResponse);
}

export async function getRequest<TType>(url: string, signal?: AbortSignal): Promise<TType> {
  return fetch(url, { signal })
    .then(handleErrors)
    .then(asApiResponse);
}

export async function createRequest<TType>(url: string, body: string, signal?: AbortSignal): Promise<TType> {
  const headers = { 'Content-Type': 'application/json' };
  return fetch(url, { signal, body, headers, method: 'POST' })
    .then(handleErrors)
    .then(asApiResponse);
}

export async function updateRequest<TType>(url: string, body: string, signal?: AbortSignal): Promise<TType> {
  const headers = { 'Content-Type': 'application/json' };
  return fetch(url, { signal, body, headers, method: 'PUT' })
    .then(handleErrors)
    .then(asApiResponse);
}

export async function deleteRequest(url: string, signal?: AbortSignal): Promise<void> {
  return fetch(url, { signal, method: 'DELETE' })
    .then(handleErrors)
    .then();
}
