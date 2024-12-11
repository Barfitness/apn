import { Contact } from '@/types/contacts';
import { format } from 'date-fns';

export function exportToCSV(contacts: Contact[], filename: string) {
  // CSV Headers
  const headers = ['Name', 'Company', 'Business Category', 'Phone', 'Address', 'Created Date'];
  
  // Convert contacts to CSV rows
  const rows = contacts.map(contact => [
    contact.name,
    contact.company,
    contact.category,
    contact.phone,
    contact.address,
    format(new Date(contact.createdAt), 'MMM d, yyyy')
  ]);

  // Combine headers and rows
  const csvContent = [
    headers,
    ...rows
  ].map(row => 
    row.map(cell => 
      // Escape quotes and wrap in quotes if contains comma or quotes
      `"${String(cell).replace(/"/g, '""')}"`
    ).join(',')
  ).join('\n');

  // Add UTF-8 BOM
  const BOM = '\uFEFF';
  const csvContentWithBOM = BOM + csvContent;

  // Create blob and download
  const blob = new Blob([csvContentWithBOM], { type: 'text/csv;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
