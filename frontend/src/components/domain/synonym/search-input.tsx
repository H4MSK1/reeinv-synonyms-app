import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSearchSynonyms } from "@/api/synonym/search-synonyms";

type Props = {
  value?: string;
  onSelectSynonym?: (synonym: string) => void;
};

export default function SynonymSearchInput({ value, onSelectSynonym }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const synonymSearchQuery = useSearchSynonyms(debouncedSearchTerm);

  function handleChange(synonym: string) {
    setSearchTerm(synonym);
    setIsOpen(synonym.length > 0);
  }

  function handleSelect(synonym: string) {
    setSearchTerm(synonym);
    setIsOpen(false);
    onSelectSynonym?.(synonym);
  }

  useEffect(() => {
    if (value?.length) {
      setSearchTerm(value);
    }
  }, [value]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Command className="border rounded-lg shadow-lg">
        <CommandList>
          <PopoverTrigger asChild>
            <CommandInput
              placeholder="Start typing a word..."
              onValueChange={handleChange}
              value={searchTerm}
              className="flex-1 h-12 grow md:text-base"
              inputMode="search"
            />
          </PopoverTrigger>

          <PopoverContent
            className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0"
            onOpenAutoFocus={(e) => e.preventDefault()}
            side="bottom"
          >
            <CommandEmpty>
              {synonymSearchQuery.isLoading
                ? "Loading..."
                : "No results found."}
            </CommandEmpty>

            <CommandGroup
              heading={synonymSearchQuery.data?.length && "Suggestions"}
            >
              {synonymSearchQuery.data?.map(({ word }) => (
                <CommandItem
                  key={word}
                  value={word}
                  onSelect={handleSelect}
                  className="cursor-pointer"
                >
                  {word}
                </CommandItem>
              ))}
            </CommandGroup>
          </PopoverContent>
        </CommandList>
      </Command>
    </Popover>
  );
}
