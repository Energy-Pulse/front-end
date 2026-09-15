/**
 * Simple error banner.
 * Props:
 *   - message: string to display
 *   - onDismiss: optional callback to clear the error
 */
export const ErrorMessage = ({ message, onDismiss }) => {
    if (!message) return null;

    return (
        <div
            role="alert"
            className="rounded-xl border border-red-500/60 bg-black px-4 py-3 flex items-center gap-3 shadow-lg"
        >
            <span
                className="material-symbols-outlined text-red-500 text-[20px] flex-shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
            >
                error
            </span>

            <p className="flex-1 font-body-sm text-body-sm text-red-400 break-words">
                {message}
            </p>

            {onDismiss && (
                <button
                    type="button"
                    onClick={onDismiss}
                    aria-label="Dismiss"
                    className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-red-500/20 flex items-center justify-center transition-colors"
                >
                    <span className="material-symbols-outlined text-red-500 text-[18px]">
                        close
                    </span>
                </button>
            )}
        </div>
    );
};