import React from "react";
import { Heading, HyperLink } from "@/components";

const EmployeeLogin = () => {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <Heading variant="big" children="Coming Soon" />

      <HyperLink
        href={"/"}
        children="Go back"
        variant="outline"
        className="my-5"
      />
    </div>
  );
};

export default EmployeeLogin;
