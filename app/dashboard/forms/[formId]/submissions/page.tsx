import SubmissionsDetails from "@/components/SubmissionsDetails";
import prisma from "@/lib/prisma";
import React from "react";

const Submissions = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const formId = (await params).formId;

  const submissions = await prisma.submissions.findMany({
    where: {
      formId: Number(formId),
    },
    include: {
      form: true,
    },
  });

  if (!submissions || submissions.length === 0) {
    return <h1 className="text-center text-lg font-semibold mt-10">No submissions found </h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {submissions.map((submission: any, index: number) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">
          <SubmissionsDetails submission={submission} index={index} />
        </div>
      ))}
    </div>
  );
};

export default Submissions;
