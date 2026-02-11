import { ValidationPipe } from '@nestjs/common';

// Global validation pipe applied to all incoming requests
export const GlobalValidationPipe = new ValidationPipe({

  whitelist: true,
  // Removes any properties from the request body that are NOT defined in the DTO.
  // Prevents users from sending unwanted/malicious fields.

  forbidNonWhitelisted: true,
  // Throws a 400 Bad Request error if extra fields are sent.
  // Example: sending "role: admin" when DTO doesn’t allow it.

  transform: true,
  // Automatically transforms incoming payloads into DTO instances.
  // Also converts primitive types (string → number, etc.)

  transformOptions: {
    enableImplicitConversion: true,
    // Allows automatic type conversion without needing @Type(() => Number)
    // Example: "age": "25" → age: 25
  },

  forbidUnknownValues: true,
  // Rejects invalid payload types like null, arrays, or non-object data.
  // Ensures request body must be a proper object.

  stopAtFirstError: false,
  // Returns ALL validation errors instead of stopping at the first one.
  // Better for frontend debugging.

  validationError: {
    target: false,
    // Prevents returning the entire DTO object in error response (security).

    value: false,
    // Prevents returning the user’s invalid input value in error response.
  },
});
