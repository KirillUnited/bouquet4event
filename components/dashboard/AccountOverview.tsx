type Props = {
  email: string;
  accountSum?: number;
  nextDeliveryDate?: string;
};

export default function AccountOverview({ email, accountSum, nextDeliveryDate }: Props) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-medium">Overview</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <div className="text-sm text-muted-foreground">Email</div>
          <div className="font-medium">{email}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Account Sum</div>
          <div className="font-medium">{accountSum ?? 0} ₽</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Next Delivery</div>
          <div className="font-medium">{nextDeliveryDate ?? "—"}</div>
        </div>
      </div>
    </div>
  );
}


