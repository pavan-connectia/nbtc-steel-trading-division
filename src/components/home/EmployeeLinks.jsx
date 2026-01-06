import React from "react";
import employee2 from "@/assets/home/emplyoee-2.webp";
import employees from "@/assets/home/employees.webp";
import { HyperLink, Img, Paragraph } from "../";
import { LuArrowRight } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

const EmployeeLinks = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-[28rem] w-full overflow-hidden">
      <div className="hidden lg:block lg:w-[40%]">
        <Img
          src={employees}
          className="h-full w-full overflow-hidden object-cover"
        />
      </div>
      <div className="relative w-full lg:w-[60%]">
        <div className="absolute top-0 h-full w-full bg-blue/90" />
        <Img
          src={employee2}
          className="h-full w-full overflow-hidden object-cover"
        />

        <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center space-y-5 px-5 md:px-10">
          <div className="flex w-full flex-wrap justify-between gap-6 bg-[#D4DDEE] p-5 sm:p-10">
            <Paragraph className="font-bold md:text-lg">
              {t("home.join_the_team")}
              <br />
              <span className="font-normal">
                {t("home.explore_exciting_career_opportunities")}.
              </span>
            </Paragraph>
            <HyperLink
              children={t("home.explore_careers")}
              icon={<LuArrowRight className="rtl:rotate-180" />}
              href="/careers"
              variant={"filled"}
              className={"my-auto h-fit bg-blue rtl:flex-row-reverse"}
            />
          </div>

          <div className="flex w-full flex-wrap justify-between gap-6 bg-[#D4DDEE] p-5 sm:p-10">
            <Paragraph className="md:text-lg">
              {t("home.employee_login_payroll_benefits")}.
              <br />
              {t("home.login_to_employee_portal")}
            </Paragraph>
            <HyperLink
              children={t("home.employee_login")}
              icon={<MdLockOutline />}
              variant={"filled"}
              href="/employee-login"
              className={"my-auto h-fit rtl:flex-row-reverse"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLinks;
