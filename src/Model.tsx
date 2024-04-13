import { OrbitControls, useAnimations, useFBX } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LoopRepeat, SkeletonHelper, Vector3 } from "three";
import { BVHLoader } from "three/examples/jsm/Addons.js";
import { generatedBonesToFbxMap } from "./bones";

export const Model = () => {
  const model = useLoader(BVHLoader, "/generated.bvh");
  const model2 = useFBX("/model.fbx");
  const animations = useAnimations([model.clip], model2);

  useEffect(() => {
    const clip = animations?.clips?.[0];
    if (!clip) return;
    // fix animation clip name
    clip.tracks.forEach((t) => {
      const bMapItem =
        generatedBonesToFbxMap[t.name.slice(0, t.name.indexOf("."))];
      if (!bMapItem) return;
      console.log("setting name", bMapItem + t.name.slice(t.name.indexOf(".")));
      t.name = bMapItem + t.name.slice(t.name.indexOf("."));
    });
    const clipBoneMap: { [id: string]: string } = {};
    clip.tracks.forEach((t) => {
      clipBoneMap[t.name.slice(0, t.name.indexOf("."))] = "";
    });
    console.log(clipBoneMap);
    const action = animations?.actions?.animation;
    if (!action) return;
    action.setLoop(LoopRepeat, 10);
    action.play();
  }, [animations]);

  useEffect(() => {
    if (!model2) return;
    const skeleton = new SkeletonHelper(model2);
    const boneMap: { [id: string]: string } = {};
    skeleton.bones.forEach((b) => {
      boneMap[b.name] = "";
    });
    console.log(boneMap);
  }, [model2]);

  return (
    <>
      <primitive object={model} scale={100} />
      <primitive object={model2} scale={0.01} />
      <OrbitControls makeDefault />
      <directionalLight
        color="#FFFFFF"
        intensity={1.5294117647058822}
        position={new Vector3(2, 10, 3)}
        castShadow
      />
      <ambientLight intensity={1.6666666666666665} color="#FFF" />
    </>
  );
};
