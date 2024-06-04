import lab from "../assetsSyllabus/lab.svg";
import lecture from "../assetsSyllabus/lecture.svg";
import quiz from "../assetsSyllabus/quiz.svg";
import review from "../assetsSyllabus/review.svg";
import workshop from "../assetsSyllabus/workshop.svg";
import exam from "../assetsSyllabus/exam.svg"
import Chip from "@mui/material/Chip";

export const icons = {
  10: {
    iconName: "exam",
    path: exam,
  },
  11: {
    iconName: "serminar/workshop",
    path: workshop,
  },
  4: {
    iconName: "test/quiz",
    path: review,
  },
  5: {
    iconName: "exam",
    path: workshop,
  },
  6: {
    iconName: "Asignment/lab",
    path: lab,
  },
  7: {
    iconName: "Concept/lecture",
    path: lecture,
  },
  8: {
    iconName: "guide/review",
    path: quiz,
  },
  9: {
    iconName: "test/quiz",
    path: review,
  },
};

export const contents = [
  {
    idContent: 1,
    titleContent: ".NET Introduction",
    contentUnit: "unit5",
    statusContent: "Online",
    Idicon: 1,
  },
  {
    idContent: 2,
    titleContent: "Declaration & Assignment",
    contentUnit: "unit5",
    statusContent: "Offline",
    Idicon: 2,
  },
  {
    idContent: 3,
    titleContent: "Practice Time: Assignment/Mentoring",
    contentUnit: "unit5",
    statusContent: "Offline ",
    Idicon: 3,
  },
  {
    idContent: 4,
    titleContent: "Operators",
    contentUnit: "unit6",
    statusContent: "Online",
    Idicon: 1,
  },
  {
    idContent: 5,
    titleContent: "Comparation",
    contentUnit: "unit6",
    statusContent: "Online",
    Idicon: 1,
  },
  {
    idContent: 6,
    titleContent: "Logical Operators",
    contentUnit: "unit6",
    statusContent: "Online",
    Idicon: 1,
  },
];

export const StatusChip = ({ e }) => {
  return (
    <div>
      {e === "Online" ? (
        <Chip
          label={e}
          style={{
            color: "#D45B13",
            border: "#D45B13 solid 1px",
            backgroundColor: "#F1F1F1",
          }}
        />
      ) : (
        <Chip
          label={e}
          style={{ color: "#ffffff", backgroundColor: "#2D3748" }}
        />
      )}
    </div>
  );
};