import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const data = Array.from({ length: 31 }, (_, i) => ({
  date: `Apr ${i + 1}`,
  cost: Math.floor(Math.random() * 300) + 100,
  minutes: Math.floor(Math.random() * 200) + 50,
}));

export function Analytics() {
  const totalCost = "$6,571";
  const totalMinutes = "4,555";
  const totalCalls = "1,125";
  const activeAssistants = "2";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Cost Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#costGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{totalCost}</p>
            <p className="text-xs text-muted-foreground">Total costs incurred over the selected time</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Calling Minutes Used</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="minutesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="minutes" 
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#minutesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{totalMinutes}</p>
            <p className="text-xs text-muted-foreground">Total calling minutes used over the selected time</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Number of Calls</h3>
          <p className="text-2xl font-bold mt-2">{totalCalls}</p>
          <p className="text-xs text-muted-foreground">Trending up by 5.2% this month</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Assistants</h3>
          <p className="text-2xl font-bold mt-2">{activeAssistants}</p>
          <p className="text-xs text-muted-foreground">Trending up by 5.2% this month</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Average Cost per Call</h3>
          <p className="text-2xl font-bold mt-2">$0.26</p>
          <p className="text-xs text-muted-foreground">Based on total calls and costs</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Average Call Duration</h3>
          <p className="text-2xl font-bold mt-2">4.05m</p>
          <p className="text-xs text-muted-foreground">Average duration per call</p>
        </Card>
      </div>
    </div>
  );
}
