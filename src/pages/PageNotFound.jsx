import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-0 px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <p className="text-base font-semibold text-brand-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-500">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          to="/dashboard"
          className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-brand-600 transition-all hover:text-brand-700"
        >
          <ArrowLeft size={20} />
          <span>Back to home</span>
        </Link>
      </div>
    </main>
  );
}

export default PageNotFound;
