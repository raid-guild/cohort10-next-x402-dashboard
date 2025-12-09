"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
	selected?: Date;
	onSelect?: (date: Date | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
}

export function DatePicker({
	selected,
	onSelect,
	placeholder = "Pick a date",
	disabled = false,
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="primary"
					size="sm"
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!selected && "text-muted-foreground",
					)}
					disabled={disabled}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{selected ? format(selected, "PPP") : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={selected} onSelect={onSelect} />
			</PopoverContent>
		</Popover>
	);
}
