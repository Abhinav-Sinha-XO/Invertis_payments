export function Button({ label, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors ${className}`}
    >
      {label}
    </button>
  );
}