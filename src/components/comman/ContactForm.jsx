import React, { useRef, useState } from "react";
import {
  Button,
  Heading,
  Input,
  MapComponent,
  MaxContainer,
  Textarea,
} from "..";
import {
  useGetContactInfoQuery,
  usePostContactFormMutation,
} from "@/redux/api/contactApi";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const { t } = useTranslation();
  const recaptchaRef = useRef();
  const { data } = useGetContactInfoQuery();
  const [postContactForm] = usePostContactFormMutation();
  const [selectedOption, setSelectedOption] = useState("Kuwait");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialState = {
    name: "",
    email: "",
    phoneNo: "",
    subject: "",
    question: "",
    EmailAddress: import.meta.env.VITE_SALES_EMAIL,
    cc: import.meta.env.VITE_CC,
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phoneNo ||
      !formData.question ||
      !formData?.subject
    ) {
      toast.error("All fields should be filled");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      const formWithToken = { ...formData, recaptchaToken: token };
      await postContactForm(formWithToken).unwrap();
      toast.success("Contact form submitted successfully");
      setFormData(initialState);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MaxContainer className="flex w-full flex-col gap-8 px-5 py-10 lg:flex-row">
      <div className="w-full">
        <Heading variant="big">{t("contact.contact_form")}</Heading>
        <form
          className="mt-8 grid grid-cols-12 gap-5 py-5"
          onSubmit={handleSubmit}
        >
          <Input
            id="name"
            label="Name"
            placeholder="Enter your name"
            className="col-span-12 sm:col-span-6"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            id="email"
            label="Email"
            placeholder="Enter your email"
            className="col-span-12 sm:col-span-6"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            id="phoneNo"
            label="Phone No."
            placeholder="Enter your phone number"
            className="col-span-12 sm:col-span-6"
            value={formData.phoneNo}
            onChange={handleChange}
          />

          <Input
            id="subject"
            label="Subject"
            placeholder="Enter subject"
            className="col-span-12 sm:col-span-6"
            value={formData.subject}
            onChange={handleChange}
          />

          <Textarea
            id="question"
            label="Question"
            placeholder="Type your question"
            className="col-span-12"
            value={formData.question}
            onChange={handleChange}
            rows={4}
          />

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            size="invisible"
            className="col-span-12"
          />

          <Button
            type="submit"
            text={isSubmitting ? "Submitting..." : "Submit"}
            variant="secondary"
            className="col-span-12 mx-auto w-full text-base disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          />

        </form>
      </div>

      <div className="h-full w-full bg-white p-3 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {data?.data?.map((d) => (
            <Button
              key={d?._id}
              onClick={() => setSelectedOption(d?.title)}
              variant={`${selectedOption === d?.title ? "primary" : "primaryOutline"
                }`}
              text={d?.title}
              className={"uppercase"}
            />
          ))}
        </div>

        {data?.data ? (
          <MapComponent
            markers={data?.data}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ) : (
          <div className="h-[400px] w-full" />
        )}
      </div>
    </MaxContainer>
  );
}
