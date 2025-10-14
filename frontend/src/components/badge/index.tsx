interface BadgeProps {
  count: number;
  maxCount?: number;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ count, maxCount = 99, className }) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count;

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        minWidth: 20,
        height: 20,
        padding: "0 6px",
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
        lineHeight: "20px",
        borderRadius: 10,
        backgroundColor: "red",
        textAlign: "center",
        position: "absolute",
        top: 40,
        right: 90,
        userSelect: "none",
      }}
    >
      {displayCount}
    </span>
  );
};

export default Badge;
