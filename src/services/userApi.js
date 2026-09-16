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
 * GET /api/ml/me/{userId}
 * Returns the authenticated user's profile details.
 */
export const fetchUserDetails = async (userId) => {
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
            `${API_BASE_URL}/api/ml/me/${encodeURIComponent(userId)}`,
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
        console.error('[fetchUserDetails] network error:', networkErr);
        throw new ApiError({
            message: 'Something went wrong. Please try again.',
            status: 0,
            details: networkErr?.message,
        });
    }

    const contentType = response.headers.get('content-type') || '';
    let payload = null;

    if (contentType.includes('application/json')) {
        payload = await response.json();
    } else {
        payload = await response.text();
    }

    if (!response.ok) {
        console.error('[fetchUserDetails] server error:', {
            status: response.status,
            body: payload,
        });
        throw new ApiError({
            message: payload?.message || 'Something went wrong. Please try again.',
            status: response.status,
            details: payload,
            raw: payload,
        });
    }

    // Backend wraps the user in { data, message, status }
    return payload?.data ?? payload;
};