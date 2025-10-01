import React from "react";
import {cn} from "@/lib/utils";

export const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between mb-2">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
                    <div
                        key={stepNum}
                        className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                            currentStep >= stepNum
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-400'
                        )}
                    >
                        {stepNum}
                    </div>
                ))}
            </div>
            <div className="h-1 bg-gray-100 rounded-full">
                <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
            </div>
        </div>
    );
};
