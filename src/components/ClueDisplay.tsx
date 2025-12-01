import { Lightbulb, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface ClueDisplayProps {
  clue: {
    roundNumber: number;
    text: string;
    description?: string;
    hint?: string;
  };
}

const ClueDisplay = ({ clue }: ClueDisplayProps) => {
  return (
    <Card className="p-6 shadow-elevated border-2 border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <Badge className="gradient-primary text-primary-foreground">
          Round {clue.roundNumber}
        </Badge>
        <span className="text-sm text-muted-foreground">Your Clue</span>
      </div>
      
      <div className="mb-6">
        <p className="text-2xl font-semibold leading-relaxed">{clue.text}</p>
      </div>

      {clue.description && (
        <div className="mb-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">{clue.description}</p>
          </div>
        </div>
      )}

      {clue.hint && (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Lightbulb className="w-4 h-4 mr-2" />
              Need a Hint?
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 p-4 bg-accent/10 rounded-lg border-2 border-accent">
            <p className="text-sm">{clue.hint}</p>
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  );
};

export default ClueDisplay;