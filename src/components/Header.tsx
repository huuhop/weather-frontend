import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-40">
      <h1 className="text-xl font-bold text-blue-600">🌤️ Weather App</h1>
      <nav className="space-x-6">
        <Link href="/" className="text-gray-700 hover:text-blue-500 transition">
          Home
        </Link>
        <Link href="/weather" className="text-gray-700 hover:text-blue-500 transition">
          Weather
        </Link>
        <Link href="/weather-history" className="text-gray-700 hover:text-blue-500 transition">
          Weather History
        </Link>
      </nav>
    </header>
  );
};

export default Header;