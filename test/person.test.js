const Person = require('../src/person')
const Institution = require('../src/institution')


 

describe("Person Test Cases", () => {

 test("Given_NewPerson_When_All_ConditionsMet_Then_ReturnTrue", () => {

    // Given 
    // My assumption
    // Create an institution (of learning)
    // Institution.
    const testInstitution = new Institution('Quinnipiac Uniiversity' , 'qu.edu')


        //When 
        //The actions necessary tto complete the test case 
        //create and validate a Person 
        const testPerson = new Person('lastName', 'firstName','1/1/2024', 'student_username','affiliation')

        //Then 
        //Condition verifying expect(2 + 2).toBe(4);
        expect(2 + 2).toBe(4)
  

   // assertions



 });


})