"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import { Form } from "@/types/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteForm } from "@/actions/deleteForm";
import {motion} from "framer-motion";


type Props = {
  form: Form;
};

const FormList: React.FC<Props> = ({ form }) => {
  const router = useRouter();

  // ✅ Debugging: Log form content
  // console.log("Form Content:", form.content);

  // ✅ Safe JSON parsing
  let formTitle = "Untitled Form";
  try {
    if (form.content) {
      const parsedContent = typeof form.content === 'string' ? JSON.parse(form.content) : {};
      formTitle = parsedContent?.formTitle || "Untitled Form";
    }
  } catch (error) {
    console.error("Error parsing form.content:", error);
  }

  const deleteFormHandler = async (formId: number) => {
    const data = await deleteForm(formId);

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">{formTitle}</CardTitle>
          <CardDescription className="text-sm">
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={`/dashboard/forms/${form.id}/submissions`}>
            <Button variant="link" className="text-blue-600">
              Submission - {form.submissions}
            </Button>
          </Link>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
         {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row justify-between mt-3 gap-2">
        {/* Edit Button */}
        <motion.button
          onClick={() => router.push(`/dashboard/forms/edit/${form.id}`)}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg text-gray-700 font-medium hover:underline w-full sm:w-auto"
          whileHover={{ cursor: "pointer", backgroundColor: "#f3f4f6" }}
         
        >
          <Edit2 className="w-4 h-4 text-gray-600" />
          Edit
        </motion.button>

        {/* Delete Button */}
        <motion.button
          onClick={() => deleteFormHandler(form.id)}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:underline w-full sm:w-auto"
          whileHover={{ cursor: "pointer", backgroundColor: "#dc2626" }}
          
        >
          Delete
        </motion.button>
      </div>
        </CardFooter>{" "}
      </Card>
    </div>
  );
};

export default FormList;
