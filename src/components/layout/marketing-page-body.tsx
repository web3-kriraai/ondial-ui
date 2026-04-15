type MarketingPageBodyProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

/** Shared inner layout for content pages: title, optional description, children. */
export function MarketingPageBody({ title, description, children }: MarketingPageBodyProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description ? <p className="text-pretty text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
