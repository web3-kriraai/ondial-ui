type MarketingPageBodyProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

/** Shared inner layout for content pages: title, optional description, children. Extra bottom padding keeps copy off the shell footer when scrolled flush. */
export function MarketingPageBody({ title, description, children }: MarketingPageBodyProps) {
  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6 px-4 pt-10 pb-12 sm:gap-8 sm:px-6 sm:pt-16 sm:pb-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description ? <p className="text-pretty text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
