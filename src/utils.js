/**
 * Validates the input word/phrase
 * @param {string} word - The word to validate
 * @returns {Object} - Validation result
 */
export function validateWord(word) {
  if (!word) {
    return {
      isValid: false,
      error: "Word parameter is required.",
    };
  }

  if (typeof word !== "string") {
    return {
      isValid: false,
      error: "Word must be a string",
    };
  }

  const trimmedWord = word.trim();

  if (trimmedWord.length === 0) {
    return {
      isValid: false,
      error: "Word cannot be empty",
    };
  }

  if (trimmedWord.length > 100) {
    return {
      isValid: false,
      error: "Word is too long (max 100 characters)",
    };
  }

  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /<iframe/i,
  ];

  if (suspiciousPatterns.some((pattern) => pattern.test(trimmedWord))) {
    return {
      isValid: false,
      error: "Invalid characters detected",
    };
  }

  return {
    isValid: true,
    word: trimmedWord,
  };
}

/**
 * Creates a standardized error response
 * @param {string} message - Error message
 * @param {number} code - HTTP status code
 * @returns {Object} - Formatted error response
 */
export function createErrorResponse(message, code) {
  return {
    success: false,
    error: message,
    code: code,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standardized success response
 * @param {Object} data - Response data
 * @returns {Object} - Formatted success response
 */
export function createSuccessResponse(data) {
  return {
    success: true,
    data: data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Sanitizes text content to prevent XSS
 * @param {string} text - Text to sanitize
 * @returns {string} - Sanitized text
 */
export function sanitizeText(text) {
  if (!text || typeof text !== "string") return "";

  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
