const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();



const InquiryMock = dbMock.define('Inquiry', {
    id:1,
    name:"tester",
    email:"tester@gmail.com",
    phone:"9098989898",
    age:23,
    permanentAddress:"Basantapur",
    temporaryAddress:"Basantapur",
    gender:"Male",
    maritalStatus:"Single",
    workExperience:{ company: 'ABC Corp', years: 3 },
    interestedCountries: ['USA', 'Canada'],
    testsTaken: [{ test: 'IELTS', score: 7 }],
    status:"Inquiry"

});

describe('Inquiry Model', () => {
  it('should create a inquiry', async () => {
    const enroll = await InquiryMock.create({
        name:"new tester",
        email:"newtester@gmail.com",
        phone:"9098989008",
        age:33,
        permanentAddress:"Basantapur",
        temporaryAddress:"Basantapur",
        gender:"Male",
        maritalStatus:"Single",
        workExperience:{ company: 'ABC Corp', years: 4 },
        interestedCountries: ['USA', 'Canada','Austrailia'],
        testsTaken: [{ test: 'IELTS', score: 7.5 }],
        status:"Inquiry"
    });

    expect(enroll.name).toBe("new tester");
    expect(enroll.email).toBe("newtester@gmail.com");
    expect(enroll.phone).toBe("9098989008");
    expect(enroll.age).toBe(33);
    expect(enroll.permanentAddress).toBe("Basantapur");
    expect(enroll.temporaryAddress).toBe("Basantapur");
    expect(enroll.gender).toBe("Male");
    expect(enroll.maritalStatus).toBe("Single");
    expect(enroll.workExperience).toBe({ company: 'ABC Corp', years: 4 });
    expect(enroll.interestedCountries).toBe(['USA', 'Canada','Austrailia']);
    expect(enroll.testsTaken).toBe([{ test: 'IELTS', score: 7.5 }]);
    expect(enroll.status).toBe("Inquiry");




  });

  it('should require a name, email and phone', async () => {
    await expect(InquiryMock.create({})).rejects.toThrow();
  });
});