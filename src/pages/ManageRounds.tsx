import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Eye, Trash2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCodeDisplay from "@/components/QRCodeDisplay";

const ManageRounds = () => {
  const [rounds] = useState([
    {
      id: 1,
      roundNumber: 1,
      clueText: "Where knowledge flows in silent rows, between the pages wisdom grows.",
      qrId: "QR-1001-ABC123",
      unlockCode: "LIBRARY",
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      roundNumber: 2,
      clueText: "Green leaves dance in morning light, where students gather day and night.",
      qrId: "QR-1002-DEF456",
      unlockCode: "GARDEN",
      createdAt: "2025-01-15",
    },
    {
      id: 3,
      roundNumber: 3,
      clueText: "Numbers crunch and circuits hum, where future tech has just begun.",
      qrId: "QR-1003-GHI789",
      unlockCode: "TECHLAB",
      createdAt: "2025-01-15",
    },
  ]);

  return (
    <div className="min-h-screen gradient-surface">
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Manage Rounds</h1>
          <Link to="/admin/create-round">
            <Button className="gradient-primary hover:opacity-90 shadow-glow">
              Create New Round
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {rounds.map((round) => (
            <Card key={round.id} className="p-6 hover:shadow-elevated transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="gradient-primary text-primary-foreground">
                      Round {round.roundNumber}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Created: {round.createdAt}
                    </span>
                  </div>
                  
                  <p className="text-lg mb-3">{round.clueText}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-primary" />
                      <span className="font-mono text-muted-foreground">{round.qrId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Unlock:</span>
                      <Badge variant="outline" className="font-mono">{round.unlockCode}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>QR Code - Round {round.roundNumber}</DialogTitle>
                      </DialogHeader>
                      <QRCodeDisplay qrId={round.qrId} roundNumber={round.roundNumber} />
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" className="text-primary">
                    <Download className="w-4 h-4" />
                  </Button>

                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageRounds;