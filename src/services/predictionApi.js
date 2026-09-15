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

export const predictConsumption = async (payload) => {
    const token = localStorage.getItem('smartEnergyToken');

    let response;
    try {
        response = await fetch(`${API_BASE_URL}/api/ml/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        });
    } catch (networkErr) {
        // Always show the same short message in the UI.
        console.error('[predictConsumption] network error:', networkErr);
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
        // Log full details to console for debugging — but show a short message in the UI.
        console.error('[predictConsumption] server error:', {
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

    return data;
};