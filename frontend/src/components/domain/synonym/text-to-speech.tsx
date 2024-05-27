import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { textToSpeech } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  word: string;
};

export default function SynonymTextToSpeech({ word }: Props) {
  const [isDisabled, setIsDisabled] = useState(false);

  async function speak() {
    try {
      setIsDisabled(true);
      await textToSpeech(word);
      setIsDisabled(false);
    } catch (err) {
      console.error(err);
      toast.error("Cannot play the audio, unknown error occured.");
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label={`Audio: pronunciation of ${word}`}
            size="icon"
            onClick={speak}
            disabled={isDisabled}
          >
            <Volume2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Audio: pronunciation of {word}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
