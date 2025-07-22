/* <<<<<<<<<<<<<<  ✨ Windsurf Command 🌟 >>>>>>>>>>>>>>>> */
"use client"

import * as React from "react"
import {ChevronDownIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Label} from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {clsx} from "clsx";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string,
}

/**
 * A reusable date picker component that allows users to select a date.
 *
 * @param {DatePickerProps} props - The component props.
 * @param {string} props.label - The label for the date picker.
 * @param {string} props.className - The CSS class name for the date picker container.
 * @param {object} props.props - Additional props to be passed to the date picker container.
 * @return {JSX.Element} The date picker component.
 */
export function DatePicker({label, className, ...props}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    return (
        <div className={clsx("flex flex-col gap-3", className)} {...props}>
            {label && (
                <Label htmlFor="date" className="px-1">
                    {label}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal normal-case"
                    >
                        {date ? date.toLocaleDateString() : "Выберите дату"}
                        <ChevronDownIcon/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

/* <<<<<<<<<<  1b6ef0f1-6a9e-4abb-84b1-6efaeff79146  >>>>>>>>>>> */