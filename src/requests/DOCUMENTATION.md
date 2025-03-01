# Request Handler System Documentation

## Overview
This documentation explains the implementation of a robust request handling system for TypeScript/JavaScript applications. The system provides a structured way to handle API requests, responses, error handling, and notifications.

## Folder Structure
```
src/requests/
├── auth.ts         # Authentication related requests
├── error.ts        # Error handling utility
├── index.ts        # Request exports and organization
├── message.ts      # Response messages configuration
├── orders.ts       # Order-related requests
└── success.ts      # Success handling utility
```

## Core Components

### 1. Request Handler Pattern
Each request follows this basic pattern:
```typescript
export const someRequest = async (data: SomeDataType) => {
  try {
    const { data: resData } = await axiosInstance.post('endpoint', data);
    return successHandler(resData, { showNotification: true/false });
  } catch (error: any) {
    console.error('Error while calling the API....', error);
    return errorHandler(error?.response?.data ?? error, { showNotification: true/false });
  }
};
```

### 2. Success Handler (`success.ts`)
Handles successful API responses with:
- Status message processing
- Toast notifications (optional)
- Standardized response format

```typescript
// Success response format
{
  statusMessage: string,
  statusCode: number,
  isSuccess: true,
  data: any
}
```

### 3. Error Handler (`error.ts`)
Manages API errors with:
- Automatic token expiration handling
- Error message processing
- Toast notifications (optional)
- Standardized error format

### 4. Message Configuration (`message.ts`)
Centralizes response messages for different status codes:
```typescript
{
  [statusCode: number]: {
    title: string,
    message: string
  }
}
```

## Implementation Guide

### 1. Setup Dependencies
```bash
npm install axios jsonwebtoken http-status-codes
# For UI notifications
npm install @radix-ui/react-toast
```

### 2. Create Axios Instance
```typescript
// config/axios.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'YOUR_API_BASE_URL',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for token handling if needed
axiosInstance.interceptors.request.use((config) => {
  const token = getToken(); // Implement your token getter
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 3. Implement Token Utilities
```typescript
// lib/utils.ts
export const setToken = (token: string, options: { maxAge: number }) => {
  // Implement token storage (localStorage/cookie)
};

export const deleteToken = () => {
  // Implement token removal
};
```

### 4. Create Request Modules
Organize requests by feature (auth, orders, etc.) following the pattern above.

### 5. Export Interface
Use `index.ts` to organize and export request handlers by feature:
```typescript
export const auth = {
  login,
  signUp,
  logout,
};

export const orders = {
  upload: uploadOrders,
};
```

## Best Practices

1. **Error Handling**
   - Always use try-catch blocks
   - Provide meaningful error messages
   - Handle token expiration globally

2. **Response Format**
   - Maintain consistent response structure
   - Include status codes and messages
   - Separate success and error handlers

3. **Code Organization**
   - Group related requests together
   - Use meaningful file names
   - Keep request handlers focused and single-purpose

4. **Type Safety**
   - Define TypeScript interfaces for request/response data
   - Use proper type annotations
   - Avoid using 'any' type where possible

## Usage Example

```typescript
import { auth } from './requests';

// Login example
const handleLogin = async (credentials: { email: string; password: string }) => {
  const response = await auth.login(credentials);
  if (response.isSuccess) {
    // Handle successful login
  } else {
    // Handle login error
  }
};
```

## Error Handling Example

```typescript
// Custom error handling
const customErrorHandler = (error: any) => {
  return errorHandler(error, { 
    showNotification: true,
    // Add custom handling logic
  });
};
```

## Notes
- Ensure proper error handling in production
- Implement proper security measures for token management
- Consider implementing request caching where appropriate
- Add request timeout handling
- Implement retry logic for failed requests if needed 