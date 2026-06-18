import "server-only";

import { CONTENTFUL_REVALIDATE_SECONDS, getContentfulConfig } from "@/lib/contentful/config";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

const loggedLinkErrors = new Set<string>();

function isLinkResolutionError(message: string): boolean {
  return message.includes("cannot be resolved") || message.includes("Link from entry");
}

function formatGraphQLErrors(errors: Array<{ message: string }>): string {
  return errors.map((error) => error.message).join("; ");
}

function warnUnresolvedLinks(errors: Array<{ message: string }>): void {
  const message = formatGraphQLErrors(errors);
  if (loggedLinkErrors.has(message)) return;
  loggedLinkErrors.add(message);
  console.warn("[contentful] Unresolved entry links (using partial data):", message);
}

export async function contentfulQuery<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const { endpoint, token } = getContentfulConfig();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: CONTENTFUL_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Contentful request failed (${response.status})${body ? `: ${body.slice(0, 300)}` : ""}`,
    );
  }

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    const linkErrorsOnly = json.errors.every((error) => isLinkResolutionError(error.message));

    if (json.data && linkErrorsOnly) {
      warnUnresolvedLinks(json.errors);
      return json.data;
    }

    throw new Error(formatGraphQLErrors(json.errors));
  }

  if (!json.data) {
    throw new Error("Contentful returned no data");
  }

  return json.data;
}
