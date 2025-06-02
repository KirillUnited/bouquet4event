import { stegaClean } from "next-sanity";
import SplitCardsItem from "@/components/blocks/split/split-cards-item";
import { PAGE_QUERYResult, ColorVariant } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitCardsList = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-cards-list" }
>;

interface SplitCardsListProps extends SplitCardsList {
  color?: ColorVariant;
}

export default function SplitCardsList({ color, list }: SplitCardsListProps) {
  const colorParent = stegaClean(color);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-8">
      {list &&
        list.length > 0 &&
        list.map((item, index) => (
          <SplitCardsItem
            key={index}
            color={colorParent}
            icon={item.icon}
            image={item.image}
            tagLine={item.tagLine}
            title={item.title}
            body={item.body}
          />
        ))}
    </div>
  );
}
