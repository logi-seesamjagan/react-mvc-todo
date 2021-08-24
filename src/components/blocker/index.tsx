import "./Blocker.scss";
export function Blocker({ show, children }: { show: boolean; children?: any }) {
  if (!show) return null;
  return <div className="Blocker">{children}</div>;
}
