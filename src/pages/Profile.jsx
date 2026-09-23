import { useEffect, useState } from 'react';
import {
    fetchUserDetails,
    updateUserDetails,
    deleteUserAccount,
} from '../services/userApi';
import { ErrorMessage } from '../components/ErrorMessage.jsx';

const formatDate = (iso) => {
    if (!iso) return '—';
    try {
        return new Date(iso).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return '—';
    }
};

export const Profile = ({ user: fallbackUser, onLogout }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [apiError, setApiError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Only fields that exist in the Swagger contract
    const [formData, setFormData] = useState({
        name: fallbackUser?.name || '',
        username: '',
        email: fallbackUser?.email || '',
        contact: '',
    });

    const [originalData, setOriginalData] = useState(null);
    // Extra read-only info (not editable, fetched separately)
    const [meta, setMeta] = useState({
        memberSince: '',
        hvacType: '',
        householdOccupants: '',
    });

    useEffect(() => {
        const userId = localStorage.getItem('smartEnergyUserId');
        if (!userId) {
            setIsLoading(false);
            return;
        }

        (async () => {
            try {
                setIsLoading(true);
                setApiError('');
                const data = await fetchUserDetails(userId);

                const merged = {
                    name: data.name?.trim() || fallbackUser?.name || '',
                    username: data.username || '',
                    email: data.email || fallbackUser?.email || '',
                    contact: data.contact || '',
                };
                setFormData(merged);
                setOriginalData(merged);

                setMeta({
                    memberSince: formatDate(data.createdAt),
                    hvacType: data.hvacType || '',
                    householdOccupants: data.householdOccupants || '',
                });
            } catch (err) {
                console.error('[Profile] error:', err);
                setApiError('Something went wrong. Please try again.');
            } finally {
                setIsLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const userId = localStorage.getItem('smartEnergyUserId');
        if (!userId) return;

        setIsSaving(true);
        setApiError('');
        setSuccessMessage('');

        // Snapshot what the user actually typed — this is our source of truth
        const submitted = {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            contact: formData.contact,
        };

        try {
            // Exactly the 4 fields Swagger expects
            const payload = { ...submitted };

            const updated = await updateUserDetails(userId, payload);

            // The PUT endpoint returns `{}` per Swagger, so trust the values
            // we just submitted. Only override with server values when the
            // server actually returns a non-empty string.
            const nextData = {
                name:
                    typeof updated?.name === 'string' && updated.name.trim() !== ''
                        ? updated.name
                        : submitted.name,
                username:
                    typeof updated?.username === 'string' &&
                    updated.username.trim() !== ''
                        ? updated.username
                        : submitted.username,
                email:
                    typeof updated?.email === 'string' &&
                    updated.email.trim() !== ''
                        ? updated.email
                        : submitted.email,
                contact:
                    typeof updated?.contact === 'string' &&
                    updated.contact.trim() !== ''
                        ? updated.contact
                        : submitted.contact,
            };

            setFormData(nextData);
            setOriginalData(nextData);
            setIsEditing(false);
            setSuccessMessage('Profile updated successfully.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('[Profile] save error:', err);
            setApiError('Something went wrong. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        if (originalData) setFormData(originalData);
        setIsEditing(false);
        setApiError('');
    };

    const handleDeleteAccount = async () => {
        const userId = localStorage.getItem('smartEnergyUserId');
        if (!userId) return;

        setIsDeleting(true);
        setApiError('');

        try {
            await deleteUserAccount(userId);
            localStorage.clear();
            setShowDeleteConfirm(false);
            if (onLogout) onLogout();
            else window.location.href = '/';
        } catch (err) {
            console.error('[Profile] delete error:', err);
            setApiError('Something went wrong. Please try again.');
            setIsDeleting(false);
        }
    };

    const roleLabel = 'Household Admin';

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="page-header-row flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
                <div>
                    <h1 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight">
                        Profile Settings
                    </h1>
                    <p className="font-body-md text-body-md text-secondary mt-1">
                        Manage your account details and preferences
                    </p>
                </div>
                <div className="page-header-actions flex items-center gap-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                disabled={isSaving}
                                className="h-9 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors disabled:opacity-60"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="h-9 px-4 rounded-lg font-label-md text-label-md font-medium inline-flex items-center gap-2 shadow-sm transition-colors bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {isSaving ? 'progress_activity' : 'check'}
                                </span>
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="h-9 px-4 rounded-lg font-label-md text-label-md font-medium inline-flex items-center gap-2 shadow-sm transition-colors bg-primary text-on-primary hover:bg-on-surface-variant"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                edit
                            </span>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {apiError && (
                <ErrorMessage
                    message={apiError}
                    onDismiss={() => setApiError('')}
                />
            )}

            {successMessage && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                        check_circle
                    </span>
                    <span className="font-body-sm text-body-sm text-emerald-700">
                        {successMessage}
                    </span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest text-center">
                        <div className="w-24 h-24 rounded-full bg-surface-container mx-auto flex items-center justify-center overflow-hidden border-4 border-outline-variant/30">
                            <img
                                src="/profile-avatar.png"
                                alt="User avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-headline-md text-headline-md font-semibold text-primary mt-4">
                            {isLoading ? 'Loading…' : formData.name || 'User'}
                        </h3>
                        <p className="font-body-sm text-body-sm text-secondary">
                            {roleLabel}
                        </p>
                        {formData.username && (
                            <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                                @{formData.username}
                            </p>
                        )}

                        <div className="mt-4 pt-4 border-t border-outline-variant">
                            <div className="flex items-center justify-between font-body-sm text-body-sm">
                                <span className="text-secondary">Status</span>
                                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Active
                                </span>
                            </div>
                            <div className="flex items-center justify-between font-body-sm text-body-sm mt-2">
                                <span className="text-secondary">Member Since</span>
                                <span className="text-primary">
                                    {meta.memberSince || '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between font-body-sm text-body-sm mt-2">
                                <span className="text-secondary">Household</span>
                                <span className="text-primary">
                                    {meta.householdOccupants
                                        ? `${meta.householdOccupants} occupants`
                                        : '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between font-body-sm text-body-sm mt-2">
                                <span className="text-secondary">HVAC</span>
                                <span className="text-primary capitalize">
                                    {meta.hvacType
                                        ? meta.hvacType.replace('-', ' ')
                                        : '—'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editable form — Swagger fields only */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
                        <h4 className="font-headline-sm text-headline-sm font-semibold text-primary mb-4">
                            Personal Information
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition ${
                                        !isEditing ? 'opacity-60 cursor-default' : ''
                                    }`}
                                />
                            </div>
                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition ${
                                        !isEditing ? 'opacity-60 cursor-default' : ''
                                    }`}
                                />
                            </div>
                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition ${
                                        !isEditing ? 'opacity-60 cursor-default' : ''
                                    }`}
                                />
                            </div>
                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    Contact
                                </label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="+94 77 123 4567"
                                    className={`w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition ${
                                        !isEditing ? 'opacity-60 cursor-default' : ''
                                    }`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
                        <h4 className="font-headline-sm text-headline-sm font-semibold text-primary mb-2">
                            Account Security
                        </h4>
                        <p className="font-body-sm text-body-sm text-secondary mb-4">
                            Permanently remove your account and all associated data.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-4 py-2 rounded-lg border border-outline-variant text-red-600 font-label-md text-label-md font-medium hover:bg-red-50 transition-colors inline-flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    delete_forever
                                </span>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-red-600 text-[22px]">
                                    warning
                                </span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                                    Delete Account?
                                </h3>
                                <p className="font-body-sm text-body-sm text-secondary">
                                    This action cannot be undone.
                                </p>
                            </div>
                        </div>

                        <p className="font-body-sm text-body-sm text-secondary mb-6">
                            All your prediction history, profile data, and account
                            information will be permanently removed.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                                className="h-9 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors disabled:opacity-60"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className="h-9 px-4 rounded-lg bg-red-600 text-white font-label-md text-label-md font-medium hover:bg-red-700 transition-colors inline-flex items-center gap-2 disabled:opacity-60"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {isDeleting
                                        ? 'progress_activity'
                                        : 'delete_forever'}
                                </span>
                                {isDeleting ? 'Deleting...' : 'Delete Account'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};