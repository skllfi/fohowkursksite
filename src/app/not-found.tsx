import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">404</h1>
        <div className="h-12 border-l border-gray-400"></div>
        <p>This page could not be found.</p>
      </div>
      <Link href="/" className="mt-8 text-sm text-gray-300 hover:text-white">
        Return Home
      </Link>
    </div>
  );
}
