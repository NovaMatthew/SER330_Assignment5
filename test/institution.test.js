const Institution = require('../src/institution.js')
const Instructor = require('../src/instructor.js')
const Student = require('../src/student.js')
const Course = require('../src/course.js')
const CourseOffering = require('../src/course-offering.js')





describe('Institution Class Tests', () => {
    testInstitution = null
    seniorStudent = null
    sqaInstructor = null
    softwareQualityAssuranceCourse = null
    courseOffering = null
    courseTest = null

    beforeEach(() => {
        testInstitution = new Institution('Quinnipiac University', 'qu.edu');
        sqaInstructor = new Instructor('Nicolini', 'Dylan', testInstitution, '1/1/2024', 'dnicolini')
        seniorStudent = new Student('Ryan', 'Dahl', testInstitution, '1/1/2024', 'rdahl')

        courseTest = new Course('Software Engineering', 'SERR300', 'Software Quality Assurance', 3)
        softwareQualityAssuranceCourse = new Course('Software Engineering', 'SER330', 'Software Quality Assurance', 3)
        courseOffering = new CourseOffering(courseTest, '12', '2024', '1')

        testInstitution.hire_instructor(sqaInstructor);
        testInstitution.add_course(softwareQualityAssuranceCourse);
        testInstitution.add_course_offering(courseOffering);

    });
    test('enroll_student_WithInvalidStudent_ThrowsTypeError', () => {
        // Arrange
        const invalidStudent = {}; // Not an instance of Student

        // Act & Assert
        expect(() => {
            testInstitution.enroll_student(invalidStudent);
        }).toThrow(TypeError);
    });

    test('enroll_student_WhenGivenValidStudent_EnrollsStudentSuccessfully', () => {

        // Arrange

        // Act
        testInstitution.enroll_student(seniorStudent)

        // Assert
        expect(Object.values(testInstitution.studentList)).toContain(seniorStudent);
    });

    test('enroll_student_WhenStudentAlreadyEnrolled_DoesNotDuplicateEnrollment', () => {

        //Act
        testInstitution.enroll_student(seniorStudent); // First enrollment
        testInstitution.enroll_student(seniorStudent); // Attempt second enrollment

        // Assert
        const enrollmentCount = Object.values(testInstitution.studentList).filter(student => student.userName === seniorStudent.userName).length;
        expect(enrollmentCount).toBe(1);
    });
    test('hire_instructor_WhenGivenValidInstructor_HiresSuccessfully', () => {
        // Act
        testInstitution.hire_instructor(sqaInstructor);

        // Assert
        expect(Object.values(testInstitution.facultyList)).toContain(sqaInstructor);
    });

    test('add_course_WhenCourseAlreadyAdded_DoesNotDuplicate', () => {
        // Arrange & Act
        testInstitution.add_course(softwareQualityAssuranceCourse)
        testInstitution.add_course(softwareQualityAssuranceCourse)
        // Assert
        const courseCount = Object.values(testInstitution.courseCatalog).filter(course => course.name === softwareQualityAssuranceCourse.name).length;
        expect(courseCount).toBe(1);
    });

    test('register_student_for_course_WhenGivenValidDetails_RegistersSuccessfully', () => {
        // Arrange
        testInstitution.enroll_student(seniorStudent);
        testInstitution.add_course(softwareQualityAssuranceCourse);
        const students = new Array(seniorStudent)
        testInstitution.courseSchedule[courseTest.name] = [courseOffering];
        // Act

        courseOffering.register_students(students)
        testInstitution.register_student_for_course(seniorStudent,
            courseTest.name, courseTest.department, courseTest.number,
            '12', '2024', '1');

        // Assert
        const registeredStudents = courseOffering.get_students();
        expect(registeredStudents).toContain(seniorStudent);
    });


    test('list_course_schedule_ShouldCorrectlyListCourseOfferingsForTerm', () => {
        // Mock console.log to capture output
        console.log = jest.fn();

        // Act
        testInstitution.list_course_schedule('2024', '1');

        // Assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(courseOffering.toString()));
    });


    test('add_course_offering_ToExistingCourse_ShouldUpdateSchedule', () => {
        const newCourseOffering = new CourseOffering(courseTest, '13', '2025', '2');

        // Act
        testInstitution.add_course_offering(newCourseOffering);

        // Assert
        expect(testInstitution.courseSchedule[courseTest.name]).toContain(newCourseOffering);
    });


    test('hire_instructor_WhenInstructorAlreadyHired_ShouldNotDuplicate', () => {
        // Act: Attempt to hire the same instructor twice
        testInstitution.hire_instructor(sqaInstructor);
        testInstitution.hire_instructor(sqaInstructor);

        // Assert: Instructor should only be listed once
        const instructorCount = Object.values(testInstitution.facultyList).filter(instructor => instructor.userName === sqaInstructor.userName).length;
        expect(instructorCount).toBe(1);
    });

    test('list_instructors_ShouldCorrectlyListAllInstructors', () => {
        // Mock console.log to capture output
        console.log = jest.fn();

        // Act
        testInstitution.list_instructors();

        // Assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(sqaInstructor.lastName));
    });


    test('list_course_schedule_WithNoOfferings_ShouldIndicateEmpty', () => {
        // Mock console.log to capture output
        console.log = jest.fn();

        // Ensure there is no course offerings for the specified term
        // Arrange 
        const year = '2099';
        const quarter = 'Winter';

        // Act
        testInstitution.list_course_schedule(year, quarter);

        // Assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('No offerings scheduled during this semester'));
    });


    test('hire_instructor_WithInvalidInstructor_ThrowsTypeError', () => {
        // Arrange
        const invalidInstructor = {}; // Not an instance of Instructor

        // Act & Assert
        expect(() => {
            testInstitution.hire_instructor(invalidInstructor);
        }).toThrow(TypeError);
    });

    test('add_course_WithInvalidCourse_ThrowsTypeError', () => {
        // Arrange
        const invalidCourse = {}; // Not an instance of Course

        // Act & Assert
        expect(() => {
            testInstitution.add_course(invalidCourse);
        }).toThrow(TypeError);
    });

    test('add_course_offering_WithNonexistentCourse_ReturnsError', () => {
        // Arrange
        const newCourseOffering = new CourseOffering(new Course('Nonexistent', 'NON101', 'Nonexistent Course', 1), '13', '2025', '2');

        // Act
        const result = testInstitution.add_course_offering(newCourseOffering);

        // Assert
        expect(result).toBe('Please create a course before creating course offering');
    });

    test('assign_instructor_WhenGivenValidInstructor_AssignsSuccessfully', () => {
        // Act
        sqaInstructor.courseList = sqaInstructor.course_list;
        testInstitution.assign_instructor(sqaInstructor, courseTest.name, courseTest.department, courseTest.number, '12', '2024', '1');

        // Assert
        expect(sqaInstructor.courseList).toContain(courseOffering);


        delete sqaInstructor.courseList;
    });





    test('listStudents_ShouldCorrectlyListAllEnrolledStudents', () => {
        // Mock console.log to capture output
        console.log = jest.fn();

        // Act
        testInstitution.enroll_student(seniorStudent);
        testInstitution.listStudents();

        // Assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(seniorStudent.lastName));
    });


    test('add_course_offering_WithInvalidCourseOffering_ThrowsTypeError', () => {
        // Arrange
        const invalidCourseOffering = {}; // Not an instance of CourseOffering

        // Act & Assert
        expect(() => {
            testInstitution.add_course_offering(invalidCourseOffering);
        }).toThrow(TypeError);
    });

    test('enroll_student_WithNonStudentObject_ThrowsTypeError', () => {
        // Arrange
        const notAStudent = new Instructor('Fake', 'Person', testInstitution, '1/1/2026', 'fperson');

        // Act & Assert
        expect(() => {
            testInstitution.enroll_student(notAStudent);
        }).toThrow(TypeError);
    });

    test('list_registered_students_ShouldCorrectlyListAllRegisteredStudentsForCourseOffering', () => {
        // Mock console.log to capture output
        console.log = jest.fn();

        // Enroll a student and register them for a course offering
        // Arrange
        testInstitution.enroll_student(seniorStudent);
        const students = [seniorStudent];
        courseOffering.register_students(students);

        // Act
        testInstitution.list_registered_students(courseTest.name, courseTest.department, courseTest.number, '12', '2024', '1');

        // Assert
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(seniorStudent.lastName));
    });

    test('list_course_catalog_ShouldCorrectlyListAllCourses', () => {
        // Mock console.log to capture output
        console.log = jest.fn();

        // Act
        testInstitution.list_course_catalog();

        const wasCalledWithCourseName = console.log.mock.calls.some(call =>
            JSON.stringify(call).includes("Software Quality Assurance")
        );

        // Assert
        expect(wasCalledWithCourseName).toBeTruthy();
    });



});



