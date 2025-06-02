import SplitInfoItem from "@/components/blocks/split/split-info-item";
import { cn } from "@/lib/utils";
import { PAGE_QUERYResult } from "@/sanity.types";
import { stegaClean } from "next-sanity";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitInfoList = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-info-list" }
>;

export default function SplitInfoList({ gridColumns, list }: SplitInfoList) {
  return (
    <div className="flex items-center justify-center">
      {list && list.length > 0 && (
        <div className={cn(
          "grid grid-cols-1 gap-8",
          "md:grid-cols-2",
          `lg:${stegaClean(gridColumns)}`
        )}>
          {list.map((item, index) => <SplitInfoItem key={index} {...item} />)}
        </div>
      )}
    </div>
  );
}
