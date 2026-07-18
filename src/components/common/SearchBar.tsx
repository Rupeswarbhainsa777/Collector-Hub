import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Search products..." }: SearchBarProps) => {
    return (
        <div className="relative w-full max-w-md">

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaSearch className="w-3.5 h-3.5" />
            </div>


            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black shadow-xs transition-all duration-150"
            />


            {value && (
                <button
                    onClick={() => onChange("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                >
                    <FaTimes className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;