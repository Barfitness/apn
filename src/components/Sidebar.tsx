import { Home, Phone, Bot, Users, Key, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserSettings } from '@/hooks/use-user-settings';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { settings } = useUserSettings();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/',
    },
    {
      icon: Phone,
      label: 'Call Logs',
      path: '/calls',
    },
    {
      icon: Bot,
      label: 'Assistants',
      path: '/assistants',
    },
    {
      icon: Users,
      label: 'Contacts',
      path: '/contacts',
    },
    {
      icon: Key,
      label: 'API Keys',
      path: '/api-keys',
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
    },
  ];

  return (
    <div className={cn("pb-12 border-r h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-6">
            <Avatar>
              <AvatarImage src={settings.avatarUrl || undefined} />
              <AvatarFallback>{getInitials(settings.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{settings.name}</h2>
              <p className="text-sm text-muted-foreground">
                {settings.email || 'Admin'}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={currentPath === item.path ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
