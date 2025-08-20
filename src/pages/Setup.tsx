import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Play } from "lucide-react";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Setup() {
  const [context, setContext] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("English");
  const [translatedText, setTranslatedText] = useState("");
  const [twitterHandles, setTwitterHandles] = useState<string[]>(["", "", ""]);
  const navigate = useNavigate();

  const addTwitterHandle = () => {
    if (twitterHandles.length < 10) {
      setTwitterHandles([...twitterHandles, ""]);
    }
  };

  const removeTwitterHandle = (index: number) => {
    if (twitterHandles.length > 1) {
      setTwitterHandles(twitterHandles.filter((_, i) => i !== index));
    }
  };

  const updateTwitterHandle = (index: number, value: string) => {
    const updated = [...twitterHandles];
    updated[index] = value;
    setTwitterHandles(updated);
  };

  const handleContextChange = (value: string) => {
    setContext(value);
    // Simulate language detection
    if (value.length > 10) {
      setDetectedLanguage("Portuguese");
      setTranslatedText("English translation would appear here...");
    } else {
      setDetectedLanguage("English");
      setTranslatedText("");
    }
  };

  const startMonitoring = () => {
    // Navigate to dashboard
    navigate("/dashboard");
  };

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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          <div className="text-center">
            <h2 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent mb-2">
              Setup Your Monitoring
            </h2>
            <p className="text-muted-foreground">
              Configure your context and Twitter accounts to start monitoring sentiment
            </p>
          </div>

          <Card className="shadow-card card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Context Input</span>
                {detectedLanguage !== "English" && (
                  <Badge variant="secondary" className="ml-2">
                    Detected: {detectedLanguage}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Enter your monitoring context in any language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your context in any language..."
                value={context}
                onChange={(e) => handleContextChange(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              {translatedText && (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">English Translation:</p>
                  <p className="text-sm">{translatedText}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-card card-hover">
            <CardHeader>
              <CardTitle>Twitter Accounts</CardTitle>
              <CardDescription>
                Add up to 10 Twitter handles to monitor (without @)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {twitterHandles.map((handle, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        @
                      </span>
                      <Input
                        placeholder="username"
                        value={handle}
                        onChange={(e) => updateTwitterHandle(index, e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    {twitterHandles.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTwitterHandle(index)}
                        className="h-9 w-9 rounded-full text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              {twitterHandles.length < 10 && (
                <Button
                  variant="outline"
                  onClick={addTwitterHandle}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account ({twitterHandles.length}/10)
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              variant="hero"
              onClick={startMonitoring}
              className="px-8 py-6 text-lg font-semibold"
              disabled={!context.trim() || twitterHandles.every(h => !h.trim())}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Monitoring
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}