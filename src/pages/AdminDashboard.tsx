import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, List, Home, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  const [stats] = useState({
    totalRounds: 5,
    activeTeams: 12,
    completedHunts: 3,
  });

  return (
    <div className="min-h-screen gradient-surface">
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 gradient-primary text-primary-foreground shadow-glow">
            <div className="text-sm opacity-90 mb-1">Total Rounds</div>
            <div className="text-4xl font-bold">{stats.totalRounds}</div>
          </Card>
          <Card className="p-6 gradient-accent text-accent-foreground shadow-glow-accent">
            <div className="text-sm opacity-90 mb-1">Active Teams</div>
            <div className="text-4xl font-bold">{stats.activeTeams}</div>
          </Card>
          <Card className="p-6 bg-card shadow-elevated">
            <div className="text-sm text-muted-foreground mb-1">Completed Hunts</div>
            <div className="text-4xl font-bold text-success">{stats.completedHunts}</div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 hover:shadow-glow transition-all duration-300 border-2">
            <Plus className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">Create New Round</h2>
            <p className="text-muted-foreground mb-6">
              Add a new treasure hunt round with clues, QR codes, and unlock codes
            </p>
            <Link to="/admin/create-round">
              <Button className="gradient-primary hover:opacity-90 shadow-glow">
                Create Round
              </Button>
            </Link>
          </Card>

          <Card className="p-8 hover:shadow-elevated transition-all duration-300 border-2">
            <List className="w-12 h-12 text-accent mb-4" />
            <h2 className="text-2xl font-bold mb-2">Manage Rounds</h2>
            <p className="text-muted-foreground mb-6">
              View, edit, and download QR codes for existing rounds
            </p>
            <Link to="/admin/manage-rounds">
              <Button variant="outline" className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                View All Rounds
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;