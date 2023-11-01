export class APIError extends Error {
  statusCode: number;

  error: string;

  constructor(statusCode: number, message: string, error: string) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.error = error;
  }
}
