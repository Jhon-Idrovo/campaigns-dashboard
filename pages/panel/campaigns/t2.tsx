function T2() {
  return (
    <div>
      <EnhancedComponent Comp={ChildComp} />
    </div>
  );
}

export default T2;

function EnhancedComponent({ Comp }: { Comp: Function }) {
  return (
    <div>
      <h1>Enhanced</h1>
      <Comp />
    </div>
  );
}

function ChildComp() {
  return <div>TESTING</div>;
}
