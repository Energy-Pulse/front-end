import { useState } from 'react';

// Mock data for household members and smart appliances
const initialMembers = [
    { id: 1, name: 'Alex Johnson', role: 'Household Admin', email: 'alex@smartenergy.ai', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', role: 'Member', email: 'sarah@smartenergy.ai', status: 'Active' },
    { id: 3, name: 'Guest Access', role: 'Limited', email: 'guest@smartenergy.ai', status: 'Pending' },
];

const initialAppliances = [
    { id: 1, name: 'HVAC Air Heat Pump', category: 'Climate Control', usage: '4.2 kWh/day', status: 'Online', automated: true },
    { id: 2, name: 'EV Charger Level 2', category: 'Transportation', usage: '6.8 kWh/day', status: 'Scheduled', automated: true },
    { id: 3, name: 'Smart Inverter Refrigerator', category: 'Kitchen', usage: '1.2 kWh/day', status: 'Online', automated: false },
    { id: 4, name: 'Dual Washer Dryer', category: 'Laundry', usage: '2.1 kWh/day', status: 'Idle', automated: false },
];

export const Household = () => {
    const [members] = useState(initialMembers);
    const [appliances, setAppliances] = useState(initialAppliances);

    const toggleAutomation = (id) => {
        setAppliances(prev =>
            prev.map(app => (app.id === id ? { ...app, automated: !app.automated } : app))
        );
    };

    return (
        <div className="space-y-6">
            {/* Header / Welcome */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
                <div>
                    <h1 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight">
                        Household Management
                    </h1>
                    <p className="font-body-md text-body-md text-secondary mt-1">
                        Manage members, connected devices, and load-shedding parameters
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-9 px-4 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-on-surface-variant transition-colors inline-flex items-center gap-2 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Add Member
                    </button>
                </div>
            </div>

            {/* Members Section */}
            <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">Household Access & Roles</h3>
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                        {members.length} Registered Users
                    </span>
                </div>
                <div className="divide-y divide-outline-variant">
                    {members.map((m) => (
                        <div key={m.id} className="py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-semibold text-primary">
                                    {m.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-label-md text-label-md font-semibold text-primary">{m.name}</div>
                                    <div className="font-body-sm text-body-sm text-secondary">{m.email}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-low border border-outline-variant text-primary font-medium">
                                    {m.role}
                                </span>
                                <span className="material-symbols-outlined text-secondary text-[20px] cursor-pointer hover:text-primary">
                                    more_vert
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Smart Connected Appliances Section */}
            <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">Connected Smart Appliances</h3>
                        <p className="font-body-sm text-body-sm text-secondary mt-0.5">Automated shedding controls for peak tariff periods</p>
                    </div>
                    <button className="h-9 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors inline-flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">sync</span>
                        Scan Network
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {appliances.map((app) => (
                        <div key={app.id} className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest flex flex-col justify-between space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[22px]">
                                            {app.category === 'Climate Control' ? 'thermostat' : app.category === 'Transportation' ? 'ev_station' : 'power'}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-headline-sm text-headline-sm font-semibold text-primary">{app.name}</h4>
                                        <p className="font-body-sm text-body-sm text-secondary">{app.category}</p>
                                    </div>
                                </div>
                                <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded border ${
                                    app.status === 'Online' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-surface-container-low text-secondary border-outline-variant'
                                }`}>
                                    {app.status}
                                </span>
                            </div>

                            <div className="pt-3 border-t border-outline-variant flex items-center justify-between font-label-md text-label-md">
                                <span className="text-secondary">Est. Usage: <strong className="text-primary">{app.usage}</strong></span>
                                <div className="flex items-center gap-2">
                                    <span className="text-body-sm text-secondary">Auto-Shedding</span>
                                    <button
                                        onClick={() => toggleAutomation(app.id)}
                                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                                            app.automated ? 'bg-primary justify-end' : 'bg-outline-variant justify-start'
                                        }`}
                                    >
                                        <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};