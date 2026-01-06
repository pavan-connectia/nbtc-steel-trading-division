import React, { useRef, useState, useEffect } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { Button, Heading, Input, Textarea } from "..";
import toast from "react-hot-toast";
import { usePostQuotationMutation } from "@/redux/api/quotationApi";
import { usePostUploadMutation } from "@/redux/api/uploadApi";

const QuotationForm = ({

  isOpen,
  onClose,
  department,
  title,
}) => {
  const modalRef = useRef(null);
  const [postQuotation] = usePostQuotationMutation();
  const [uploadResume] = usePostUploadMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    department: "",
    pdf: "",
    title: "",
    salesEmailAddress: import.meta.env.VITE_SALES_EMAIL,
    cc: import.meta.env.VITE_CC,
    site: "",
    company: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      department,
      title,
    }));
  }, [department, title]);

  useClickOutside(modalRef, onClose);
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "pdf") {
      setFormData((prev) => ({
        ...prev,
        pdf: files?.[0] || "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, phone, message } = formData;

  if (!name || !email || !phone || !message) {
    toast.error("All fields should be filled.");
    return;
  }

  try {
    setIsSubmitting(true);

    let uploadedPdfPath = "";

    if (formData.pdf instanceof File) {
      const pdfFormData = new FormData();
      pdfFormData.append("file", formData.pdf);

      const uploadRes = await uploadResume({
        image: pdfFormData,
        folder: "/uploads/quotation-pdf",
      }).unwrap();

      uploadedPdfPath = uploadRes?.filePath;
    }

    const recaptchaToken = await window.grecaptcha.execute(
      import.meta.env.VITE_RECAPTCHA_SITE_KEY,
      { action: "quotation_submit" }
    );

    const payload = {
      ...formData,
      pdf: uploadedPdfPath || "",
      title: formData.title?.trim() || "General Enquiry",
      recaptchaToken,
    };

    await postQuotation(payload).unwrap();

    toast.success(
      "Thank you for your request. We will reach out to you shortly!"
    );
    onClose();
  } catch (error) {
    toast.error("Something went wrong. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="relative z-40 max-h-[90vh] w-11/12 max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-lg"
        ref={modalRef}
      >
        <div className="absolute right-2 top-2">
          <Button
            onClick={onClose}
            variant="none"
            className="text-2xl font-semibold opacity-70 hover:opacity-100"
          >
            &times;
          </Button>
        </div>

        <Heading className="mt-3 text-left text-xl" variant="small">
          Quotation Form
        </Heading>
        <p className="mb-4 mt-2 text-gray-600">
          Please fill out the form below, and we will get back to you shortly.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue">Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue">Phone</label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue">Location</label>
            <Input
              name="site"
              value={formData.site}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue">Company Name</label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue">
              Message
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue">
              Attach PDF (Optional)
            </label>

            <Input
              type="file"
              name="pdf"
              accept=".pdf"
              onChange={handleChange}
            />
          </div>


          <Button
            type="submit"
            className="font-kanit w-full bg-red py-2 text-white disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            text={isSubmitting ? "Submitting..." : "Submit"}
          />
        </form>
      </div>
    </div>
  );
};

export default QuotationForm;
