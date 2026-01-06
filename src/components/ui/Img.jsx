import React from "react";

const Img = ({
  dynamic = false,
  src,
  alt = "",
  loading = "lazy",
  ...props
}) => {
  return (
    <img
      src={dynamic ? `${import.meta.env.VITE_API_BASE_URL}` + src : src}
      alt={alt}
      loading={loading}
      {...props}
    />
  );
};

export default Img;
