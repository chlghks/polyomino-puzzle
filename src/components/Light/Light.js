export default function Light() {
  return (
    <>
      <ambientLight />
      <directionalLight
        intensity={0.6}
        position={[0, 2, 2]}
      />
    </>
  );
};
