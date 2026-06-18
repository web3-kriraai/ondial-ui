export type ShareLinks = {
  linkedin: string;
  twitter: string;
  facebook: string;
  email: string;
};

export function getShareLinks(url: string, title: string): ShareLinks {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const emailBody = encodeURIComponent(`Check out this article on Ondial:\n\n${title}\n${url}`);

  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${emailBody}`,
  };
}

export async function getSiteUrl(): Promise<string> {
  const { headers } = await import("next/headers");
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");

  if (!host) {
    return "https://ondial.com";
  }

  const protocol = headersList.get("x-forwarded-proto") ?? "https";
  return `${protocol}://${host}`;
}
