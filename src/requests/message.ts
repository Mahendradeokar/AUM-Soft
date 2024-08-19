export const responseMessage = {
  200: {
    title: 'All Good!',
    message: 'Your request was successful.',
  },
  400: {
    title: 'Invalid Request',
    message: "Sorry, we didn't quite understand that request. Please try again!",
  },
  401: {
    title: 'Login Required',
    message: 'You are not authorized to access this resource.',
  },
  402: {
    title: 'Payment Needed',
    message: 'Payment is required for the requested service.',
  },
  403: {
    title: 'Access Denied',
    message: 'You do not have permission to access the requested resource.',
  },
  404: {
    title: 'Not Found',
    message: 'The requested resource could not be found on the server.',
  },
  500: {
    title: 'Server Error',
    message: 'The server encountered an unexpected condition that prevented it from fulfilling your request.',
  },
  502: {
    title: 'Gateway Issue',
    message: 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.',
  },
  503: {
    title: 'Service Unavailable',
    message:
      'The server is currently unable to handle your request due to temporary overloading or maintenance of the server.',
  },
  504: {
    title: 'Timeout Error',
    message:
      'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server or some other auxiliary server it needed to access.',
  },
  511: {
    title: 'Network Access Required',
    message: 'You need to authenticate to gain network access.',
  },
  default: {
    title: 'An Error Occurred',
    message: 'An unexpected error occurred. Please try again later.',
  },
} as const;
