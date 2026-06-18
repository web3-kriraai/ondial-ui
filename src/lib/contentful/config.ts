import "server-only";

import { CONTENTFUL_REVALIDATE_SECONDS } from "@/config/contentful";

export { CONTENTFUL_REVALIDATE_SECONDS };

export function getContentfulConfig() {
  const spaceId =
    process.env.CONTENTFUL_SPACE_ID ?? process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const token =
    process.env.CONTENTFUL_GRAPHQL_TOKEN ?? process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_TOKEN;
  const environment =
    process.env.CONTENTFUL_ENVIRONMENT ??
    process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ??
    "master";

  if (!spaceId || !token) {
    throw new Error(
      "Missing Contentful credentials. Set CONTENTFUL_SPACE_ID and CONTENTFUL_GRAPHQL_TOKEN in your env file.",
    );
  }

  return {
    spaceId,
    token,
    environment,
    endpoint: `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`,
  };
}

export function isContentfulConfigured(): boolean {
  const spaceId =
    process.env.CONTENTFUL_SPACE_ID ?? process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const token =
    process.env.CONTENTFUL_GRAPHQL_TOKEN ?? process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_TOKEN;
  return Boolean(spaceId && token);
}
