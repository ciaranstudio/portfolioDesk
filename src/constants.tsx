import * as THREE from "three";

export const PROJECT_MAP: Record<string, any> = {
  van: "GardenCenter",
  sphere: "PartList (debug)",
  pen: "PartList (admin)",
  stool: "EliBuilds",
};

export const TOAST = {
  duration: 10000,
  fontSize: "0.8rem",
  background: "white",
  color: "#212121",
};

export const OBJECT_POSITIONS = {
  headphones: new THREE.Vector3(-0.675, 0.431, 0),
  van: new THREE.Vector3(-0.6, 0.176, 0.415),
  sphere: new THREE.Vector3(-0.175, 0.275, 0.45),
  laptop: new THREE.Vector3(0, 0.0475, 0),
  pen: new THREE.Vector3(0.175, 0.18265, 0.475),
  stool: new THREE.Vector3(0.585, 0.176, 0.425),
  mug: new THREE.Vector3(0.715, 0.1335, -0.1),
  desk: new THREE.Vector3(0, 0, 0),
};
