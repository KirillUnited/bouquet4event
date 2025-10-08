"use client";

import * as React from "react"
import {CalendarIcon, ChevronDownIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {clsx} from "clsx";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Control} from "react-hook-form";

interface DatePickerProps {
    control: Control<any>,
    label?: string,
    required?: boolean,
    className?: string
}

/**
 * A reusable date picker component that allows users to select a date.
 *
 * @param {DatePickerProps} props - The component props.
 * @param control
 * @param {string} props.label - The label for the date picker.
 * @param {string} props.className - The CSS class name for the date picker container.
 * @param required
 * @param {object} props.props - Additional props to be passed to the date picker container.
 * @return {JSX.Element} The date picker component.
 */
export function DatePicker({control, label, className, required = false}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <FormField
            control={control}
            name="eventDate"
            render={({field}) => (
                <FormItem className={clsx("", className)}>
                    {label && (
                        <FormLabel>
                            {label}{required ? <span className="text-destructive ml-1">*</span> : <span className="text-foreground/90 text-sm font-light"> (Необязательно)</span>}
                        </FormLabel>
                    )}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-full font-normal normal-case justify-start"
                                >
                                    <CalendarIcon className="h-4 w-4 opacity-50" />
                                    {field.value ? field.value.toLocaleDateString() : "Выберите дату"}
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                captionLayout="dropdown"
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                }
                            />
                        </PopoverContent>
                    </Popover>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}