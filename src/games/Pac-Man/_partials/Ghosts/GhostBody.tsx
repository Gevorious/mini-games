const GhostBody = ({
  color,
  isEaten,
  isFrightened,
}: {
  color: string;
  isEaten: boolean;
  isFrightened: boolean;
}) => {
  return isEaten ? (
    <svg viewBox="0 0 90 120">
      <ellipse cx="35" cy="50" rx="15" ry="24" fill="white" />
      <ellipse cx="65" cy="50" rx="15" ry="24" fill="white" />
      <circle cx="40" cy="55" r="10" fill="black" />
      <circle cx="70" cy="55" r="10" fill="black" />
    </svg>
  ) : (
    <svg viewBox="0 0 90 100">
      <path
        d="M50 10
       C75 10, 90 30, 90 60
       L90 100
       L80 90 L70 100 L60 90 L50 100 L40 90 L30 100 L20 90 L10 100 L10 60
       C10 30, 25 10, 50 10
       Z"
        fill={color}
      >
        {isFrightened && (
          <animate
            attributeName="fill"
            values="#013e9b;#ffffff;#013e9b"
            dur="0.5s"
            repeatCount="indefinite"
            begin="0s"
          />
        )}
      </path>
      <ellipse cx="35" cy="50" rx="13" ry="20" fill="white" />
      <ellipse cx="65" cy="50" rx="13" ry="20" fill="white" />
      <circle cx="40" cy="55" r="8" fill="black" />
      <circle cx="70" cy="55" r="8" fill="black" />
    </svg>
  );
};

export default GhostBody;
