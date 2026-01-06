import React from "react";
import Img from "../ui/Img";
import { Link } from "react-router-dom";

const BrandsCard = ({ brand }) => {
  return (
    <Link
      to={`/brands/${brand?._id}`}
      key={brand?._id}
      className="flex h-32 w-48 min-w-40 items-center justify-center bg-white px-7 py-4"
    >
      <Img
        dynamic
        src={brand?.image}
        className="h-full w-full object-contain"
      />
    </Link>
  );
};

export default BrandsCard;
