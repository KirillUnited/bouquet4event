"use client";

type Props = {
  referralLink?: string;
};

export default function ReferralLink({ referralLink }: Props) {
  const link = referralLink ?? "";

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-medium">Реферальная ссылка</h2>
      <div className="mt-3 flex items-center gap-3">
        <input
          className="w-full rounded border px-3 py-2"
          value={link}
          readOnly
        />
        <button
          className="whitespace-nowrap rounded bg-black px-4 py-2 text-white"
          onClick={async () => {
            if (!link) return;
            try {
              await navigator.clipboard.writeText(link);
            } catch {}
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
}


