import { useState } from 'react';

export const Profile = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || 'Alex Morgan',
        email: user?.email || 'alex@smartenergy.ai',
        phone: '+1 (555) 123-4567',
        role: 'Household Admin',
        timezone: 'EST (UTC-5)',
        notifications: true,
        emailAlerts: true,
        weeklyReports: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Save logic here
    };

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
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest text-center">
                        <div className="w-24 h-24 rounded-full bg-surface-container mx-auto flex items-center justify-center text-4xl font-semibold text-primary border-4 border-outline-variant/30">
                            {formData.name.charAt(0)}
                        </div>
                        <h3 className="font-headline-md text-headline-md font-semibold text-primary mt-4">
                            {formData.name}
                        </h3>
                        <p className="font-body-sm text-body-sm text-secondary">{formData.role}</p>
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
                                <span className="text-primary">Jan 2026</span>
                            </div>
                            <div className="flex items-center justify-between font-body-sm text-body-sm mt-2">
                                <span className="text-secondary">Household</span>
                                <span className="text-primary">Main Residence</span>
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
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
                        <h4 className="font-headline-sm text-headline-sm font-semibold text-primary mb-4">
                            Notification Preferences
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-outline-variant/40 gap-3">
                                <div>
                                    <div className="font-label-md text-label-md font-medium text-primary">Push Notifications</div>
                                    <div className="font-body-sm text-body-sm text-secondary">Receive real-time alerts on your device</div>
                                </div>
                                <button
                                    onClick={() => isEditing && setFormData(prev => ({ ...prev, notifications: !prev.notifications }))}
                                    className={`w-11 h-6 flex-shrink-0 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                                        formData.notifications ? 'bg-primary justify-end' : 'bg-outline-variant justify-start'
                                    } ${!isEditing ? 'opacity-50 cursor-default' : ''}`}
                                >
                                    <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-outline-variant/40 gap-3">
                                <div>
                                    <div className="font-label-md text-label-md font-medium text-primary">Email Alerts</div>
                                    <div className="font-body-sm text-body-sm text-secondary">Weekly summaries and important updates</div>
                                </div>
                                <button
                                    onClick={() => isEditing && setFormData(prev => ({ ...prev, emailAlerts: !prev.emailAlerts }))}
                                    className={`w-11 h-6 flex-shrink-0 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                                        formData.emailAlerts ? 'bg-primary justify-end' : 'bg-outline-variant justify-start'
                                    } ${!isEditing ? 'opacity-50 cursor-default' : ''}`}
                                >
                                    <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between py-2 gap-3">
                                <div>
                                    <div className="font-label-md text-label-md font-medium text-primary">Weekly Reports</div>
                                    <div className="font-body-sm text-body-sm text-secondary">Detailed consumption analysis every Monday</div>
                                </div>
                                <button
                                    onClick={() => isEditing && setFormData(prev => ({ ...prev, weeklyReports: !prev.weeklyReports }))}
                                    className={`w-11 h-6 flex-shrink-0 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                                        formData.weeklyReports ? 'bg-primary justify-end' : 'bg-outline-variant justify-start'
                                    } ${!isEditing ? 'opacity-50 cursor-default' : ''}`}
                                >
                                    <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                                </button>
                            </div>
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
                                <span className="material-symbols-outlined text-[18px]">lock</span>
                                Change Password
                            </button>
                            <button className="px-4 py-2 rounded-lg border border-outline-variant text-red-600 font-label-md text-label-md font-medium hover:bg-red-50 transition-colors inline-flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};