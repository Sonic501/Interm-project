
const outputStandards = ["H4SD", "H2SD", "K6SD", "H6SD", "K4SD", "KT4D"];
const statuses = ["Online", "Offline"];
const deliveryTypes = [
  "Assignment/Lab",
  "Concept/Lecture",
  "Guide/Review",
  "Test/Quiz",
  "Exam",
  "Seminar/Workshop",
];
const unitNames = [
  "First Intro",
  "Basic C",
  ".Net Introduction",
  "Operator",
  "Flow Control",
  "Basic OOP",
  "Testing",
];
const lessonNames= [".NET Introduction", "Declaration & Assignment", "Practice Time: Assignment/Mentoring", "Operators", "Comparation", "Logical Operators", "Practice Time: Assignment/Mentoring"]

const durations = [30, 45, 60, 90, 120];

const folders=[' overview.pdf','.ppt',' practice.pdf','.youtube'];

const authors=["Joseph","Alice","John","Marriana","David","Teresa"];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
}


const lessons = {
  name: "",
  outputStandard: "H4SD",
  duration: 0,
  status: "",
  deliveryType: "",
  folder: "Folder",
};

const units = {
  unit: "",
  name: "",
  duration: 0,
  lessons: [],
};

const days = {
  day: "Day 1",
  units: [],
};

const data=[]

for (let i = 0; i < 8; i++) {
  const day = {};
  day.day = "Day " + (i + 1);
  day.units=[]
  for (let j = 0; j < 2; j++) {
    day.units[j] = {};
    let unit = day.units[j];
    unit.unit = "Unit " + ((i + 1) * 2 + (j - 1));
    unit.name = unitNames[Math.floor(Math.random() * unitNames.length)];
    unit.duration = 0;
    unit.lessons=[]
    for (let k=0; k<3; k++) {
        unit.lessons[k]= {}
        let lesson = unit.lessons[k]
        lesson.name= lessonNames[Math.floor(Math.random() * lessonNames.length)];
        lesson.outputStandard=outputStandards[Math.floor(Math.random() * outputStandards.length)];
        lesson.duration=durations[Math.floor(Math.random() * durations.length)];
        unit.duration+=(lesson.duration / 60)
        lesson.status=statuses[Math.floor(Math.random() * statuses.length)];
        lesson.deliveryType= deliveryTypes[Math.floor(Math.random() * deliveryTypes.length)];
        
        lesson.folder=[]
        for (let p=0; p<4; p++) {
          const file=lesson.name+folders[p]
          const author=authors[Math.floor(Math.random() * authors.length)];
          const date= randomDate(new Date(2022,1,1),new Date())
          const element={file,author,date}
          lesson.folder.push(element)
        }

        lesson.key= k+"-"+unit.unit+"-"+day.day;
    }
  }
  data.push(day)
}

export default data ;

