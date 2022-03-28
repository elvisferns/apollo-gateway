const students = [{
  id: "1", name: 'John', email: 'john@gmail.com',
}, {
  id: "2", name: 'Ell', email: 'ell@gmail.com'
}, {
  id: "3", name: 'Kate', email: 'kate@gmail.com'
}]

export const resolvers = {
  Query: {
    students() {
      return students;
    },
    studentByID(_, { id: studentId }) {
      return students.find(({ id }) => studentId === id);
    },
    studentEnrollments(_, { studentId }) {
      return students.find(({id}) => id === studentId);
    },
    _enrollmentStudents(_, { studentId }) {
      return {studentId}
    }
  },
  Enrollment: {
    student({studentId}) {
      return students.find(({id}) => id === studentId);
    }
  }
};