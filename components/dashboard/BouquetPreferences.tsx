"use client";

import { useState } from "react";

type Props = {
  bouquetCategory?: string;
  deliveryAddress?: string;
  deliveryInterval?: string;
  onSave?: (data: {
    bouquetCategory?: string;
    deliveryAddress?: string;
    deliveryInterval?: string;
  }) => void;
};

export default function BouquetPreferences({
  bouquetCategory,
  deliveryAddress,
  deliveryInterval,
  onSave,
}: Props) {
  const [category, setCategory] = useState(bouquetCategory ?? "");
  const [address, setAddress] = useState(deliveryAddress ?? "");
  const [interval, setInterval] = useState(deliveryInterval ?? "");

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-medium">Bouquet Preferences</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm text-muted-foreground">Category</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Seasonal"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Delivery Address</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, building, apt"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Interval</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            placeholder="Weekly / Bi-weekly"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          className="rounded bg-black px-4 py-2 text-white"
          onClick={() => onSave?.({
            bouquetCategory: category,
            deliveryAddress: address,
            deliveryInterval: interval,
          })}
        >
          Save
        </button>
      </div>
    </div>
  );
}


