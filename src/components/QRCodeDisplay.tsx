import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeDisplayProps {
  qrId: string;
  roundNumber: number;
}

const QRCodeDisplay = ({ qrId, roundNumber }: QRCodeDisplayProps) => {
  const handleDownload = () => {
    // Mock download functionality
    console.log(`Downloading QR code for ${qrId}`);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-elevated">
          <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
            <QrCode className="w-48 h-48 text-primary/40" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Round Number:</span>
          <span className="font-semibold">{roundNumber}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">QR ID:</span>
          <span className="font-mono">{qrId}</span>
        </div>
      </div>

      <Button onClick={handleDownload} className="w-full gradient-primary hover:opacity-90">
        Download QR Code
      </Button>
    </div>
  );
};

export default QRCodeDisplay;