import { useState } from "react";
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
import { CommandLoading } from "cmdk";

type Props = {
  onSelectSynonym?: (synonym: string) => void;
};

export default function SynonymSearchInput({ onSelectSynonym }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const synonymSearchQuery = useSearchSynonyms(debouncedSearchTerm);

  function handleChange(synonym: string) {
    setSearchTerm(synonym);
    setIsOpen(synonym.length > 0);
  }

  function handleSelect(synonym: string) {
    setSearchTerm("");
    setIsOpen(false);
    onSelectSynonym?.(synonym);
  }

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
            asChild
          >
            <CommandList>
              {!synonymSearchQuery.isLoading &&
                !synonymSearchQuery.data?.length && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}

              {synonymSearchQuery.isLoading && (
                <CommandLoading className="py-6 text-sm text-center">
                  Loading...
                </CommandLoading>
              )}

              {synonymSearchQuery.data?.map(({ word, synonyms }) => (
                <CommandGroup
                  key={`${word}-${synonyms.length}`}
                  heading={word}
                  forceMount
                >
                  {synonyms.map((syn) => (
                    <CommandItem
                      key={`${word}-${syn}`}
                      value={`${word}-${syn}`}
                      onSelect={() => handleSelect(syn)}
                      className="cursor-pointer"
                    >
                      {syn}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </PopoverContent>
        </CommandList>
      </Command>
    </Popover>
  );
}
