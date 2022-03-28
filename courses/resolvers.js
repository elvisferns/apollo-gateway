const courses = [
  {
    id: "1",
    name: "course1",
  },
  {
    id: "2",
    name: "course2",
  },
  {
    id: "3",
    name: "course3",
  },
];

export const resolvers = {
  Query: {
    courses() {
      return courses;
    },
    courseByID(_, { id: courseId }) {
      return courses.find(({ id }) => courseId === id);
    },
    courseByIDs(_, { ids }) {
      const idSet = new Set(ids);
      return courses.filter(({ id }) => idSet.has(id));
    },
    _enrollment(_, args) {
      return { courseId: args.id };
    },
    _enrollments(_, { ids }) {  
      return ids.map((id) => id);
    },
  },
  Enrollment: {
    course(courseId) {
      const data = courses.find(({ id }) => id === courseId);
      return data;
    },
  },
};
