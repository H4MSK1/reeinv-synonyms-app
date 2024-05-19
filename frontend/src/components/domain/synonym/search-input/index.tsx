import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";

type Props = {
  suggestions?: string[];
  onSelectValue?: (value: string) => void;
};

export default function SynonymSearchInput({
  suggestions,
  onSelectValue,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  function handleChange(val: string) {
    setValue(val);
    setIsOpen((val?.trim()?.length ?? 0) > 0);
  }

  function handleSelect(val: string) {
    setIsOpen(false);
    onSelectValue?.(val);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Command className="border rounded-lg shadow-lg">
        <CommandList>
          <PopoverAnchor asChild>
            <CommandInput
              placeholder="Start typing a word..."
              onValueChange={handleChange}
              value={value}
              className="flex-1 h-12 grow md:text-base"
              inputMode="search"
              isLoading={false}
            />
          </PopoverAnchor>
          <PopoverContent
            className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onFocusOutside={() => setIsOpen(false)}
            side="bottom"
          >
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {suggestions?.map((suggestion) => (
                <CommandItem
                  key={suggestion}
                  value={suggestion}
                  onSelect={handleSelect}
                >
                  {suggestion}
                </CommandItem>
              ))}
            </CommandGroup>
          </PopoverContent>
        </CommandList>
      </Command>
    </Popover>
  );
}
