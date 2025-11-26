'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const auth = localStorage.getItem('teacherAuth');
    if (!auth) {
      router.push('/platform/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Vertical Navbar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6">
          <div className="w-40">
            <Image
              src="/logo.png"
              alt="Canadian Math League"
              width={160}
              height={80}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavLink href="/platform/dashboard" icon="dashboard">
            Dashboard
          </NavLink>
          <NavLink href="/platform/details" icon="details">
            Details
          </NavLink>
          <NavLink href="/platform/competition" icon="competition">
            Competition
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.removeItem('teacherAuth');
              router.push('/platform/login');
            }}
            className="w-full flex items-center space-x-2 text-gray-600 hover:text-red-600 p-2 rounded-md transition-colors"
          >
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
    >
      <span className="material-icons">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}