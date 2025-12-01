import { useState } from "react";
import { Camera, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QRScannerProps {
  onSuccess: () => void;
  onError: () => void;
}

const QRScanner = ({ onSuccess, onError }: QRScannerProps) => {
  const [manualCode, setManualCode] = useState("");
  const [scanStatus, setScanStatus] = useState<"idle" | "success" | "error">("idle");

  const handleManualSubmit = () => {
    // Mock validation - in real app, this would validate against backend
    if (manualCode === "QR-1001-ABC123") {
      setScanStatus("success");
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setScanStatus("error");
      setTimeout(() => {
        setScanStatus("idle");
      }, 2000);
      onError();
    }
  };

  const handleScanClick = () => {
    // Mock camera scan
    setTimeout(() => {
      const isCorrect = Math.random() > 0.5;
      if (isCorrect) {
        setScanStatus("success");
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setScanStatus("error");
        setTimeout(() => {
          setScanStatus("idle");
        }, 2000);
        onError();
      }
    }, 1000);
  };

  return (
    <Card className="p-6 shadow-elevated">
      <h3 className="text-xl font-bold mb-4">Scan QR Code</h3>
      
      <div className="space-y-6">
        {/* Camera Scanner */}
        <div>
          <div className="relative bg-muted rounded-lg overflow-hidden mb-4">
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              {scanStatus === "idle" && (
                <Camera className="w-24 h-24 text-muted-foreground/40" />
              )}
              {scanStatus === "success" && (
                <div className="text-center animate-scale-in">
                  <CheckCircle className="w-24 h-24 text-success mx-auto mb-2" />
                  <p className="text-success font-semibold">Correct Location!</p>
                </div>
              )}
              {scanStatus === "error" && (
                <div className="text-center animate-scale-in">
                  <XCircle className="w-24 h-24 text-destructive mx-auto mb-2" />
                  <p className="text-destructive font-semibold">Wrong Location!</p>
                </div>
              )}
            </div>
          </div>
          
          <Button
            onClick={handleScanClick}
            disabled={scanStatus !== "idle"}
            className="w-full gradient-primary hover:opacity-90 shadow-glow"
          >
            <Camera className="w-4 h-4 mr-2" />
            {scanStatus === "idle" ? "Scan QR Code" : "Scanning..."}
          </Button>
        </div>

        {/* Manual Entry */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or enter manually</span>
          </div>
        </div>

        <div>
          <Label htmlFor="manualCode">QR Code ID</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="manualCode"
              placeholder="e.g., QR-1001-ABC123"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              disabled={scanStatus !== "idle"}
            />
            <Button
              onClick={handleManualSubmit}
              disabled={!manualCode || scanStatus !== "idle"}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QRScanner;