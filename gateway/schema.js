import { stitchSchemas } from "@graphql-tools/stitch";
import { createRemoteSchema } from "../libs/remote-schema.js";

export const makeGatewaySchema = async () => {
  const studentSchema = await createRemoteSchema(
    "http://localhost:4001/graphql"
  );
  const coursesSchema = await createRemoteSchema(
    "http://localhost:4002/graphql"
  );
  const enrollmentSchema = await createRemoteSchema(
    "http://localhost:4003/graphql"
  );

  return stitchSchemas({
    subschemas: [
      {
        ...studentSchema,
        batch: true,
        merge: {
          Enrollment: {
            fieldName: "_enrollmentStudents",
            selectionSet: "{ studentId }",
            args: (originalObject) => {
              return { studentId: originalObject.studentId };
            },
          },
        },
      },
      {
        ...coursesSchema,
        batch: true,
        merge: {
          Enrollment: {
            fieldName: "_enrollments",
            selectionSet: "{ id }",
            key: ({ id }) => id,
            argsFromKeys: (ids) => {
              return { ids };
            },
          },
        },
      },
      {
        ...enrollmentSchema,
        batch: true,
        merge: {
          Student: {
            fieldName: "_studentEnrollments",
            selectionSet: "{ id }",
            args: (originalObject) => {
              return { studentId: originalObject.id };
            },
          },
          Course: {
            fieldName: "_course",
            selectionSet: "{ id }",
            args: (originalObject) => {
              return { courseId: originalObject.id };
            },
          },
        },
      },
    ],
  });
};
