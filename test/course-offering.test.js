const Institution = require('../src/institution.js')
const Course = require('../src/course.js')
const CourseOffering = require('../src/course-offering.js')
const Student = require('../src/student.js')
const Instructor = require('../src/instructor.js')

describe('Test Group for Course Offering', () => {

    testInstitution = null
    courseTest = null
    courseOffering = null
    seniorStudent = null
    testInstructor = null

    beforeEach(() => {
        testInstitution = new Institution('quinnipiac University', 'qu.edu');
        courseTest = new Course('Software Engineering', 'SERR300', 'Software Quality Assurance', 3)
        courseOffering = new CourseOffering(courseTest, '12', '2024', '1')
        seniorStudent = new Student('Ryan', 'Dahl', testInstitution, '1/1/2024', 'rdahl')
        testInstructor = new Instructor('Nicolini', 'Dylan', testInstitution, '1/1/2024', 'dnicolini')

    })

    test('CreateCourseOffering_WhenAllConditionsMet_ReturnObject', () => {



        //Assert
        expect(courseOffering).not.toBeNull
    })

    test('RegisterStudentToCourse_whenAllConditionsMet_CompletesSuccessfully', () => {

        //Arrange
        const students = new Array(seniorStudent)

        //Act
        courseOffering.register_students(students)

        //Assert
        const registeredStudents = courseOffering.get_students()
        expect(registeredStudents.length).toEqual(students.length)


    })

    test('AssignInstructor_WhenGivenValidInstructor_AssignsSuccessfully', () => {

        // Act
        courseOffering.instructor = testInstructor

        // Assert
        expect(courseOffering.instructor).toEqual(testInstructor);
        expect(courseOffering.instructor.firstName).toBe('Dylan');
        expect(courseOffering.instructor.lastName).toBe('Nicolini');

    })

    test('SubmitGrade_WhenGivenValidGrade_UpdatesGradesAndTranscript', () => {
        // Arrange
        const grade = 'A';
        courseOffering.register_students([seniorStudent]); 

        // Act
        courseOffering.submit_grade(seniorStudent, grade); 

        // Assert
        expect(courseOffering.grades[seniorStudent.userName]).toBe(grade);

        const courseKey = courseOffering.toString();
        expect(seniorStudent.transcript[courseKey]).toBe(grade);
    });
})

