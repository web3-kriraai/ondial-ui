import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">404</h1>
      <p className="text-center text-muted-foreground">This page could not be found.</p>
      <Button render={<Link href="/" />} nativeButton={false}>
        Back home
      </Button>
    </div>
  );
}
