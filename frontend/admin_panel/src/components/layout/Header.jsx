export default function Header({ title }) {
  return (
    <header className="h-[72px] bg-surface/80 backdrop-blur-sm border-b border-border/60 px-[40px] flex items-center justify-between">
      <h1 className="text-[32px] font-light leading-[1.1] tracking-[-0.02em] text-on-surface">
        {title}
      </h1>
      <div className="flex items-center gap-[24px]">
        <input
          type="text"
          placeholder="Search..."
          className="w-[240px] bg-surface text-on-surface text-[16px] font-light leading-[1.5] tracking-[-0.01em] rounded-sm px-[16px] py-[14px] border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted/60"
        />
        <div className="h-10 w-10 rounded-full bg-tertiary/30 flex items-center justify-center text-on-surface font-light text-[16px]">
          JD
        </div>
      </div>
    </header>
  );
}