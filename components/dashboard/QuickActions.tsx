import React from "react";
import Icon from "@/components/ui/AppIcon";

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: "pause-subscription",
      title: "Pause Subscription",
      description: "Temporarily pause your deliveries",
      icon: "Pause",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 hover:bg-yellow-100",
    },
    {
      id: "skip-next",
      title: "Skip Next Delivery",
      description: "Skip your upcoming delivery",
      icon: "SkipForward",
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    {
      id: "change-address",
      title: "Update Address",
      description: "Change your delivery address",
      icon: "MapPin",
      color: "text-green-600",
      bgColor: "bg-green-50 hover:bg-green-100",
    },
    {
      id: "gift-subscription",
      title: "Gift a Subscription",
      description: "Send flowers to someone special",
      icon: "Gift",
      color: "text-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100",
    },
    {
      id: "upgrade-plan",
      title: "Upgrade Plan",
      description: "Get more flowers or premium options",
      icon: "ArrowUp",
      color: "text-conversion",
      bgColor: "bg-conversion/10 hover:bg-conversion/20",
    },
    {
      id: "contact-support",
      title: "Contact Support",
      description: "Get help with your subscription",
      icon: "MessageCircle",
      color: "text-gray-600",
      bgColor: "bg-gray-50 hover:bg-gray-100",
    },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-natural">
      <h3 className="font-playfair text-lg font-semibold text-foreground mb-4">
        Быстрые действия
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onAction(action?.id)}
            className={`
              p-4 rounded-lg border border-border text-left transition-natural
              ${action?.bgColor}
              hover:shadow-natural
            `}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`
                flex items-center justify-center w-10 h-10 rounded-lg
                ${action?.bgColor?.replace("hover:", "")?.replace("bg-", "bg-")?.replace("/10", "/20")?.replace("/20", "/30")}
              `}
              >
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">
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
    </div>
  );
};

export default QuickActions;
