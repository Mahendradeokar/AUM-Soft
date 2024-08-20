import successHandler from './success';
import errorHandler from './error';

export const mockApiRequest = async <T>(
  data: T,
  shouldSucceed: boolean = true,
  successMessage: string = 'Operation successful',
  errorMessage: string = 'Operation failed',
) => {
  try {
    if (shouldSucceed) {
      // Simulate a successful response
      const mockResponse = {
        success: true,
        message: successMessage,
        data: {
          ...data,
          id: Math.floor(Math.random() * 1000), // Generate a random ID
        },
      };
      return successHandler(mockResponse, { showNotification: true });
    }
    // Simulate an error
    throw new Error(errorMessage);
  } catch (error: any) {
    return errorHandler(error, { showNotification: true });
  }
};
