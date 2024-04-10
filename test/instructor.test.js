const Instructor = require('../src/instructor.js');
const Institution = require('../src/institution.js')

describe('Instructor Class Tests', () => {
    sqaInstructor = null
    testInstitution = null

    beforeEach(() => {
        testInstitution = new Institution('Quinnipiac University', 'qu.edu');
        sqaInstructor = new Instructor('Nicolini', 'Dylan', testInstitution, '1/1/2024', 'dnicolini')

    });

    test('constructor_SetsPropertiesCorrectly', () => {
        // Assert
        expect(sqaInstructor.lastName).toBe('Nicolini');
        expect(sqaInstructor.firstName).toBe('Dylan');
        expect(sqaInstructor.school).toEqual(testInstitution);
        expect(sqaInstructor.dateOfBirth).toEqual(new Date('1/1/2024'));
        expect(sqaInstructor.userName).toBe('dnicolini');
        expect(sqaInstructor.affiliation).toBe('instructor');
        expect(sqaInstructor.course_list).toEqual([]);
    });

    test('list_courses_ReturnsCorrectCourses_WhenYearAndQuarterGiven', () => {
        // Arrange
        sqaInstructor.course_list = [
            { year: 2022, quarter: 1, toString: () => 'Course 1' },
            { year: 2023, quarter: 2, toString: () => 'Course 2' },
            { year: 2022, quarter: 1, toString: () => 'Course 3' },
        ];

        // Act
        const result = sqaInstructor.list_courses(2022, 1);

        // Assert
        expect(result).toEqual(['Course 1', 'Course 3']);
    });



    test('list_courses_ReturnsCorrectCourses_WhenYearAndQuarterGiven', () => {
        // Arrange
        sqaInstructor.course_list = [
            { year: 2022, quarter: 1, toString: () => 'Course 1' },
            { year: 2023, quarter: 2, toString: () => 'Course 2' },
            { year: 2022, quarter: 1, toString: () => 'Course 3' },
        ];

        // Act
        const result = sqaInstructor.list_courses(2022);

        // Assert
        expect(result).toEqual(['Course 1', 'Course 3']);
    });

    test('list_courses_ReturnsCorrectCourses_WhenYearAndQuarterGiven', () => {
        // Arrange
        sqaInstructor.course_list = [
            { year: 2022, quarter: 1, toString: () => 'Course 1' },
            { year: 2023, quarter: 2, toString: () => 'Course 2' },
            { year: 2022, quarter: 1, toString: () => 'Course 3' },
        ];

        // Act
        const result = sqaInstructor.list_courses(null, 1);

        // Assert
        expect(result).toEqual(['Course 1', 'Course 3']);

    });
});
