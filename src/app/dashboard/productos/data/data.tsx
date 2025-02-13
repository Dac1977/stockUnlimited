import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    CheckCircle,
    // Circle,
    CircleOff,
    // HelpCircle,
    Timer,
} from "lucide-react";

export const labels = [
    {
        value: "electronics",
        label: "Electronics",
    },
    {
        value: "clothing",
        label: "Clothing",
    },
    {
        value: "home",
        label: "Home",
    },
];

export const availability = [
    {
        value: "in_stock",
        label: "In Stock",
        icon: CheckCircle,
    },
    {
        value: "out_of_stock",
        label: "Out of Stock",
        icon: CircleOff,
    },
    {
        value: "pre_order",
        label: "Pre-order",
        icon: Timer,
    },
];

export const priceRanges = [
    {
        label: "Low",
        value: "low",
        icon: ArrowDown,
    },
    {
        label: "Medium",
        value: "medium",
        icon: ArrowRight,
    },
    {
        label: "High",
        value: "high",
        icon: ArrowUp,
    },
];