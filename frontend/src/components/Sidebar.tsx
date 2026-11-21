'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/students', label: 'Students', icon: '🎓' },
    { href: '/teachers', label: 'Teachers', icon: '👨‍🏫' },
    { href: '/courses', label: 'Courses', icon: '📚' },
  ];

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-[#E5E5E5] p-6 overflow-y-auto">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-[#737373] hover:text-black hover:bg-[#F5F5F5]'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}