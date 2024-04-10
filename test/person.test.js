const Person = require('../src/person');
const Institution = require('../src/institution');

describe("Person Test Cases", () => {
  testInstitution = null
  testPerson = null


  beforeEach(() => {

    testInstitution = new Institution('Quinnipiac University', 'qu.edu');
    testPerson = new Person('James', 'LeBron', testInstitution,
      '1/1/2024', 'LeBron.James', 'Student');

  });

  test("Check Email Formation", () => {

    const email = testPerson.email;


    expect(email).toBe('LeBron.James@qu.edu');
  });

  test("Verify toString Output", () => {
    const personString = testPerson.toString();

    expect(personString).toContain('Student Name: LeBron James');
    expect(personString).toContain('School: Quinnipiac University');
    expect(personString).toContain('Username: LeBron.James');
    expect(personString).toContain('affiliation: Student');
  });

});
