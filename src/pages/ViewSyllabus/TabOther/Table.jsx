
import React from "react";

const Table = ({ data }) => {
  const typeColors = {
    "Concept/Lecture": "#F4BE37",
    "Seminar/Workshop": "#FF9F40",
    "Test/Quiz": "#0D2535",
    "Exam": "#5388D8",
    "Guide/Review": "#206EE5",
    "Assignment/Lab": "#00FF33",
  };
  const types = Object.keys(typeColors);

  return (
    <table>
    <tbody>
      {types.map((type) => {
        const d = data.find((item) => item.type === type);
        return (
          <tr key={type}>
            <td style={{ paddingRight: "10px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: typeColors[type],
                }}
              ></div>
            </td>
            <td>{type}</td>
            <td>({d ? d.percentage.toFixed(0) : 0}%)</td>
          </tr>
        );
      })}
    </tbody>
  </table>
  );
};

export default Table;

