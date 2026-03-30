/**
 * PHIX SECURITY LOG HYGIENE PROTOCOL
 * Robust sanitization utility for PII and sensitive headers.
 * Designed for high-performance data-layer monitoring.
 */

const SENSITIVE_HEADERS = [
    'authorization',
    'cookie',
    'set-cookie',
    'proxy-authorization',
    'x-api-key',
    'x-amz-security-token',
    'x-amz-target',
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'x-amz-cf-id',
    'x-amzn-errortype',
    'x-amzn-requestid',
    'x-amzn-trace-id',
    'x-cache',
    'x-runtime',
    'x-amz-cf-id',
    'x-amz-cf-pop',
    'x-amz-cf-id'
];

const PII_FIELDS = [
    'password',
    'email',
    'ssn',
    'credit_card',
    'phone',
    'token',
    'secret'
];

/**
 * Sanitizes headers by masking sensitive values.
 * @param {Object} headers - The raw header object.
 * @returns {Object} - The sanitized header object.
 */
function sanitizeHeaders(headers) {
    if (!headers) return {};
    const sanitized = { ...headers };
    
    Object.keys(sanitized).forEach(key => {
        const lowerKey = key.toLowerCase();
        if (SENSITIVE_HEADERS.includes(lowerKey)) {
            sanitized[key] = '[REDACTED]';
        }
    });
    
    return sanitized;
}

/**
 * Masks PII fields in a JSON object.
 * @param {Object} data - The raw data object.
 * @returns {Object} - The masked data object.
 */
function maskPII(data) {
    if (!data || typeof data !== 'object') return data;
    
    const masked = JSON.parse(JSON.stringify(data)); // Deep clone
    
    const recursiveMask = (obj) => {
        Object.keys(obj).forEach(key => {
            const lowerKey = key.toLowerCase();
            if (PII_FIELDS.some(field => lowerKey.includes(field))) {
                obj[key] = '[MASKED]';
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                recursiveMask(obj[key]);
            }
        });
    };
    
    recursiveMask(masked);
    return masked;
}

/**
 * Sovereign Logger: Logs request/response details with full sanitization.
 */
function logSovereign(message, metadata = {}) {
    const sanitizedMeta = {
        ...metadata,
        headers: sanitizeHeaders(metadata.headers),
        body: maskPII(metadata.body)
    };
    
    console.log(`[PHIX-SECURITY] ${new Date().toISOString()} - ${message}`, sanitizedMeta);
}

if (typeof module !== 'undefined') {
    module.exports = {
        sanitizeHeaders,
        maskPII,
        logSovereign
    };
}
