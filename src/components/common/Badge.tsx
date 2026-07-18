interface BadgeProps {
    label: string;
    variant?: "category" | "condition" | "default";
}

const Badge = ({ label }: BadgeProps) => {
    return <span>{label}</span>;
};

export default Badge;