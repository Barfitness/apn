import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Dashboard } from '@/components/Dashboard';
import { Toaster } from '@/components/ui/toaster';
import { MainLayout } from '@/components/MainLayout';
import { CallLogsPage } from '@/pages/CallLogsPage';
import { AssistantsPage } from '@/pages/AssistantsPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { ApiKeysPage } from '@/pages/ApiKeysPage';
import { SettingsPage } from '@/pages/SettingsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calls" element={<CallLogsPage />} />
                <Route path="/assistants" element={<AssistantsPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/api-keys" element={<ApiKeysPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
