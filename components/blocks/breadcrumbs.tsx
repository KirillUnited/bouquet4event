import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PAGE_QUERYResult } from "@/sanity.types";
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
    slug,
}: NonNullable<NonNullable<BreadcrumbsProps["crumbs"]>[number]>) => {
    return (
        <>
            <BreadcrumbItem className="font-bold text-primary">
                <BreadcrumbLink className="hover:text-primary/70" asChild>
                    <Link href={slug?.current || '#'}>{title}</Link>
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
            <Breadcrumb className="py-3 lg:py-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">
                                <HomeIcon size={18} />
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {crumbs?.map((crumb, index) => (
                        <React.Fragment key={index}>
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
