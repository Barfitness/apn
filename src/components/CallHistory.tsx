import { formatDistanceToNow } from 'date-fns';
import { Phone, PhoneOff } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Call {
  id: string;
  phoneNumber: string;
  duration: number;
  status: 'completed' | 'failed' | 'missed';
  timestamp: Date;
  cost: number;
}

// Mock data - replace with actual data from your backend
const calls: Call[] = [
  {
    id: '1',
    phoneNumber: '+1 (555) 123-4567',
    duration: 325,
    status: 'completed',
    timestamp: new Date('2024-03-10T10:30:00'),
    cost: 2.50
  },
  {
    id: '2',
    phoneNumber: '+1 (555) 987-6543',
    duration: 0,
    status: 'failed',
    timestamp: new Date('2024-03-09T15:45:00'),
    cost: 0
  },
  {
    id: '3',
    phoneNumber: '+1 (555) 456-7890',
    duration: 180,
    status: 'completed',
    timestamp: new Date('2024-03-09T09:15:00'),
    cost: 1.75
  },
  {
    id: '4',
    phoneNumber: '+1 (555) 234-5678',
    duration: 0,
    status: 'missed',
    timestamp: new Date('2024-03-08T16:20:00'),
    cost: 0
  }
];

const formatDuration = (seconds: number): string => {
  if (seconds === 0) return '-';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const getStatusColor = (status: Call['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
    case 'failed':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
    case 'missed':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
    default:
      return '';
  }
};

export function CallHistory() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow key={call.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {call.status === 'completed' ? (
                    <Phone className="h-4 w-4 text-green-500" />
                  ) : (
                    <PhoneOff className="h-4 w-4 text-red-500" />
                  )}
                  <Badge className={getStatusColor(call.status)}>
                    {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>{call.phoneNumber}</TableCell>
              <TableCell>{formatDuration(call.duration)}</TableCell>
              <TableCell>{formatDistanceToNow(call.timestamp, { addSuffix: true })}</TableCell>
              <TableCell className="text-right">
                ${call.cost.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
