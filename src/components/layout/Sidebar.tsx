import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Home, 
  Video, 
  BookOpen, 
  BarChart3, 
  Users, 
  Settings,
  FileText,
  Activity,
  TrendingUp,
  MessageSquare,
  X,
  Shield,
  Database,
  Monitor,
  UserCog
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location.pathname, isMobile, isOpen, onClose]);

  const isAdmin = user?.role === 'admin';

  // User navigation items - Light and friendly
  const userNavItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      href: '/dashboard',
      description: 'Overview and quick access'
    },
    { 
      icon: Video, 
      label: 'Transcription', 
      href: '/transcription',
      description: 'Convert speech to text'
    },
    { 
      icon: BookOpen, 
      label: 'Education', 
      href: '/education',
      description: 'Learning resources'
    },
    { 
      icon: FileText, 
      label: 'History', 
      href: '/transcription-history',
      description: 'Past transcriptions'
    },
    { 
      icon: BarChart3, 
      label: 'Reports', 
      href: '/reports',
      description: 'Analytics and insights'
    },
    { 
      icon: MessageSquare, 
      label: 'Feedback', 
      href: '/feedback',
      description: 'Share your thoughts'
    }
  ];

  // Admin navigation items - Professional and system-focused
  const adminNavItems = [
    { 
      icon: Monitor, 
      label: 'System Overview', 
      href: '/admin',
      description: 'Dashboard & metrics'
    },
    { 
      icon: Users, 
      label: 'User Management', 
      href: '/admin/users',
      description: 'Manage system users'
    },
    { 
      icon: Database, 
      label: 'Content Management', 
      href: '/admin/content',
      description: 'Manage app content'
    },
    { 
      icon: Activity, 
      label: 'System Analytics', 
      href: '/admin/analytics',
      description: 'System performance'
    },
    { 
      icon: TrendingUp, 
      label: 'User Analytics', 
      href: '/admin/user-analytics',
      description: 'User behavior data'
    },
    { 
      icon: BarChart3, 
      label: 'Content Analytics', 
      href: '/admin/content-analytics',
      description: 'Content performance'
    },
    { 
      icon: MessageSquare, 
      label: 'Feedback Management', 
      href: '/admin/feedback',
      description: 'User feedback review'
    },
    { 
      icon: UserCog, 
      label: 'User Accounts', 
      href: '/admin/accounts',
      description: 'Account management'
    },
    { 
      icon: Shield, 
      label: 'Security & Compliance', 
      href: '/admin/security',
      description: 'Security settings'
    },
    { 
      icon: Settings, 
      label: 'System Settings', 
      href: '/admin/settings',
      description: 'Global configuration'
    }
  ];

  const navigationItems = isAdmin ? adminNavItems : userNavItems;
  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <motion.div
        ref={sidebarRef}
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={cn(
          "flex flex-col h-full w-[280px] shadow-xl border-r",
          "fixed left-0 top-0 z-50",
          // Admin Theme - Dark professional
          isAdmin ? [
            "bg-gray-800/95 backdrop-blur-md border-gray-700/50",
            "text-gray-100"
          ] : [
            // User Theme - Light friendly
            "bg-white/95 backdrop-blur-md border-gray-200/50",
            "text-gray-900"
          ],
          !isOpen && "pointer-events-none"
        )}
      >
        {/* Header */}
        <div className={cn(
          "p-6 border-b pt-20",
          isAdmin ? "border-gray-700/50" : "border-gray-200/50"
        )}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={cn(
                "text-lg font-semibold",
                isAdmin ? "text-gray-100" : "text-gray-900"
              )}>
                {isAdmin ? 'Admin Console' : 'Navigation'}
              </h2>
              <p className={cn(
                "text-sm mt-1",
                isAdmin ? "text-gray-400" : "text-gray-500"
              )}>
                {isAdmin ? `System Administrator` : `Welcome back, ${user.name}`}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={cn(
                "h-8 w-8 p-0 transition-opacity",
                isAdmin 
                  ? "hover:bg-gray-700 opacity-60 hover:opacity-100 text-gray-400 hover:text-gray-200" 
                  : "hover:bg-gray-100 opacity-60 hover:opacity-100"
              )}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div 
          className="flex-1 py-4 scrollbar-hidden" 
          style={{ 
            overflow: 'hidden auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <nav className="space-y-1 px-4">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isOpen ? 1 : 0, 
                    x: isOpen ? 0 : -20 
                  }}
                  transition={{ 
                    delay: isOpen ? index * 0.03 : 0,
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                >
                  <Link
                    to={item.href}
                    onClick={isMobile ? onClose : undefined}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                      "group relative",
                      // Admin active/hover styles
                      isAdmin ? [
                        active 
                          ? "bg-blue-600 text-white shadow-sm" 
                          : "text-gray-300 hover:text-white hover:bg-gray-700/70",
                        "hover:scale-[1.01] active:scale-[0.99]"
                      ] : [
                        // User active/hover styles  
                        active 
                          ? "bg-primary text-white shadow-sm scale-[1.01]" 
                          : "text-gray-700 hover:text-primary hover:bg-primary/10",
                        "hover:scale-[1.02] active:scale-[0.98]"
                      ]
                    )}
                  >
                    <Icon className={cn(
                      "mr-3 h-5 w-5 transition-colors",
                      isAdmin ? [
                        active ? "text-white" : "text-gray-400 group-hover:text-white"
                      ] : [
                        active ? "text-white" : "text-gray-500 group-hover:text-primary"
                      ]
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.label}</div>
                      <div className={cn(
                        "text-xs mt-0.5 opacity-80 truncate",
                        isAdmin ? [
                          active ? "text-blue-100" : "text-gray-500"
                        ] : [
                          active ? "text-white/80" : "text-gray-500"
                        ]
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <motion.div 
          className={cn(
            "p-4 border-t",
            isAdmin ? "border-gray-700/50" : "border-gray-200/50"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ 
            delay: isOpen ? 0.4 : 0,
            duration: 0.3 
          }}
        >
          <div className={cn(
            "text-xs text-center",
            isAdmin ? "text-gray-500" : "text-gray-500"
          )}>
            LipRead AI v1.0
            {isAdmin && (
              <div className="mt-1 text-blue-400 font-medium">
                Admin Console
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Sidebar;
