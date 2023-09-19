export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="border-b">
      <div className="container py-3 flex items-center justify-between">
        <h1 className="font-bold text-xl">n0ts</h1>
        <nav>{children}</nav>
      </div>
    </header>
  );
}
