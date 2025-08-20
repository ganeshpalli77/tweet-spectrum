import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  RefreshCw, 
  Play, 
  Pause, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Copy, 
  ExternalLink,
  RotateCcw
} from "lucide-react";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

// Mock data
const mockPosts = [
  {
    id: 1,
    account: "@techcrunch",
    text: "Breaking: New AI technology revolutionizes social media monitoring with advanced sentiment analysis...",
    relevanceScore: 95,
    sentiment: "positive",
    likes: 1234,
    retweets: 567,
    comments: 89,
    isViral: false,
    engagementChange: 23
  },
  {
    id: 2,
    account: "@verge",
    text: "This monitoring tool seems invasive and concerning for privacy rights...",
    relevanceScore: 87,
    sentiment: "negative",
    likes: 89,
    retweets: 34,
    comments: 156,
    isViral: true,
    engagementChange: 67
  }
];

export default function Dashboard() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [expandedContext, setExpandedContext] = useState(false);
  const navigate = useNavigate();

  const contextText = "Monitor sentiment around our new AI-powered social media monitoring tool launch...";
  const truncatedContext = contextText.length > 60 ? contextText.substring(0, 60) + "..." : contextText;

  const stats = {
    totalPosts: 1247,
    relevantPosts: 89,
    positivePosts: 45,
    negativePosts: 12
  };

  const relevancePercentage = Math.round((stats.relevantPosts / stats.totalPosts) * 100);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-foreground">Social Media Monitor</h1>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      {/* Top Bar */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Context:</span>
                <span className="text-sm font-medium">
                  {expandedContext ? contextText : truncatedContext}
                </span>
                {contextText.length > 60 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedContext(!expandedContext)}
                    className="h-6 px-2 text-xs"
                  >
                    {expandedContext ? "Less" : "More"}
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                  id="auto-refresh"
                />
                <label htmlFor="auto-refresh" className="text-sm font-medium">
                  Auto-refresh
                </label>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                New Session
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="shadow-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-3xl font-bold">{stats.totalPosts.toLocaleString()}</p>
                </div>
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Relevant Posts</p>
                  <p className="text-3xl font-bold">{stats.relevantPosts}</p>
                  <p className="text-xs text-muted-foreground">{relevancePercentage}% of total</p>
                </div>
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Positive Posts</p>
                  <p className="text-3xl font-bold text-success">{stats.positivePosts}</p>
                </div>
                <div className="status-indicator status-positive"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Negative Posts</p>
                  <p className="text-3xl font-bold text-destructive">{stats.negativePosts}</p>
                </div>
                <div className="status-indicator status-negative"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="text-sm font-medium text-success">
                    {isMonitoring ? "Monitoring" : "Paused"}
                  </p>
                </div>
                <div className={`status-indicator ${isMonitoring ? 'status-monitoring' : 'status-neutral'}`}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Table */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Posts Analysis</CardTitle>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All Relevant Posts ({stats.relevantPosts})
                </TabsTrigger>
                <TabsTrigger value="positive" className="text-success">
                  Positive ({stats.positivePosts})
                </TabsTrigger>
                <TabsTrigger value="negative" className="text-destructive">
                  Negative ({stats.negativePosts})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {mockPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{post.account}</Badge>
                            <Badge 
                              variant={post.sentiment === 'positive' ? 'default' : 'destructive'}
                              className={post.sentiment === 'positive' ? 'bg-success text-success-foreground' : ''}
                            >
                              {post.sentiment}
                            </Badge>
                            {post.isViral && (
                              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                                Viral Alert
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm">{post.text}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Relevance: {post.relevanceScore}%</span>
                            <Progress value={post.relevanceScore} className="w-20 h-2" />
                            <span>♥ {post.likes}</span>
                            <span>↻ {post.retweets}</span>
                            <span>💬 {post.comments}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="positive" className="mt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <p>Positive posts will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="negative" className="mt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <p>Negative posts will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Live Monitoring Panel */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Real-Time Tracking</span>
              <div className="status-indicator status-monitoring"></div>
              <span className="text-sm font-normal text-muted-foreground">
                Updates every 30 minutes
              </span>
            </CardTitle>
            <CardDescription>
              Monitoring negative posts for viral potential
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockPosts.filter(p => p.sentiment === 'negative').map((post) => (
                <Card key={post.id} className="border-l-4 border-l-destructive">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{post.account}</Badge>
                      <span className="text-xs text-muted-foreground">Updated 5 mins ago</span>
                    </div>
                    
                    <p className="text-sm line-clamp-2">{post.text}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Likes: {post.likes}</span>
                        <div className="flex items-center space-x-1 text-success">
                          <TrendingUp className="h-3 w-3" />
                          <span>+{post.engagementChange}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Retweets: {post.retweets}</span>
                        <div className="flex items-center space-x-1 text-success">
                          <TrendingUp className="h-3 w-3" />
                          <span>+45%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Replies: {post.comments}</span>
                        <div className="flex items-center space-x-1 text-destructive">
                          <TrendingDown className="h-3 w-3" />
                          <span>+12%</span>
                        </div>
                      </div>
                    </div>
                    
                    {post.isViral && (
                      <Badge variant="secondary" className="bg-warning text-warning-foreground w-full justify-center">
                        🚨 Viral Alert - Engagement spike &gt;50%
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}