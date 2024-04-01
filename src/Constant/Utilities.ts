import { toast } from '@/components/ui/use-toast'
import { jwtDecode } from 'jwt-decode' // import dependency
import _ from 'lodash'

export const UserInfo: any = localStorage.getItem('Keycloak_token')
  ? jwtDecode(localStorage.getItem('Keycloak_token') as any)
  : null // get user info from token

export const JsonData = (data: any) => {
  const urlencoded = new URLSearchParams()
  Object.entries(data).forEach(([key, value]: any) =>
    urlencoded.append(key, value)
  )
  return urlencoded
}
export function isEmpty(value: any) {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'string' && value.trim().length === 0) {
    return true
  }

  if (Array.isArray(value) && value.length === 0) {
    return true
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true
  }

  return false
}

export function validateInputs(values: {
  url: string | URL
  requestValue: any
}) {
  if (isEmpty(values.url)) {
    toast({
      variant: 'destructive',
      description: 'URL is required',
      duration: 2000,
    })
    return false
  }

  try {
    new URL(values.url)
  } catch (error) {
    toast({
      variant: 'destructive',
      description: 'URL is not valid',
      duration: 2000,
    })
    return false
  }

  if (isEmpty(values.requestValue)) {
    toast({
      variant: 'destructive',
      description: 'Request Method is required',
      duration: 2000,
    })
    return false
  }

  return true
}
export function createObjectFromArray(arr: any[], keyProp: string | number, valueProp: string | number) {
  return arr.reduce((obj: { [x: string]: string }, item: { [x: string]: any }) => {
    const key = `${item[keyProp]}`;
    const value = `${item[valueProp]}`;
    obj[key] = value;
    return obj;
  }, {});
}
export const hasNonEmptyKeysAndValues = (arr: any) => {
  const hasNonEmptyObject = _.some(arr, (obj) => {
    const keys = _.keys(obj);
    const values = _.values(obj);

    return (
      keys.length > 0 &&
      values.length > 0 &&
      _.every(keys, (key) => key !== '') &&
      _.every(values, (value) => value !== '')
    );
  });

  return hasNonEmptyObject;
};
export function getStatusText(statusCode: string | number) {
  const statusTexts:any = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    301: 'Moved Permanently',
    302: 'Found',
    304: 'Not Modified',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    408: 'Request Timeout',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout'
  };

  return statusTexts[statusCode] || 'Unknown Status Code';
}
