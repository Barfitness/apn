import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { CallInterface } from './CallInterface';

export function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="w-64 flex-shrink-0" />
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
        <CallInterface />
      </main>
    </div>
  );
}
