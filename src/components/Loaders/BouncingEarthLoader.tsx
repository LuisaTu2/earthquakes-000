import "./BouncingEarthLoader.css"

interface BouncingMovingEarthProps {
  visible: boolean;  
}

export default function BouncingMovingEarth({visible}: BouncingMovingEarthProps) {
  return (
    <>
        { visible ? 
        <>
          <div className="bouncing-earth-container"></div>
          <span className="bouncing-earth">🌍</span> 
        </>
      : <></> }
    </>
  );
}
