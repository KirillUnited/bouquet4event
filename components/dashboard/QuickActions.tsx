import React from "react";
import Icon from "@/components/ui/AppIcon";
import { actions } from "@/components/dashboard/mock-data";
import { Card } from "../ui/card";

const QuickActions = ({ onAction }: { onAction: (id: string) => void }) => {
  return (
    <Card className="p-4 md:p-6 shadow-natural">
      <h3 className="font-playfair text-lg font-semibold text-foreground mb-4">
        Быстрые действия
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onAction(action?.id)}
            className={`
            flex
              p-4 rounded-lg border border-border text-left transition-natural
              ${action?.bgColor}
              hover:shadow-natural hover:cursor-pointer
            `}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`
                flex items-center justify-center w-10 h-10 rounded-lg
                ${action?.bgColor?.replace("hover:", "")?.replace("bg-", "bg-")?.replace("/10", "/20")?.replace("/20", "/30")}
              `}
              >
                <Icon
                  name={action?.icon as any}
                  size={20}
                  className={action?.color}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium mb-1 text-slate-900">
                  {action?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
