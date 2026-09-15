const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  let payload = null;

  if (contentType.includes('application/json')) {
    payload = await response.json();
  } else {
    payload = await response.text();
  }

  if (!response.ok) {
    const message = payload?.message || payload?.error || 'Request failed';
    throw new Error(message);
  }

  return payload;
}

export const loginUser = async ({ email, password }) => {
  return apiRequest('/api/users/v1/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const registerUser = async (formData) => {
  const fullName = (formData.fullName || '').trim();
  const nameParts = fullName.split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');

  const payload = {
    firstName,
    lastName,
    email: formData.email,
    password: formData.password,
    hvacType: formData.hvacType,
    householdOccupants: String(formData.occupants),
    isAgreedToTerms: String(Boolean(formData.termsAccepted)),
  };

  const response = await apiRequest('/api/users/v1/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // Verify signup was actually successful
  if (!response || response.status !== '201 CREATED') {
    throw new Error(response?.message || 'Signup failed. Please try again.');
  }

  // Auto-login after successful signup so user lands on dashboard
  const loginResponse = await loginUser({
    email: formData.email,
    password: formData.password,
  });

  return {
    user: response.data,
    token: loginResponse.token,
    tokenType: loginResponse.tokenType,
    userId: loginResponse.userId,
    message: loginResponse.message,
  };
};