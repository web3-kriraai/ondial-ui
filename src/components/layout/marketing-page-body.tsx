type MarketingPageBodyProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

/** Shared inner layout for content pages: title, optional description, children. Extra bottom padding keeps copy off the shell footer when scrolled flush. */
export function MarketingPageBody({ title, description, children }: MarketingPageBodyProps) {
  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6 px-4 pt-22 pb-12 sm:gap-8 sm:px-6 sm:pt-24 sm:pb-16 lg:pt-28">
      <div className="flex flex-col items-center gap-2 text-center">
        {typeof title === "string" ? (
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        ) : (
          title
        )}
        {description ? (
          typeof description === "string" ? (
            <p className="text-pretty text-muted-foreground">{description}</p>
          ) : (
            description
          )
        ) : null}
      </div>
      {children}
    </div>
  );
}
