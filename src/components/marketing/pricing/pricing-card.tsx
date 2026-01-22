"use client";

import { motion } from "motion/react";
import { CheckCircle, ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

export interface PricingCardProps {
    title: string;
    description: string;
    price: string;
    priceSuffix?: string;
    priceSubtext?: string;
    features: string[];
    ctaText: string;
    ctaHref?: string;
    isPopular?: boolean;
    whoFor?: string;
    delay?: number;
}

export const PricingCard = ({
    title,
    description,
    price,
    priceSuffix,
    priceSubtext,
    features,
    ctaText,
    ctaHref = "#",
    isPopular,
    whoFor,
    delay = 0,
}: PricingCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={cx(
                "relative flex flex-col h-full bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border",
                isPopular ? "border-brand-solid ring-1 ring-brand-solid" : "border-gray-200 dark:border-gray-800"
            )}
        >
            {isPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-brand-solid text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                        Most Popular
                    </span>
                </div>
            )}

            {/* Header */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
                {whoFor && (
                    <p className="text-sm text-tertiary mb-2">
                        <span className="font-semibold text-secondary">Best for:</span> {whoFor}
                    </p>
                )}
                <p className="text-sm text-tertiary line-clamp-2 min-h-[40px]">{description}</p>
            </div>

            {/* Pricing */}
            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-primary tracking-tight">{price}</span>
                    {priceSuffix && <span className="text-lg text-tertiary font-medium">{priceSuffix}</span>}
                </div>
                {priceSubtext && <p className="text-sm text-brand-solid font-medium mt-1">{priceSubtext}</p>}
            </div>

            {/* CTA */}
            <div className="mb-8">
                <Button 
                    size="xl" 
                    className="w-full rounded-full justify-center whitespace-nowrap" 
                    color={isPopular ? "primary" : "secondary"}
                    href={ctaHref}
                    iconTrailing={<ArrowRight className="w-4 h-4" />}
                >
                    {ctaText}
                </Button>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-8" />

            {/* Features */}
            <div className="flex-1">
                <p className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-4">Includes</p>
                <ul className="space-y-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="size-5 text-brand-solid shrink-0" />
                            <span className="text-sm text-secondary leading-tight">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};
