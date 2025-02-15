import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white mb-8">Page Not Found</p>
        <Link 
          to="/" 
          className="text-white bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};