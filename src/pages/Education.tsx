
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Play, 
  Search,
  Award,
  Video,
  FileText,
  Camera,
  Filter,
  Star,
  Brain,
  Target,
  BarChart3,
  Settings,
  CheckSquare,
  Square,
  ChevronDown,
  Clock,
  Bookmark,
  BookmarkCheck,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedBreadcrumb from '@/components/ui/animated-breadcrumb';

const Education = () => {
  const navigate = useNavigate();

  // Tutorial data - matching TutorialLibrary structure
  const tutorials = [
    {
      id: 1,
      title: 'Mastering Basic Lip Reading Fundamentals',
      description: 'Learn the essential techniques for reading lips, starting with vowel sounds and basic consonants.',
      duration: '45 min',
      difficulty: 'Beginner' as const,
      category: 'Fundamentals',
      instructor: 'Dr. Sarah Mitchell',
      rating: 4.8,
      students: 1240,
      progress: 100,
      completed: true,
      lessons: 8,
      thumbnail: '/api/placeholder/400/240',
      isBookmarked: true,
      tags: ['vowels', 'consonants', 'basics']
    },
    {
      id: 2,
      title: 'Advanced Phoneme Recognition',
      description: 'Deep dive into complex phoneme patterns and improve your accuracy with challenging sound combinations.',
      duration: '60 min',
      difficulty: 'Advanced' as const,
      category: 'Phonemes',
      instructor: 'Prof. Michael Chen',
      rating: 4.9,
      students: 892,
      progress: 0,
      completed: false,
      lessons: 12,
      thumbnail: '/api/placeholder/400/240',
      isBookmarked: false,
      tags: ['phonemes', 'advanced', 'accuracy']
    },
    {
      id: 3,
      title: 'Everyday Conversation Lip Reading',
      description: 'Practice with real-world conversation scenarios and common phrases used in daily interactions.',
      duration: '35 min',
      difficulty: 'Intermediate' as const,
      category: 'Conversations',
      instructor: 'Emma Rodriguez',
      rating: 4.7,
      students: 2156,
      progress: 65,
      completed: false,
      lessons: 6,
      thumbnail: '/api/placeholder/400/240',
      isBookmarked: true,
      tags: ['conversations', 'daily', 'practical']
    },
    {
      id: 4,
      title: 'Numbers and Time Expression',
      description: 'Master reading numbers, dates, times, and mathematical expressions through lip reading.',
      duration: '25 min',
      difficulty: 'Beginner' as const,
      category: 'Numbers',
      instructor: 'David Kim',
      rating: 4.6,
      students: 1567,
      progress: 30,
      completed: false,
      lessons: 5,
      thumbnail: '/api/placeholder/400/240',
      isBookmarked: false,
      tags: ['numbers', 'time', 'math']
    },
    {
      id: 5,
      title: 'Medical Terminology Lip Reading',
      description: 'Specialized training for understanding medical terms and healthcare communication.',
      duration: '50 min',
      difficulty: 'Advanced' as const,
      category: 'Medical',
      instructor: 'Dr. Lisa Thompson',
      rating: 4.8,
      students: 623,
      progress: 0,
      completed: false,
      lessons: 10,
      thumbnail: '/api/placeholder/400/240',
      isBookmarked: false,
      tags: ['medical', 'healthcare', 'terminology']
    },
    {
      id: 6,
      title: 'Business Communication Skills',
      description: 'Professional lip reading skills for meetings, presentations, and workplace interactions.',
      duration: '40 min',
      difficulty: 'Intermediate' as const,
      category: 'Business',
      instructor: 'Robert Johnson',
      rating: 4.5,
      students: 987,
      progress: 0,
      completed: false,
      lessons: 8,
      thumbnail: '/api/placeholder/400/240',
      isBookmarked: true,
      tags: ['business', 'meetings', 'professional']
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedProgress, setSelectedProgress] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [tutorialData, setTutorialData] = useState(tutorials);

  const categories = ['Fundamentals', 'Phonemes', 'Conversations', 'Numbers', 'Medical', 'Business'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const progressOptions = ['All', 'Not Started', 'In Progress', 'Completed'];
  const sortOptions = ['Recommended', 'Newest', 'Most Popular', 'Difficulty: Easy to Hard', 'Progress: Incomplete First'];

  // Enhanced filtering logic
  const filteredTutorials = tutorialData.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(tutorial.category);
    
    const matchesDifficulty = selectedDifficulty === 'All' || tutorial.difficulty === selectedDifficulty;
    
    let matchesProgress = true;
    if (selectedProgress === 'Not Started') {
      matchesProgress = tutorial.progress === 0 && !tutorial.completed;
    } else if (selectedProgress === 'In Progress') {
      matchesProgress = tutorial.progress > 0 && tutorial.progress < 100 && !tutorial.completed;
    } else if (selectedProgress === 'Completed') {
      matchesProgress = tutorial.completed;
    }
    
    return matchesSearch && matchesCategories && matchesDifficulty && matchesProgress;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return b.id - a.id;
      case 'Most Popular':
        return (b.students || 0) - (a.students || 0);
      case 'Difficulty: Easy to Hard': {
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
      }
      case 'Progress: Incomplete First':
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        return (a.progress || 0) - (b.progress || 0);
      default: // Recommended
        return 0;
    }
  });

  // Filter handlers
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Bookmark toggle function
  const toggleBookmark = (tutorialId: number) => {
    setTutorialData(prev => prev.map(tutorial => 
      tutorial.id === tutorialId 
        ? { ...tutorial, isBookmarked: !tutorial.isBookmarked }
        : tutorial
    ));
  };

  // Breadcrumb items for Education page
  const breadcrumbItems = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Education' }
  ];

  const handleStartLesson = (tutorialId: number) => {
    console.log(`Starting tutorial ${tutorialId}`);
    // Navigate directly to tutorial player using the correct route
    navigate(`/education/tutorial/${tutorialId}`);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Animated Breadcrumbs */}
      <AnimatedBreadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-primary">Lip-Reading Academy</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Master the art of lip-reading with our comprehensive video courses and interactive practice sessions
        </p>
      </motion.div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-primary/10">
          <TabsTrigger value="courses" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <BookOpen className="h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Brain className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Camera className="h-4 w-4" />
            Practice
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* Two-Column Layout: Filters + Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Advanced Filter Sidebar */}
            <motion.div 
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-primary/20 sticky top-4">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Search Courses</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Categories</label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center gap-2">
                          <button
                            onClick={() => handleCategoryToggle(category)}
                            className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors"
                          >
                            {selectedCategories.includes(category) ? (
                              <CheckSquare className="h-4 w-4 text-primary" />
                            ) : (
                              <Square className="h-4 w-4 text-gray-400" />
                            )}
                            <span className="text-sm">{category}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty Level */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Difficulty Level</label>
                    <div className="space-y-2">
                      {difficulties.map((difficulty) => (
                        <div key={difficulty} className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={`difficulty-${difficulty}`}
                            name="difficulty"
                            value={difficulty}
                            checked={selectedDifficulty === difficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="text-primary focus:ring-primary"
                          />
                          <label 
                            htmlFor={`difficulty-${difficulty}`}
                            className="text-sm cursor-pointer"
                          >
                            {difficulty}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Status */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Progress Status</label>
                    <div className="space-y-2">
                      {progressOptions.map((progress) => (
                        <div key={progress} className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={`progress-${progress}`}
                            name="progress"
                            value={progress}
                            checked={selectedProgress === progress}
                            onChange={(e) => setSelectedProgress(e.target.value)}
                            className="text-primary focus:ring-primary"
                          />
                          <label 
                            htmlFor={`progress-${progress}`}
                            className="text-sm cursor-pointer"
                          >
                            {progress}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Sort By</label>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-2 border border-primary/20 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white appearance-none pr-8"
                      >
                        {sortOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategories([]);
                      setSelectedDifficulty('All');
                      setSelectedProgress('All');
                      setSortBy('Recommended');
                    }}
                    className="w-full border-primary/20 text-primary hover:bg-primary/10"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Results Summary */}
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-sm text-gray-600">
                  Showing {filteredTutorials.length} of {tutorialData.length} tutorials
                  {selectedCategories.length > 0 && (
                    <span className="ml-2">
                      in {selectedCategories.join(', ')}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {selectedCategories.map((category) => (
                    <Badge 
                      key={category} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category} ×
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Tutorial Grid - TutorialLibrary Style */}
              {filteredTutorials.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, staggerChildren: 0.1 }}
                >
                  {filteredTutorials.map((tutorial, index) => (
                    <motion.div
                      key={tutorial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Card className="h-full border-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col">
                        <div className="relative w-full">
                          <img 
                            src={tutorial.thumbnail} 
                            alt={tutorial.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {tutorial.duration}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(tutorial.id);
                            }}
                          >
                            {tutorial.isBookmarked ? (
                              <BookmarkCheck className="h-4 w-4 text-primary" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant={tutorial.difficulty === 'Beginner' ? 'secondary' : 
                                           tutorial.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                              {tutorial.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-yellow-500">
                              <Star className="h-3 w-3 fill-current" />
                              {tutorial.rating}
                            </div>
                          </div>
                          
                          <CardHeader className="p-0 mb-3">
                            <CardTitle className="text-lg leading-tight">{tutorial.title}</CardTitle>
                            <CardDescription className="text-sm">{tutorial.description}</CardDescription>
                          </CardHeader>
                          
                          <div className="space-y-3 mt-auto">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>By {tutorial.instructor}</span>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {tutorial.students.toLocaleString()}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {tutorial.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <Button 
                              className="w-full bg-primary hover:bg-primary/90"
                              onClick={() => handleStartLesson(tutorial.id)}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Watch Now
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No tutorials found</h3>
                <p className="text-gray-400 mb-4">
                  No tutorials match your current filters. Try adjusting your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategories([]);
                    setSelectedDifficulty('All');
                    setSelectedProgress('All');
                    setSortBy('Recommended');
                  }}
                  className="border-primary/20 text-primary hover:bg-primary/10"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-6">
          {/* Interactive Quizzes Overview */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-primary">Interactive Quizzes</h2>
            <p className="text-gray-600">Test your lip-reading skills with video-based quizzes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                  onClick={() => navigate('/education/quizzes')}>
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Take Quiz</h3>
                <p className="text-gray-600 mb-4">Challenge yourself with interactive video quizzes</p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quiz Results</h3>
                <p className="text-gray-600 mb-4">View your quiz history and performance</p>
                <div className="text-2xl font-bold text-green-600 mb-2">87%</div>
                <p className="text-sm text-gray-500">Average Score</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Achievements</h3>
                <p className="text-gray-600 mb-4">Unlock badges and milestones</p>
                <div className="text-2xl font-bold text-yellow-600 mb-2">5</div>
                <p className="text-sm text-gray-500">Badges Earned</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          {/* Real-time Practice Mode Overview */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-primary">Real-Time Practice Mode</h2>
            <p className="text-gray-600">Practice lip formation with live webcam feedback</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                  onClick={() => navigate('/education/practice')}>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Camera className="h-16 w-16 mx-auto text-primary" />
                  <h3 className="text-xl font-semibold">Start Practice</h3>
                  <p className="text-gray-600">Begin real-time lip reading practice with webcam</p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Launch Practice Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Practice Categories</h3>
                <div className="space-y-3">
                  {['Basic Words', 'Greetings', 'Numbers', 'Colors', 'Actions'].map((category) => (
                    <div key={category} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>{category}</span>
                      <Badge variant="outline">Available</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {/* Progress Overview */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-primary">Progress & Performance</h2>
            <p className="text-gray-600">Track your learning journey and achievements</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                  onClick={() => navigate('/education/progress')}>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <BarChart3 className="h-16 w-16 mx-auto text-primary" />
                  <h3 className="text-xl font-semibold">View Detailed Progress</h3>
                  <p className="text-gray-600">Comprehensive analytics and performance tracking</p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">87%</div>
                    <div className="text-sm text-gray-600">Avg Score</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">5</div>
                    <div className="text-sm text-gray-600">Badges</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">7</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Settings Overview */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-primary">Education Settings</h2>
            <p className="text-gray-600">Customize your learning experience and notifications</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                  onClick={() => navigate('/education/notifications')}>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Settings className="h-16 w-16 mx-auto text-primary" />
                  <h3 className="text-xl font-semibold">Notification Settings</h3>
                  <p className="text-gray-600">Manage practice reminders and notifications</p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Configure Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Daily Reminders</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Progress Emails</span>
                    <Badge variant="secondary">Weekly</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Achievement Alerts</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Practice Time</span>
                    <Badge variant="outline">6:00 PM</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Education;
