import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Model } from "./Model";

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas
        style={{
          background: "gray",
          width: "100vw",
          height: "100vh",
        }}
        camera={
          {
            // position: [0, 3, 15],
            // zoom: zoom ? zoom : 2,
          }
        }
        // linear={sceneConfigs?.linear ?? true}
        // flat={sceneConfigs?.flat ?? true}
        // shadows={sceneConfigs?.shadows ?? true}
      >
        <Model />
      </Canvas>
    </Suspense>
  );
}

export default App;
