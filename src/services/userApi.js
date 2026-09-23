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

    // Backend wraps user in { data, message, status }
    const data = payload?.data ?? payload;

    // Normalize contact field — backend may return it as `contact`,
    // `contactNumber`, `phone`, or `phoneNumber`.
    if (data && typeof data === 'object') {
        if (data.contact === undefined || data.contact === null) {
            data.contact =
                data.contactNumber ??
                data.phone ??
                data.phoneNumber ??
                '';
        }
    }

    return data;
};

/**
 * PUT /api/users/v1/update?id={userId}
 * Body: { name, username, email, contact }
 */
export const updateUserDetails = async (userId, payload) => {
    if (!userId) {
        throw new ApiError({
            message: 'Something went wrong. Please try again.',
            status: 0,
        });
    }

    const token = localStorage.getItem('smartEnergyToken');

    // Only send the 4 fields the Swagger DTO declares
    const body = {
        name: payload?.name ?? '',
        username: payload?.username ?? '',
        email: payload?.email ?? '',
        contact: payload?.contact ?? '',
    };

    // Debug log so we can see exactly what is sent
    console.log('[updateUserDetails] PUT', `${API_BASE_URL}/api/users/v1/update?id=${userId}`);
    console.log('[updateUserDetails] body:', body);

    let response;
    try {
        response = await fetch(
            `${API_BASE_URL}/api/users/v1/update?id=${encodeURIComponent(userId)}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    accept: '*/*',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                credentials: 'include',
                body: JSON.stringify(body),
            }
        );
    } catch (networkErr) {
        console.error('[updateUserDetails] network error:', networkErr);
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
        console.error('[updateUserDetails] server error:', {
            status: response.status,
            body: data,
        });
        throw new ApiError({
            message: data?.message || 'Something went wrong. Please try again.',
            status: response.status,
            details: data,
            raw: data,
        });
    }

    const result = data?.data ?? data;

    // Normalize contact field in the response too
    if (result && typeof result === 'object') {
        if (result.contact === undefined || result.contact === null) {
            result.contact =
                result.contactNumber ??
                result.phone ??
                result.phoneNumber ??
                '';
        }
    }

    return result;
};

/**
 * PATCH /api/users/v1/delete?id={userId}
 * No body.
 */
export const deleteUserAccount = async (userId) => {
    if (!userId) {
        throw new ApiError({
            message: 'Something went wrong. Please try again.',
            status: 0,
        });
    }

    const token = localStorage.getItem('smartEnergyToken');

    console.log('[deleteUserAccount] PATCH', `${API_BASE_URL}/api/users/v1/delete?id=${userId}`);

    let response;
    try {
        response = await fetch(
            `${API_BASE_URL}/api/users/v1/delete?id=${encodeURIComponent(userId)}`,
            {
                method: 'PATCH',
                headers: {
                    accept: '*/*',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                credentials: 'include',
            }
        );
    } catch (networkErr) {
        console.error('[deleteUserAccount] network error:', networkErr);
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
        console.error('[deleteUserAccount] server error:', {
            status: response.status,
            body: data,
        });
        throw new ApiError({
            message: data?.message || 'Something went wrong. Please try again.',
            status: response.status,
            details: data,
            raw: data,
        });
    }

    return data?.data ?? data ?? true;
};