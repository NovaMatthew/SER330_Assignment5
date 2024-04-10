const Student = require('../src/student');
const Institution = require('../src/institution');

describe("Test Group for Student class", () => {
    testInstitution = null
    seniorStudent = null
    beforeEach(() => {

        testInstitution = new Institution('quinnipiac University', 'qu.edu');
        seniorStudent = new Student('Dahl', 'Ryan', testInstitution, '1/1/2024', 'rdahl')

    });

    test('InitializeStudent_WithValidParameters_CorrectlySetsProperties', () => {

        expect(seniorStudent.lastName).toBe('Dahl');
        expect(seniorStudent.firstName).toBe('Ryan');
        expect(seniorStudent.school).toEqual(testInstitution);
        expect(seniorStudent.dateOfBirth).toEqual(new Date('1/1/2024'));
        expect(seniorStudent.userName).toBe('rdahl');
        expect(seniorStudent.affiliation).toBe('student');
        expect(seniorStudent.courseList).toEqual([]);
        expect(seniorStudent.transcript).toEqual({});
    });


    test('GetCredits_WhenNewStudent_ReturnsZero', () => {
        expect(seniorStudent.credits).toBe(0);
    });

    test('AddCourseCredits_ToExistingCredits_CorrectlySumsCredits', () => {
        seniorStudent.courseList.push({ course: { credits: 3 } }, {
            course:
                { credits: 3 }
        });
        expect(seniorStudent.credits).toBe(6);
    });


    test('AddCourseCredits_ToExistingCredits_CorrectlySumsCredits', () => {
        expect(seniorStudent.gpa).toBe(0);
    });


    test('ListCourses_WhenCoursesPresent_OrderedByYearAndQuarter', () => {
        seniorStudent.transcript = {
            'Math 101': { year: 2020, quarter: 1 },
            'English 101': { year: 2021, quarter: 2 }
        };
        const orderedCourses = seniorStudent.list_courses();

        expect(orderedCourses).toEqual(['English 101', 'Math 101']);
    });


    test("ToString_WhenCalled_ReturnsExpectedStringFormat", () => {
        const studentString = seniorStudent.toString();

        expect(studentString).toContain('Student Name: Ryan Dahl');
        ;

    });


});
