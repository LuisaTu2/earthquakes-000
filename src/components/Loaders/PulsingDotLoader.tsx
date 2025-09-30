import "./PulsingDotLoader.css";

interface PulsingDotLoaderProps {
  size?: number;      // diameter of the dot in px
  color?: string;     // background color
  visible?: boolean;  // show/hide loader
}

export default function PulsingDotLoader({
  size = 100,
  // color = "#3B82F6", // your primary blue
  visible = true,
}: PulsingDotLoaderProps) {
  if (!visible) return null;

  return (
    <div className="loader-overlay">
      <div
        className="pulsing-dot"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
}
