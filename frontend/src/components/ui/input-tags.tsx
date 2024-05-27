import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction, forwardRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";

/**
 * Enhanced input component to handle multi tag values.
 */

export type InputTagsProps = InputProps & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setPendingDataPoint(e.target.value);
    }

    function addPendingDataPoint() {
      if (pendingDataPoint.trim().length) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addPendingDataPoint();
      }
    }

    return (
      <>
        <div className="flex">
          <Input
            value={pendingDataPoint}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="rounded-r-none"
            {...props}
            ref={ref}
          />
          <Button
            type="button"
            className="border border-l-0 rounded-l-none"
            onClick={addPendingDataPoint}
            disabled={!pendingDataPoint.trim().length}
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 overflow-y-auto ">
          {value.map((item, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {item}
              <button
                type="button"
                className="w-3 ml-2"
                onClick={() => {
                  onChange(value.filter((i) => i !== item));
                }}
              >
                <XIcon className="w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </>
    );
  }
);

InputTags.displayName = "InputTags";

export { InputTags };
