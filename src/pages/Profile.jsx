import { useEffect, useState } from 'react';
import { fetchUserDetails } from '../services/userApi';
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

export const Profile = ({ user: fallbackUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState('');
    const [formData, setFormData] = useState({
        name: fallbackUser?.name || '',
        email: fallbackUser?.email || '',
        username: '',
        phone: '+1 (555) 123-4567',
        role: 'Household Admin',
        timezone: 'EST (UTC-5)',
        hvacType: '',
        householdOccupants: '',
        memberSince: '',
        notifications: true,
        emailAlerts: true,
        weeklyReports: true,
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
                setFormData((prev) => ({
                    ...prev,
                    name: data.name?.trim() || prev.name,
                    email: data.email || prev.email,
                    username: data.username || '',
                    hvacType: data.hvacType || '',
                    householdOccupants: data.householdOccupants || '',
                    memberSince: formatDate(data.createdAt),
                }));
            } catch (err) {
                console.error('[Profile] error:', err);
                setApiError('Something went wrong. Please try again.');
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
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
                    <button
                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                        className={`h-9 px-4 rounded-lg font-label-md text-label-md font-medium inline-flex items-center gap-2 shadow-sm transition-colors ${
                            isEditing
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-primary text-on-primary hover:bg-on-surface-variant'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {isEditing ? 'check' : 'edit'}
                        </span>
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                </div>
            </div>

            {apiError && (
                <ErrorMessage
                    message={apiError}
                    onDismiss={() => setApiError('')}
                />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest text-center">
                        <div className="w-24 h-24 rounded-full bg-surface-container mx-auto flex items-center justify-center text-4xl font-semibold text-primary border-4 border-outline-variant/30">
                            {isLoading ? '…' : (formData.name || 'U').charAt(0)}
                        </div>
                        <h3 className="font-headline-md text-headline-md font-semibold text-primary mt-4">
                            {isLoading ? 'Loading…' : formData.name || 'User'}
                        </h3>
                        <p className="font-body-sm text-body-sm text-secondary">
                            {roleLabel}
                        </p>
                        {formData.username && (
                            <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                                {formData.username}
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
                                    {formData.memberSince || '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between font-body-sm text-body-sm mt-2">
                                <span className="text-secondary">Household</span>
                                <span className="text-primary">
                                    {formData.householdOccupants
                                        ? `${formData.householdOccupants} occupants`
                                        : '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between font-body-sm text-body-sm mt-2">
                                <span className="text-secondary">HVAC</span>
                                <span className="text-primary capitalize">
                                    {formData.hvacType
                                        ? formData.hvacType.replace('-', ' ')
                                        : '—'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Form */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
                        <h4 className="font-headline-sm text-headline-sm font-semibold text-primary mb-4">
                            Personal Information
                        </h4>
                        <div className="profile-info-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition ${
                                        !isEditing ? 'opacity-60 cursor-default' : ''
                                    }`}
                                />
                            </div>
                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    Timezone
                                </label>
                                <select
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition ${
                                        !isEditing ? 'opacity-60 cursor-default' : ''
                                    }`}
                                >
                                    <option>EST (UTC-5)</option>
                                    <option>CST (UTC-6)</option>
                                    <option>MST (UTC-7)</option>
                                    <option>PST (UTC-8)</option>
                                    <option>IST (UTC+5:30)</option>
                                    <option>SLST (UTC+5:30)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
                        <h4 className="font-headline-sm text-headline-sm font-semibold text-primary mb-4">
                            Notification Preferences
                        </h4>
                        <div className="space-y-3">
                            {[
                                {
                                    key: 'notifications',
                                    title: 'Push Notifications',
                                    desc: 'Receive real-time alerts on your device',
                                },
                                {
                                    key: 'emailAlerts',
                                    title: 'Email Alerts',
                                    desc: 'Weekly summaries and important updates',
                                },
                                {
                                    key: 'weeklyReports',
                                    title: 'Weekly Reports',
                                    desc: 'Detailed consumption analysis every Monday',
                                },
                            ].map((item, idx, arr) => (
                                <div
                                    key={item.key}
                                    className={`flex items-center justify-between py-2 gap-3 ${
                                        idx < arr.length - 1
                                            ? 'border-b border-outline-variant/40'
                                            : ''
                                    }`}
                                >
                                    <div>
                                        <div className="font-label-md text-label-md font-medium text-primary">
                                            {item.title}
                                        </div>
                                        <div className="font-body-sm text-body-sm text-secondary">
                                            {item.desc}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            isEditing &&
                                            setFormData((prev) => ({
                                                ...prev,
                                                [item.key]: !prev[item.key],
                                            }))
                                        }
                                        className={`w-11 h-6 flex-shrink-0 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                                            formData[item.key]
                                                ? 'bg-primary justify-end'
                                                : 'bg-outline-variant justify-start'
                                        } ${!isEditing ? 'opacity-50 cursor-default' : ''}`}
                                    >
                                        <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
                        <h4 className="font-headline-sm text-headline-sm font-semibold text-primary mb-2">
                            Account Security
                        </h4>
                        <p className="font-body-sm text-body-sm text-secondary mb-4">
                            Manage your password and security settings
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 rounded-lg border border-outline-variant text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors inline-flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">
                                    lock
                                </span>
                                Change Password
                            </button>
                            <button className="px-4 py-2 rounded-lg border border-outline-variant text-red-600 font-label-md text-label-md font-medium hover:bg-red-50 transition-colors inline-flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">
                                    delete_forever
                                </span>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};