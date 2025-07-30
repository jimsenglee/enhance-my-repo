import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedBreadcrumb from '@/components/ui/animated-breadcrumb';
import { 
  BarChart3, 
  TrendingUp, 
  Users,
  Activity,
  MessageSquare,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const SystemAnalytics = () => {
  const breadcrumbItems = [
    { title: 'Admin Dashboard', href: '/admin' },
    { title: 'System Analytics' }
  ];

  const globalMetrics = [
    {
      name: 'Word Error Rate (WER)',
      value: '8.3%',
      trend: '-1.2%',
      target: '<10%',
      status: 'good'
    },
    {
      name: 'Character Error Rate (CER)',
      value: '5.1%',
      trend: '-0.8%',
      target: '<7%',
      status: 'good'
    },
    {
      name: 'Match Error Rate (MER)',
      value: '7.2%',
      trend: '-0.5%',
      target: '<8%',
      status: 'good'
    },
    {
      name: 'System Availability',
      value: '99.8%',
      trend: '+0.1%',
      target: '>99.5%',
      status: 'excellent'
    }
  ];

  const userEngagement = [
    { metric: 'Daily Active Users', value: 847, change: '+12%', period: 'vs last week' },
    { metric: 'Average Session Duration', value: '18:45', change: '+3 min', period: 'vs last month' },
    { metric: 'Session Completion Rate', value: '92%', change: '+5%', period: 'vs last month' },
    { metric: 'Feature Adoption Rate', value: '76%', change: '+8%', period: 'vs last quarter' }
  ];

  const feedbackData = [
    { 
      category: 'Accuracy Issues',
      count: 23,
      severity: 'high',
      trend: '-15%',
      description: 'Users reporting transcription accuracy problems'
    },
    {
      category: 'Interface Feedback',
      count: 47,
      severity: 'medium',
      trend: '+5%',
      description: 'Suggestions for UI/UX improvements'
    },
    {
      category: 'Feature Requests',
      count: 156,
      severity: 'low',
      trend: '+22%',
      description: 'New feature ideas and enhancement requests'
    },
    {
      category: 'Technical Issues',
      count: 12,
      severity: 'high',
      trend: '-40%',
      description: 'Bugs and technical problems reported'
    }
  ];

  const performanceData = [
    { area: 'Vowel Recognition', accuracy: 94, improvement: '+2%', volume: 1247 },
    { area: 'Consonant Recognition', accuracy: 89, improvement: '+1%', volume: 2134 },
    { area: 'Number Recognition', accuracy: 92, improvement: '+3%', volume: 567 },
    { area: 'Phrase Recognition', accuracy: 86, improvement: '+1%', volume: 891 },
    { area: 'Name Recognition', accuracy: 78, improvement: '+4%', volume: 423 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-admin-success';
      case 'good': return 'text-admin-info';
      case 'warning': return 'text-admin-warning';
      case 'critical': return 'text-admin-error';
      default: return 'text-admin-muted-foreground';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-admin-error/10 text-admin-error border-admin-error/20';
      case 'medium': return 'bg-admin-warning/10 text-admin-warning border-admin-warning/20';
      case 'low': return 'bg-admin-success/10 text-admin-success border-admin-success/20';
      default: return 'bg-admin-muted text-admin-muted-foreground';
    }
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return 'text-admin-success';
    if (accuracy >= 80) return 'text-admin-warning';
    return 'text-admin-error';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatedBreadcrumb items={breadcrumbItems} />
      
      <div className="bg-admin-card border border-admin-border rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-admin-primary">System Analytics</h1>
        <p className="text-admin-muted-foreground mt-1">
          Global performance metrics and user engagement insights
        </p>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-admin-accent border border-admin-border">
          <TabsTrigger value="performance" className="flex items-center gap-2 data-[state=active]:bg-admin-primary data-[state=active]:text-admin-primary-foreground">
            <BarChart3 className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2 data-[state=active]:bg-admin-primary data-[state=active]:text-admin-primary-foreground">
            <Users className="h-4 w-4" />
            User Engagement
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2 data-[state=active]:bg-admin-primary data-[state=active]:text-admin-primary-foreground">
            <MessageSquare className="h-4 w-4" />
            Feedback Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Global Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalMetrics.map((metric, index) => (
              <Card key={index} className="bg-admin-card border-admin-border hover:shadow-lg hover:shadow-admin-primary/10 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-admin-primary">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className={`text-3xl font-bold ${getStatusColor(metric.status)}`}>
                      {metric.value}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-admin-success flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {metric.trend}
                      </span>
                      <span className="text-admin-muted-foreground">Target: {metric.target}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Performance Breakdown */}
          <Card className="bg-admin-card border-admin-border">
            <CardHeader>
              <CardTitle className="text-admin-primary">Recognition Performance by Category</CardTitle>
              <CardDescription className="text-admin-muted-foreground">Accuracy metrics across different recognition areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceData.map((area, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-admin-foreground">{area.area}</span>
                        <Badge variant="outline" className="border-admin-border text-admin-muted-foreground">{area.volume} samples</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${getAccuracyColor(area.accuracy)}`}>
                          {area.accuracy}%
                        </span>
                        <span className="text-sm text-admin-success">{area.improvement}</span>
                      </div>
                    </div>
                    <Progress value={area.accuracy} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-admin-card border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-primary">System Health</CardTitle>
                <CardDescription className="text-admin-muted-foreground">Current system performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-foreground">API Response Time</span>
                  <span className="text-sm font-medium text-admin-success">245ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-foreground">Active Connections</span>
                  <span className="text-sm font-medium text-admin-foreground">847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-foreground">Error Rate</span>
                  <span className="text-sm font-medium text-admin-success">0.02%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-foreground">Uptime</span>
                  <span className="text-sm font-medium text-admin-success">99.8%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-admin-card border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-primary">Model Performance</CardTitle>
                <CardDescription className="text-admin-muted-foreground">AI model metrics and improvements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-foreground">Model Version</span>
                  <span className="text-sm font-medium text-admin-foreground">v2.1.3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-foreground">Training Data Size</span>
                  <span className="text-sm font-medium text-admin-foreground">2.3M samples</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-foreground">Inference Time</span>
                  <span className="text-sm font-medium text-admin-success">85ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-foreground">Model Accuracy</span>
                  <span className="text-sm font-medium text-admin-success">91.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userEngagement.map((metric, index) => (
              <Card key={index} className="bg-admin-card border-admin-border hover:shadow-lg hover:shadow-admin-primary/10 transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-admin-primary">{metric.metric}</p>
                    <p className="text-3xl font-bold text-admin-foreground">{metric.value}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-admin-success font-medium">{metric.change}</span>
                      <span className="text-sm text-admin-muted-foreground">{metric.period}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Usage Patterns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-admin-card border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-primary">Feature Usage</CardTitle>
                <CardDescription className="text-admin-muted-foreground">Most popular features by usage volume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-foreground">Real-time Transcription</span>
                    <div className="flex items-center gap-2">
                      <Progress value={89} className="w-20 h-2" />
                      <span className="text-sm font-medium text-admin-foreground">89%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-foreground">Educational Modules</span>
                    <div className="flex items-center gap-2">
                      <Progress value={76} className="w-20 h-2" />
                      <span className="text-sm font-medium text-admin-foreground">76%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-foreground">Video Upload</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20 h-2" />
                      <span className="text-sm font-medium text-admin-foreground">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-foreground">Practice Mode</span>
                    <div className="flex items-center gap-2">
                      <Progress value={62} className="w-20 h-2" />
                      <span className="text-sm font-medium text-admin-foreground">62%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-foreground">Progress Reports</span>
                    <div className="flex items-center gap-2">
                      <Progress value={33} className="w-20 h-2" />
                      <span className="text-sm font-medium text-admin-foreground">33%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-admin-card border-admin-border">
              <CardHeader>
                <CardTitle className="text-admin-primary">User Retention</CardTitle>
                <CardDescription className="text-admin-muted-foreground">User activity and retention metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-foreground">1-Day Retention</span>
                    <span className="text-sm font-medium text-admin-success">84%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-foreground">7-Day Retention</span>
                    <span className="text-sm font-medium text-admin-success">67%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-foreground">30-Day Retention</span>
                    <span className="text-sm font-medium text-admin-warning">43%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-foreground">Average Sessions/User</span>
                    <span className="text-sm font-medium text-admin-foreground">12.3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-admin-foreground">Churn Rate</span>
                    <span className="text-sm font-medium text-admin-error">8.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          {/* Feedback Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-admin-card border-admin-border">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-admin-primary">4.6</div>
                <div className="text-sm text-admin-muted-foreground">Average Rating</div>
                <div className="flex justify-center mt-2">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-admin-warning fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-admin-card border-admin-border">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-admin-success">238</div>
                <div className="text-sm text-admin-muted-foreground">Total Feedback</div>
                <div className="text-xs text-admin-muted-foreground mt-1">This month</div>
              </CardContent>
            </Card>
            <Card className="bg-admin-card border-admin-border">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-admin-primary">87%</div>
                <div className="text-sm text-admin-muted-foreground">Satisfaction Rate</div>
                <div className="text-xs text-admin-success mt-1">+3% from last month</div>
              </CardContent>
            </Card>
            <Card className="bg-admin-card border-admin-border">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-admin-warning">35</div>
                <div className="text-sm text-admin-muted-foreground">Active Issues</div>
                <div className="text-xs text-admin-error mt-1">-12 from last week</div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Categories */}
          <Card className="bg-admin-card border-admin-border">
            <CardHeader>
              <CardTitle className="text-admin-primary">Feedback Analysis</CardTitle>
              <CardDescription className="text-admin-muted-foreground">Categorized user feedback and issue tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackData.map((category, index) => (
                  <div key={index} className="border border-admin-border rounded-lg p-4 hover:bg-admin-accent transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-admin-primary/10 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-admin-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-admin-primary">{category.category}</h3>
                          <p className="text-sm text-admin-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(category.severity)}>
                          {category.severity}
                        </Badge>
                        <span className="text-lg font-bold text-admin-primary">{category.count}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={category.trend.includes('+') ? 'text-admin-error' : 'text-admin-success'}>
                        {category.trend} from last month
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card className="bg-admin-card border-admin-border">
            <CardHeader>
              <CardTitle className="text-admin-primary">Recommended Actions</CardTitle>
              <CardDescription className="text-admin-muted-foreground">Priority actions based on feedback analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border border-admin-border rounded-lg hover:bg-admin-accent transition-colors">
                  <AlertTriangle className="h-5 w-5 text-admin-error mt-0.5" />
                  <div>
                    <div className="font-medium text-admin-primary">Address Accuracy Issues</div>
                    <div className="text-sm text-admin-muted-foreground">23 users reported transcription accuracy problems - investigate model performance</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border border-admin-border rounded-lg hover:bg-admin-accent transition-colors">
                  <CheckCircle className="h-5 w-5 text-admin-success mt-0.5" />
                  <div>
                    <div className="font-medium text-admin-primary">Continue UI Improvements</div>
                    <div className="text-sm text-admin-muted-foreground">47 interface suggestions - prioritize most requested features</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border border-admin-border rounded-lg hover:bg-admin-accent transition-colors">
                  <Activity className="h-5 w-5 text-admin-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-admin-primary">Review Feature Requests</div>
                    <div className="text-sm text-admin-muted-foreground">156 new feature ideas - evaluate feasibility and user impact</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemAnalytics;
