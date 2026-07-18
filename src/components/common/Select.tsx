
interface SelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
}

export function Select({ label, value, onChange, options }: SelectProps) {
    return (
        <div className="flex items-center">
            <label className="sr-only">{label}</label>
            <select
                aria-label={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-8 rounded-md border border-gray-200 bg-white px-2.5 py-0 text-sm text-gray-700 shadow-xs focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-colors hover:border-gray-300"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
