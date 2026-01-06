import React from "react";
import { Helmet } from "react-helmet-async";

const Head = ({
  title = "NBTC",
  description,
  keywords,
  canonicalUrl,
  ogUrl,
  ogImage,
}) => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {description && <meta property="og:description" content={description} />}
      {title && <meta property="og:title" content={title} />}
    </Helmet>
  );
};

export default Head;
