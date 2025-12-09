import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				"type-body-md flex min-h-20 w-full rounded-md border border-moloch-800 bg-background px-3 py-2 ring-offset-background placeholder:text-moloch-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moloch-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
Textarea.displayName = "Textarea";

export { Textarea };
