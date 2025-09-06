import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  Heart,
  Brain,
  MessageSquare,
  BookOpen,
  Download,
  Filter
} from 'lucide-react';

const monthlyData = [
  { name: 'Jan', assessments: 120, sessions: 85, resources: 340 },
  { name: 'Feb', assessments: 190, sessions: 125, resources: 450 },
  { name: 'Mar', assessments: 180, sessions: 140, resources: 520 },
  { name: 'Apr', assessments: 220, sessions: 165, resources: 680 },
  { name: 'May', assessments: 250, sessions: 180, resources: 750 },
  { name: 'Jun', assessments: 300, sessions: 220, resources: 890 }
];

const dailyActiveUsers = [
  { name: 'Mon', users: 45 },
  { name: 'Tue', users: 52 },
  { name: 'Wed', users: 48 },
  { name: 'Thu', users: 61 },
  { name: 'Fri', users: 55 },
  { name: 'Sat', users: 38 },
  { name: 'Sun', users: 42 }
];

const assessmentScores = [
  { name: 'Minimal (0-4)', phq9: 35, gad7: 40, color: '#10b981' },
  { name: 'Mild (5-9)', phq9: 28, gad7: 25, color: '#f59e0b' },
  { name: 'Moderate (10-14)', phq9: 22, gad7: 20, color: '#f97316' },
  { name: 'Severe (15+)', phq9: 15, gad7: 15, color: '#ef4444' }
];

const sessionTypes = [
  { name: 'Video Call', value: 45, color: '#3b82f6' },
  { name: 'Phone Call', value: 25, color: '#10b981' },
  { name: 'Text Chat', value: 20, color: '#f59e0b' },
  { name: 'In-Person', value: 10, color: '#8b5cf6' }
];

const resourceUsage = [
  { name: 'Videos', views: 1250, engagement: 85 },
  { name: 'Articles', views: 980, engagement: 72 },
  { name: 'Audio', views: 760, engagement: 88 },
  { name: 'Exercises', views: 540, engagement: 91 }
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const StatCard = ({ title, value, change, icon: Icon, color = 'text-primary' }: any) => (
    <Card className="rounded-2xl border-accent/20 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`w-4 h-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
          {' '}from last month
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span>Admin Dashboard</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Anonymous insights and platform analytics
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Privacy Notice */}
        <Card className="rounded-2xl border-accent/20 shadow-sm bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Privacy-First Analytics</h3>
                <p className="text-sm text-blue-800 mt-1">
                  All data is anonymized and aggregated to protect user privacy. No personally identifiable information is stored or displayed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Assessments"
            value="1,247"
            change={12}
            icon={Brain}
            color="text-blue-600"
          />
          <StatCard
            title="Active Users"
            value="892"
            change={8}
            icon={Users}
            color="text-green-600"
          />
          <StatCard
            title="Counseling Sessions"
            value="456"
            change={15}
            icon={Calendar}
            color="text-purple-600"
          />
          <StatCard
            title="Resource Views"
            value="3,421"
            change={23}
            icon={BookOpen}
            color="text-orange-600"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-2xl">
            <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
            <TabsTrigger value="mental-health" className="rounded-xl">Mental Health</TabsTrigger>
            <TabsTrigger value="sessions" className="rounded-xl">Sessions</TabsTrigger>
            <TabsTrigger value="resources" className="rounded-xl">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="rounded-2xl border-accent/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Monthly Platform Activity</CardTitle>
                  <CardDescription>
                    Assessments, sessions, and resource usage over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px'
                        }} 
                      />
                      <Legend />
                      <Line type="monotone" dataKey="assessments" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="resources" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-accent/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Daily Active Users</CardTitle>
                  <CardDescription>
                    User engagement throughout the week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={dailyActiveUsers}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px'
                        }} 
                      />
                      <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="rounded-2xl border-accent/20 shadow-sm">
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>
                  Key indicators of platform performance and user wellbeing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-green-600">94%</div>
                      <div className="text-sm text-muted-foreground">User Satisfaction</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-blue-600">2.3m</div>
                      <div className="text-sm text-muted-foreground">Avg. Session Time</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-orange-600">78%</div>
                      <div className="text-sm text-muted-foreground">Return Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mental Health Tab */}
          <TabsContent value="mental-health" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="rounded-2xl border-accent/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Assessment Score Distribution</CardTitle>
                  <CardDescription>
                    PHQ-9 and GAD-7 score ranges (anonymized)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={assessmentScores}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="phq9" fill="#3b82f6" name="Depression (PHQ-9)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="gad7" fill="#10b981" name="Anxiety (GAD-7)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-accent/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Risk Level Overview</CardTitle>
                  <CardDescription>
                    Distribution of users by risk assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Low Risk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">65%</span>
                        <Badge variant="secondary" className="rounded-full">518 users</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Moderate Risk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">25%</span>
                        <Badge variant="secondary" className="rounded-full">199 users</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">High Risk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">10%</span>
                        <Badge variant="secondary" className="rounded-full">79 users</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-red-50 rounded-xl">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-red-900">Crisis Interventions</div>
                        <div className="text-xs text-red-800">
                          12 crisis interventions this month. All users connected with appropriate support.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="rounded-2xl border-accent/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Session Types</CardTitle>
                  <CardDescription>
                    Distribution of counseling session formats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sessionTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sessionTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-accent/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Counselor Performance</CardTitle>
                  <CardDescription>
                    Average ratings and session metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dr. Priya Sharma</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <div key={star} className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">4.9 (124 sessions)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dr. Rajesh Kumar</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <div key={star} className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">4.8 (98 sessions)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dr. Anita Patel</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1,2,3,4].map((star) => (
                            <div key={star} className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
                          ))}
                          <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">4.7 (156 sessions)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-primary">96%</div>
                      <div className="text-xs text-muted-foreground">Attendance Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-primary">4.8</div>
                      <div className="text-xs text-muted-foreground">Avg. Rating</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-primary">47m</div>
                      <div className="text-xs text-muted-foreground">Avg. Duration</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card className="rounded-2xl border-accent/20 shadow-sm">
              <CardHeader>
                <CardTitle>Resource Usage & Engagement</CardTitle>
                <CardDescription>
                  How users interact with self-help resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={resourceUsage}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="views" fill="#3b82f6" name="Total Views" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="engagement" fill="#10b981" name="Engagement %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="rounded-2xl border-accent/20 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Most Popular Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>5-Min Breathing Exercise</span>
                    <span className="font-medium">342 plays</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Understanding Anxiety</span>
                    <span className="font-medium">298 views</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sleep Hygiene Guide</span>
                    <span className="font-medium">256 views</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-accent/20 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Content Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-primary">87%</div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-primary">4.6</div>
                    <div className="text-sm text-muted-foreground">Avg. Rating</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-accent/20 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">User Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Audio Content</span>
                    <span className="font-medium">43%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Video Content</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Written Articles</span>
                    <span className="font-medium">22%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}