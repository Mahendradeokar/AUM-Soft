export const responseMessage: any = {
  200: {
    title: 'Success',
    message: 'The request was successful.',
  },
  400: {
    title: 'Bad Request',
    message: 'The server could not understand the request.',
  },
  401: {
    title: 'Unauthorized',
    message: 'Authentication is required and has failed or not yet been provided.',
  },
  402: {
    title: 'Payment Required',
    message: 'Payment is required for the requested service.',
  },
  403: {
    title: 'Forbidden',
    message: 'You do not have permission to access the requested resource.',
  },
  404: {
    title: 'Not Found',
    message: 'The requested resource could not be found on the server.',
  },
  500: {
    title: 'Internal Server Error',
    message: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
  },
  502: {
    title: 'Bad Gateway',
    message: 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.',
  },
  503: {
    title: 'Service Unavailable',
    message:
      'The server is currently unable to handle the request due to temporary overloading or maintenance of the server.',
  },
  504: {
    title: 'Gateway Timeout',
    message:
      'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server or some other auxiliary server it needed to access.',
  },
  511: {
    title: 'Network Authentication Required',
    message: 'The client needs to authenticate to gain network access.',
  },
  default: {
    title: 'Error',
    message: 'An unexpected error occurred. Please try again later.',
  },
};
