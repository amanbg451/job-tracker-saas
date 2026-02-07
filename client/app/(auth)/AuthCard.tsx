import { ReactNode } from 'react';

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ease-out hover:shadow-2xl">
        {children}
      </div>
    </div>
  );
}
