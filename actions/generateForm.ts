"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

// ✅ Load API Key from environment variables
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
    throw new Error("Google API key is missing. Add it to your .env.local file.");
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateForm = async (prevState: unknown, formData: FormData) => {
    try {
        const user = await currentUser();
        if (!user) return { success: false, message: "User not found" };

        // ✅ Validate form data
        const schema = z.object({
            description: z.string().min(1, "Description is required"),
        });

        const result = schema.safeParse({
            description: formData.get("description") as string,
        });

        if (!result.success) {
            return { success: false, message: "Invalid form data", error: result.error.errors };
        }

        const description = result.data.description;

        // ✅ Improved Gemini Prompt
        const prompt = `
        Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
        {
          "formTitle": "string", // The title of the form
          "formFields": [        // An array of fields in the form
            {
              "label": "string", // The label to display for the field
              "name": "string",  // The unique identifier for the field (used for form submissions)
              "placeholder": "string" // The placeholder text for the field
            }
          ]
        }
        Requirements:
        - Use only the given keys: "formTitle", "formFields", "label", "name", "placeholder".
        - Always include at least 3 fields in the "formFields" array.
        - Keep the field names consistent across every generation for reliable rendering.
        - Provide meaningful placeholder text for each field based on its label.
        - Return **only** valid JSON without any additional formatting (e.g., no markdown).
        `;

        // ✅ Google Gemini Request
        const response = await model.generateContent(`${description} ${prompt}`);
        let formContent = response.response.text().trim();

        // console.log("🔍 Raw Generated Response:", formContent); // ✅ Debugging

        // ✅ Clean up possible markdown formatting (if any)
        formContent = formContent.replace(/^```json/, "").replace(/```$/, "").trim();

        // ✅ Ensure valid JSON response
        let formJsonData;
        try {
            formJsonData = JSON.parse(formContent);
        } catch (error) {
            console.error("🚨 Error parsing JSON:", error);
            return { success: false, message: "Generated form content is not valid JSON" };
        }

        // console.log("✅ Generated Form JSON ->", formJsonData);

        // ✅ Save to Database
        const form = await prisma.form.create({
            data: {
                ownerId: user.id,
                content: JSON.stringify(formJsonData), // ✅ Store JSON properly
            },
        });

        revalidatePath("/dashboard/forms"); // ✅ Refresh UI

        // console.log("🔍 Loaded GOOGLE_API_KEY:", GOOGLE_API_KEY);
        return {
            success: true,
            message: "Form generated successfully🎉,Wait..!",
            data: form
        };
    } catch (error) {
        console.error("🚨 Error generating form:", error);
        // console.log("🔍 Loaded GOOGLE_API_KEY:", GOOGLE_API_KEY);
        return { success: false, message: "An error occurred while generating the form" };
    }
};
