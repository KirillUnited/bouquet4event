import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Link as LinkProps, PAGE_QUERYResult} from "@/sanity.types";
import Link from "next/link";
import SectionContainer from "@/components/layout/section-container";
import { HomeIcon, SlashIcon } from "lucide-react";
import React from "react";

type BreadcrumbsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "breadcrumbs" }
>;

const BreadcrumbCustomItem = ({
                                  title,
                                  href,
                              }: LinkProps) => {
    return (
        <>
            <BreadcrumbItem className="font-bold text-primary">
                <BreadcrumbLink className="hover:text-primary/70" asChild>
                    <Link href={href || '#'}>{title}</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
        </>
    );
};

export default function Breadcrumbs({
                                        padding,
                                        colorVariant,
                                        crumbs,
                                        hideCurrent
                                    }: BreadcrumbsProps) {
    return (
        <SectionContainer padding={padding} color={colorVariant}>
            <Breadcrumb className="my-3 lg:my-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">
                                <HomeIcon size={18} />
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {crumbs?.map((crumb, index) => (
                        <React.Fragment key={crumb._key}>
                            <BreadcrumbSeparator>
                                <SlashIcon className="h-4 w-4" />
                            </BreadcrumbSeparator>
                            {index === crumbs?.length - 1 && !hideCurrent ? (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            ) : (
                                <BreadcrumbCustomItem {...crumb} />
                            )}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </SectionContainer>
    );
}
