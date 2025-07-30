
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, 
  Activity, 
  BarChart3, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Settings,
  Eye,
  UserPlus
} from 'lucide-react';

const AdminDashboard = () => {
  const { toast } = useToast();

  const systemStats = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+12% this month',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Active Sessions',
      value: '89',
      change: 'Currently online',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'System Accuracy',
      value: '91.2%',
      change: '+2.1% improvement',
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      title: 'Storage Used',
      value: '847 GB',
      change: '78% of capacity',
      icon: FileText,
      color: 'text-orange-600'
    }
  ];

  const recentAlerts = [
    {
      type: 'warning',
      message: 'High server load detected',
      time: '5 minutes ago',
      severity: 'medium'
    },
    {
      type: 'info',
      message: 'System backup completed successfully',
      time: '2 hours ago',
      severity: 'low'
    },
    {
      type: 'error',
      message: 'Failed login attempts threshold exceeded',
      time: '3 hours ago',
      severity: 'high'
    }
  ];

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action triggered",
      description: `${action} functionality initiated`,
      duration: 3000,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const breadcrumbItems = [
    { title: 'Admin', href: '/admin' },
    { title: 'Dashboard' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <BreadcrumbNav items={breadcrumbItems} showBackButton={false} />
      
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          System Overview
        </h1>
        <p className="text-gray-300 mt-1">
          Real-time system monitoring and administrative controls
        </p>
      </div>

      {/* System Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in backdrop-blur-sm" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-100 mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 text-cyan-400`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm animate-fade-in">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-gray-400">Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white transition-all duration-200 hover:scale-105 shadow-lg" 
              onClick={() => handleQuickAction("User Management")}
              asChild
            >
              <a href="/admin/users">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </a>
            </Button>
            <Button 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105 shadow-lg" 
              onClick={() => handleQuickAction("Content Management")}
              asChild
            >
              <a href="/admin/content">
                <FileText className="h-6 w-6" />
                <span>Edit Content</span>
              </a>
            </Button>
            <Button 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white transition-all duration-200 hover:scale-105 shadow-lg" 
              onClick={() => handleQuickAction("System Analytics")}
              asChild
            >
              <a href="/admin/analytics">
                <BarChart3 className="h-6 w-6" />
                <span>View Analytics</span>
              </a>
            </Button>
            <Button 
              className="h-auto p-4 flex flex-col items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white transition-all duration-200 hover:scale-105 shadow-lg" 
              onClick={() => handleQuickAction("System Settings")}
            >
              <Settings className="h-6 w-6" />
              <span>System Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm animate-fade-in">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent System Alerts
            </CardTitle>
            <CardDescription className="text-gray-400">Important notifications and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-700/50 bg-slate-900/30 transition-all duration-200 hover:bg-slate-700/30 hover:border-slate-600/50 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-200">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <Badge className={`${getSeverityColor(alert.severity)} border`}>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm animate-fade-in">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              System Performance
            </CardTitle>
            <CardDescription className="text-gray-400">Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Word Error Rate (WER)</span>
                <span className="text-emerald-400 font-medium">8.8%</span>
              </div>
              <Progress value={91.2} className="h-2 bg-slate-700" />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Character Error Rate (CER)</span>
                <span className="text-emerald-400 font-medium">5.1%</span>
              </div>
              <Progress value={94.9} className="h-2 bg-slate-700" />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Overall System Accuracy</span>
                <span className="text-emerald-400 font-medium">91.2%</span>
              </div>
              <Progress value={91.2} className="h-2 bg-slate-700" />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Server Uptime</span>
                <span className="text-emerald-400 font-medium">99.8%</span>
              </div>
              <Progress value={99.8} className="h-2 bg-slate-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
