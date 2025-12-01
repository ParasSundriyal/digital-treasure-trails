import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Trophy, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ClueDisplay from "@/components/ClueDisplay";
import QRScanner from "@/components/QRScanner";
import ProgressTracker from "@/components/ProgressTracker";

const TeamPortal = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "locked">("start");
  const [startCode, setStartCode] = useState("");
  const [unlockCode, setUnlockCode] = useState("");
  const [teamName] = useState("Team Alpha");
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds] = useState(5);

  const mockClue = {
    roundNumber: currentRound,
    text: "Where knowledge flows in silent rows, between the pages wisdom grows.",
    description: "Look for a quiet place filled with books and learning.",
    hint: "Think about where you'd find encyclopedias and study desks.",
  };

  const handleStartGame = () => {
    if (startCode === "START123") {
      toast.success("Welcome to the treasure hunt!");
      setGameState("playing");
    } else {
      toast.error("Invalid start code. Please try again.");
    }
  };

  const handleQRSuccess = () => {
    toast.success("Correct location found!", {
      description: "Now wait for the instructor's unlock code to proceed.",
    });
    setGameState("locked");
  };

  const handleQRError = () => {
    toast.error("Wrong location!", {
      description: "This is not the correct QR code. Keep looking!",
    });
  };

  const handleUnlock = () => {
    if (unlockCode === "LIBRARY") {
      if (currentRound < totalRounds) {
        toast.success("Round unlocked!", {
          description: "Moving to next round...",
        });
        setCurrentRound(currentRound + 1);
        setGameState("playing");
        setUnlockCode("");
      } else {
        toast.success("🎉 Congratulations!", {
          description: "You've completed the treasure hunt!",
        });
      }
    } else {
      toast.error("Incorrect unlock code. Wait for the instructor.");
    }
  };

  return (
    <div className="min-h-screen gradient-surface">
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold">{teamName}</h1>
              {gameState !== "start" && (
                <p className="text-sm text-muted-foreground">Round {currentRound} of {totalRounds}</p>
              )}
            </div>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {gameState === "start" && (
          <Card className="p-8 text-center shadow-elevated animate-scale-in">
            <Trophy className="w-20 h-20 mx-auto mb-6 text-accent animate-pulse-glow" />
            <h2 className="text-3xl font-bold mb-4">Welcome to the Treasure Hunt!</h2>
            <p className="text-muted-foreground mb-8">
              Enter your team's start code to begin the adventure
            </p>
            <div className="max-w-md mx-auto">
              <Label htmlFor="startCode">Start Code</Label>
              <Input
                id="startCode"
                placeholder="Enter your start code"
                value={startCode}
                onChange={(e) => setStartCode(e.target.value)}
                className="mt-2 mb-4 text-center text-lg"
              />
              <Button
                onClick={handleStartGame}
                className="w-full gradient-accent hover:opacity-90 shadow-glow-accent"
              >
                Start Hunt
              </Button>
            </div>
          </Card>
        )}

        {gameState === "playing" && (
          <div className="space-y-6 animate-fade-in">
            <ProgressTracker current={currentRound} total={totalRounds} />
            <ClueDisplay clue={mockClue} />
            <QRScanner onSuccess={handleQRSuccess} onError={handleQRError} />
          </div>
        )}

        {gameState === "locked" && (
          <div className="space-y-6 animate-fade-in">
            <ProgressTracker current={currentRound} total={totalRounds} />
            <ClueDisplay clue={mockClue} />
            
            <Card className="p-8 text-center bg-accent/10 border-2 border-accent shadow-glow-accent">
              <Lock className="w-16 h-16 mx-auto mb-4 text-accent" />
              <h3 className="text-2xl font-bold mb-3">Round Completed! 🎉</h3>
              <p className="text-muted-foreground mb-6">
                Wait for the instructor to share the unlock code for the next round
              </p>
              
              <div className="max-w-md mx-auto">
                <Label htmlFor="unlockCode">Unlock Code</Label>
                <Input
                  id="unlockCode"
                  placeholder="Enter unlock code from instructor"
                  value={unlockCode}
                  onChange={(e) => setUnlockCode(e.target.value)}
                  className="mt-2 mb-4 text-center text-lg"
                />
                <Button
                  onClick={handleUnlock}
                  className="w-full gradient-accent hover:opacity-90"
                >
                  Unlock Next Round
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPortal;