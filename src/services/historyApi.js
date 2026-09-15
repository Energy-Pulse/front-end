const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export class ApiError extends Error {
    constructor({ message, status, details, raw }) {
        super(message || 'Something went wrong. Please try again.');
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
        this.raw = raw;
    }
}

/**
 * GET /api/ml/history/{userId}
 * Requires: Bearer token
 */
export const fetchPredictionHistory = async (userId) => {
    if (!userId) {
        throw new ApiError({
            message: 'Something went wrong. Please try again.',
            status: 0,
        });
    }

    const token = localStorage.getItem('smartEnergyToken');

    let response;
    try {
        response = await fetch(
            `${API_BASE_URL}/api/ml/history/${encodeURIComponent(userId)}`,
            {
                method: 'GET',
                headers: {
                    accept: '*/*',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                credentials: 'include',
            }
        );
    } catch (networkErr) {
        console.error('[fetchPredictionHistory] network error:', networkErr);
        throw new ApiError({
            message: 'Something went wrong. Please try again.',
            status: 0,
            details: networkErr?.message,
        });
    }

    const contentType = response.headers.get('content-type') || '';
    let data = null;

    if (contentType.includes('application/json')) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if (!response.ok) {
        console.error('[fetchPredictionHistory] server error:', {
            status: response.status,
            body: data,
        });
        throw new ApiError({
            message: 'Something went wrong. Please try again.',
            status: response.status,
            details: data,
            raw: data,
        });
    }

    return Array.isArray(data) ? data : [];
};