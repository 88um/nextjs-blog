import Link from 'next/link';
import React from 'react';

interface NotFoundProps {
}

const NotFound: React.FC<NotFoundProps> = ({}) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link href="/">
          <p className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go to Home
          </p>
        </Link>
      </div>
      )
    }

export default NotFound;