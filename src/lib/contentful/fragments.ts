export const BLOG_SLUG_FIELDS = `
  slug
`;

/** List/card queries — author is joined separately to avoid broken reference errors. */
export const BLOG_LIST_FIELDS = `
  title
  slug
  metaTitle
  metaDescription
  publishDate
  featuredImage { url }
`;

export const BLOG_SUMMARY_FIELDS = `
  ${BLOG_LIST_FIELDS}
  author {
    authorName
    slug
    authorImage { url }
  }
`;

export const BLOG_DETAIL_FIELDS = `
  title
  slug
  metaTitle
  metaDescription
  publishDate
  featuredImage { url }
  description {
    json
    links {
      assets {
        block {
          sys { id }
          url
          title
          description
          contentType
          width
          height
        }
      }
    }
  }
  faqs {
    ... on FaqSection {
      title
      faqsCollection {
        items {
          question
          answer
        }
      }
    }
  }
`;
