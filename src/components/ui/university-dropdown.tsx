"use client";
import React, { useCallback, useState, forwardRef, useEffect } from "react";

// shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

// utils
import { cn } from "~/lib/utils";

// assets
import { ChevronDown, CheckIcon } from "lucide-react";

// data
import universities from "~/lib/constants/world_universities_and_domains.json";

// Country interface
export interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
}

// Dropdown props
interface UniversityDropdownProps {
  options?: University[];
  onChange?: (university: University) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
}

const UniversityDropdownComponent = (
  {
    options = universities,
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "Select a university",
    ...props
  }: UniversityDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const [open, setOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<
    University | undefined
  >(undefined);

  useEffect(() => {
    if (defaultValue) {
      const initialUniversity = options.find(
        (university) => university.name === defaultValue,
      );
      if (initialUniversity) {
        setSelectedUniversity(initialUniversity);
      } else {
        // Reset selected country if defaultValue is not found
        setSelectedUniversity(undefined);
      }
    } else {
      // Reset selected country if defaultValue is undefined or null
      setSelectedUniversity(undefined);
    }
  }, [defaultValue, options]);

  const handleSelect = useCallback(
    (university: University) => {
      setSelectedUniversity(university);
      onChange?.(university);
      setOpen(false);
    },
    [onChange],
  );

  const triggerClasses = cn(
    "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:shadow-md focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-black/10 focus-visible:ring-offset-0 focus-visible:border-black/20 transition-all disabled:cursor-not-allowed disabled:opacity-50 md:text-sm active:outline-0 focus:outline-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {selectedUniversity ? (
          <div className="flex w-0 flex-grow items-center gap-2 overflow-hidden">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedUniversity.name}
            </span>
          </div>
        ) : (
          <span>{placeholder || setSelectedUniversity.name}</span>
        )}
        <ChevronDown size={16} />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command className="max-h-[200px] w-full sm:max-h-[270px]">
          <CommandList>
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput placeholder="Search university..." />
            </div>
            <CommandEmpty>No university found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.name)
                .map((option, key: number) => (
                  <CommandItem
                    className="flex w-full items-center gap-2"
                    key={key}
                    onSelect={() => handleSelect(option)}
                  >
                    <div className="flex w-0 flex-grow space-x-2 overflow-hidden">
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {option.name}
                      </span>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 shrink-0",
                        option.name === selectedUniversity?.name
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

UniversityDropdownComponent.displayName = "UniversityDropdownComponent";

export const UniversityDropdown = forwardRef(UniversityDropdownComponent);
