'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/students', label: 'Students' },
    { href: '/teachers', label: 'Teachers' },
    { href: '/courses', label: 'Courses' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#E5E5E5] h-16">
      <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-medium text-black">
            Course & Teacher Management
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-[#737373] hover:text-black hover:bg-[#F5F5F5]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}