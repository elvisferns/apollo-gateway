const enrollments = [{
  id: "1", studentId: "1", courseId: "1",
}, {
  id: "2", studentId: "1", courseId: "2",
}, {
  id: "3", studentId: "2", courseId: "3",
}, {
  id: "4", studentId: "3", courseId: "1",
}]

export const resolvers = {
  Query: {
    enrollments() {
      return enrollments;
    },
    enrollmentsByID(_, {enrollmentId}) {
      return enrollments.find(({id}) => enrollmentId === id);
    },
    _studentEnrollments(_, { studentId: id }) {
      console.log(`🚀 ~ file: resolvers.js ~ line 20 ~ _studentEnrollments ~ id`, id);
      return {id};
    },
    _course(_, {courseId}) {
      return { courseId }
    }
  },
  Student: {
    enrollments({id}) {
      return enrollments.filter((enrollment) => enrollment.studentId === id);
    } 
  },
  Course: {
    enrollments({courseId}) {
      return enrollments.filter((enrollment) => enrollment.courseId === courseId);
    }
  }
};