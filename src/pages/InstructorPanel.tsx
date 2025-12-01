import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Trophy, Users, Clock, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InstructorPanel = () => {
  const [gameStatus, setGameStatus] = useState<"running" | "paused">("running");
  const [currentRound] = useState(2);
  
  const [leaderboard] = useState([
    { rank: 1, teamName: "Team Alpha", currentRound: 3, lastScanTime: "14:23:45", totalTime: "45:23" },
    { rank: 2, teamName: "Team Bravo", currentRound: 3, lastScanTime: "14:24:12", totalTime: "45:50" },
    { rank: 3, teamName: "Team Charlie", currentRound: 2, lastScanTime: "14:20:30", totalTime: "43:08" },
    { rank: 4, teamName: "Team Delta", currentRound: 2, lastScanTime: "14:21:15", totalTime: "43:53" },
    { rank: 5, teamName: "Team Echo", currentRound: 2, lastScanTime: "14:22:00", totalTime: "44:38" },
  ]);

  const [unlockCodes] = useState([
    { round: 1, code: "LIBRARY", status: "used" },
    { round: 2, code: "GARDEN", status: "active" },
    { round: 3, code: "TECHLAB", status: "pending" },
    { round: 4, code: "STADIUM", status: "pending" },
    { round: 5, code: "VICTORY", status: "pending" },
  ]);

  const toggleGameStatus = () => {
    setGameStatus(gameStatus === "running" ? "paused" : "running");
  };

  return (
    <div className="min-h-screen gradient-surface">
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Instructor Panel</h1>
              <p className="text-sm text-muted-foreground">Live Game Monitor</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={gameStatus === "running" ? "default" : "secondary"}
              className={gameStatus === "running" ? "gradient-primary text-primary-foreground animate-pulse-glow" : ""}
            >
              <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
              {gameStatus === "running" ? "Game Running" : "Game Paused"}
            </Badge>
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 gradient-primary text-primary-foreground shadow-glow">
            <Users className="w-8 h-8 mb-2 opacity-90" />
            <div className="text-sm opacity-90">Active Teams</div>
            <div className="text-3xl font-bold">{leaderboard.length}</div>
          </Card>
          
          <Card className="p-6 gradient-accent text-accent-foreground shadow-glow-accent">
            <Trophy className="w-8 h-8 mb-2 opacity-90" />
            <div className="text-sm opacity-90">Current Round</div>
            <div className="text-3xl font-bold">{currentRound}</div>
          </Card>
          
          <Card className="p-6 bg-card shadow-elevated">
            <Clock className="w-8 h-8 mb-2 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">Avg Time</div>
            <div className="text-3xl font-bold">44:30</div>
          </Card>

          <Card className="p-6 bg-card shadow-elevated">
            <Button
              onClick={toggleGameStatus}
              className={`w-full h-full ${
                gameStatus === "running"
                  ? "bg-destructive hover:bg-destructive/90"
                  : "gradient-primary hover:opacity-90"
              }`}
            >
              {gameStatus === "running" ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause Game
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Resume Game
                </>
              )}
            </Button>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-elevated">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Live Leaderboard</h2>
              </div>
              <div className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Team Name</TableHead>
                      <TableHead className="text-center">Round</TableHead>
                      <TableHead>Last Scan</TableHead>
                      <TableHead>Total Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboard.map((team) => (
                      <TableRow key={team.rank}>
                        <TableCell>
                          <Badge
                            variant={team.rank === 1 ? "default" : "outline"}
                            className={team.rank === 1 ? "gradient-accent text-accent-foreground" : ""}
                          >
                            #{team.rank}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{team.teamName}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{team.currentRound}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{team.lastScanTime}</TableCell>
                        <TableCell className="font-mono text-sm">{team.totalTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          <div>
            <Card className="shadow-elevated">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Unlock Codes</h2>
              </div>
              <div className="p-6 space-y-3">
                {unlockCodes.map((item) => (
                  <div
                    key={item.round}
                    className={`p-4 rounded-lg border-2 ${
                      item.status === "active"
                        ? "border-accent bg-accent/10"
                        : item.status === "used"
                        ? "border-muted bg-muted/50"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Round {item.round}</span>
                      <Badge
                        variant={
                          item.status === "active"
                            ? "default"
                            : item.status === "used"
                            ? "secondary"
                            : "outline"
                        }
                        className={item.status === "active" ? "gradient-accent text-accent-foreground" : ""}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="font-mono text-lg font-bold">{item.code}</div>
                    {item.status === "active" && (
                      <Button size="sm" className="w-full mt-2 gradient-accent hover:opacity-90">
                        Broadcast Code
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorPanel;