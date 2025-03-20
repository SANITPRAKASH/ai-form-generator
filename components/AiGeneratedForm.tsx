"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { publishForm } from "@/actions/publishForm";
import { Fields } from "@/types/form";
import toast from "react-hot-toast";
import { submitForm } from "@/actions/submitForm";
import FormPublishDialog from "./FormPublishDialog";
import { motion } from "framer-motion";

type Props = { form: any; isEditMode: boolean };

const AiGeneratedForm: React.FC<Props> = ({ form, isEditMode }) => {
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [submitted, setSubmitted] = useState<boolean>(false); // ✅ Track submission status

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      await publishForm(form.id);
      setSuccessDialogOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await submitForm(form.id, formData);

    if (data?.success) {
      toast.success(data.message);
      setFormData({});
      setSubmitted(true); // ✅ Disable form after submission
    } else {
      toast.error(data?.message || "An error occurred");
    }
  };

  let value;
  try {
    const content = form?.content ?? "{}";
    value = typeof content !== "object" ? JSON.parse(content) : content;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    value = { formTitle: "Untitled Form", formFields: [] };
  }

  const formTitle = value?.formTitle || "Untitled Form";
  const data = value?.formFields || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {formTitle}
      </motion.h1>

      <form onSubmit={isEditMode ? handlePublish : handleSubmit}>
        {data.map((item: Fields, index: number) => (
          <motion.div
            key={index}
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Label>{item.label}</Label>
            <Input
              type="text"
              name={item.name}
              placeholder={item.placeholder}
              required={!isEditMode}
              onChange={handleChange}
              disabled={submitted || isEditMode} // ✅ Disable after submission
              className={`border p-2 w-full ${
                submitted || isEditMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </motion.div>
        ))}

        <motion.button
          className={`mt-4 px-6 py-2 rounded-lg shadow-md 
            transition-all duration-300 cursor-pointer hover:underline 
            ${submitted ? "bg-gray-500 cursor-not-allowed" : "bg-black text-white"}`}
          disabled={submitted} // ✅ Disable submit button after submission
        >
          {submitted ? "Submitted" : isEditMode ? "Publish" : "Submit"}
        </motion.button>
      </form>

      <FormPublishDialog
        formId={form.id}
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
      />
    </motion.div>
  );
};

export default AiGeneratedForm;
