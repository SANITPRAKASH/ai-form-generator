"use server"

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"
// import { useSession } from "@clerk/nextjs";

export const getForms = async () => {
    try {
        
        const user = await currentUser();
        
        if (!user) {
            return { success: false, message: "User not found" }
        }
        
        const forms = await prisma.form.findMany({
            where: {
                ownerId: user.id
            },
        });
        
        if (!forms) {
            return { success: false, message: "Form not found" }
        }

        // console.log(forms);
        return {
            success: true,
            message: "Forms found",
            data: forms
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("An unknown error occurred");
        }

    }

}