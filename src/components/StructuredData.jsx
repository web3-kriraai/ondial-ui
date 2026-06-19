import React from 'react';

/**
 * Renders one or more JSON-LD blocks as <script type="application/ld+json">.
 * Pass a single object or an array. Null / undefined entries are skipped so
 * builders can return null on missing data without callers branching.
 */
const StructuredData = ({ data }) => {
  if (!data) return null;
  const items = Array.isArray(data) ? data.filter(Boolean) : [data];
  if (items.length === 0) return null;

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schemas are author-controlled JSON; stringify produces safe HTML.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
