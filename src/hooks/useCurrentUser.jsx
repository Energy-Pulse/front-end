import { useEffect, useState } from 'react';
import { fetchUserDetails } from '../services/userApi';

/**
 * Fetches the current user profile once (per userId) and caches it in state.
 * Returns { user, isLoading, error }.
 */
export const useCurrentUser = (fallbackUser = null) => {
    const [user, setUser] = useState(fallbackUser);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('smartEnergyUserId');
        if (!userId) {
            setIsLoading(false);
            return;
        }

        let cancelled = false;

        (async () => {
            try {
                setIsLoading(true);
                const data = await fetchUserDetails(userId);
                if (!cancelled) {
                    setUser({
                        userId: data.userId,
                        name: data.name?.trim() || 'User',
                        username: data.username,
                        email: data.email,
                        hvacType: data.hvacType,
                        householdOccupants: data.householdOccupants,
                        isAgreedToTerms: data.isAgreedToTerms,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                    });
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('[useCurrentUser]', err);
                    setError(err.message || 'Failed to load user details.');
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return { user, isLoading, error };
};