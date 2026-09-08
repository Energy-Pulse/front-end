export const BenchmarksTable = ({ data }) => {
    return (
        <div className="border border-outline-variant rounded-xl overflow-hidden shadow-sm table-premium">
            <div className="overflow-x-auto">
                <table className="w-full text-left font-body-sm text-body-sm border-collapse">
                    <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant font-label-sm text-label-sm text-secondary">
                        <th className="py-3.5 px-5 font-semibold text-primary">Model Architecture</th>
                        <th className="py-3.5 px-5 font-semibold text-primary">Target Resolution</th>
                        <th className="py-3.5 px-5 font-semibold text-primary">Mean Absolute Error (MAE)</th>
                        <th className="py-3.5 px-5 font-semibold text-primary">Root Mean Squared Error (RMSE)</th>
                        <th className="py-3.5 px-5 font-semibold text-primary">Variance Explained (R²)</th>
                        <th className="py-3.5 px-5 font-semibold text-primary">Inference Latency</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                    {data.map((model, index) => (
                        <tr key={index} className="hover:bg-surface-container-low/50 transition-colors duration-200">
                            <td className="py-3.5 px-5 font-medium text-primary flex items-center gap-2">
                                    <span
                                        className={`w-2 h-2 rounded-full ${
                                            model.isBest ? 'bg-primary' : index === 1 ? 'bg-secondary' : 'bg-outline'
                                        }`}
                                    />
                                <span>{model.name}</span>
                                {model.isBest && (
                                    <span className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                            Best
                                        </span>
                                )}
                            </td>
                            <td className="py-3.5 px-5 text-secondary">{model.resolution}</td>
                            <td className="py-3.5 px-5 font-semibold text-primary metric-value">{model.mae}</td>
                            <td className="py-3.5 px-5 font-semibold text-primary metric-value">{model.rmse}</td>
                            <td className="py-3.5 px-5">
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                                            model.isBest
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : 'bg-surface-container-high text-primary border-outline-variant'
                                        }`}
                                    >
                                        {model.r2}
                                    </span>
                            </td>
                            <td className="py-3.5 px-5 text-secondary">{model.latency}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};