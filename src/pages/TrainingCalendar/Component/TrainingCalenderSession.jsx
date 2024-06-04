import Loading from "/src/components/Loading/Loading";
import { useSelector } from "react-redux";
import SessionTime from "./SessionTime";

const morning = [
  { id: "M01", time: "08:00" },
  { id: "M02", time: "08:30" },
  { id: "M03", time: "09:00" },
  { id: "M04", time: "09:30" },
  { id: "M05", time: "10:00" },
  { id: "M06", time: "10:30" },
  { id: "M07", time: "11:00" },
  { id: "M08", time: "11:30" },
  { id: "M09", time: "12:00" },
];
const noon = [
  { id: "Nn01", time: "13:00" },
  { id: "Nn02", time: "13:30" },
  { id: "Nn03", time: "14:00" },
  { id: "Nn04", time: "14:30" },
  { id: "Nn05", time: "15:00" },
  { id: "Nn06", time: "15:30" },
  { id: "Nn07", time: "16:00" },
  { id: "Nn08", time: "16:30" },
  { id: "Nn09", time: "17:00" },
];
const night = [
  { id: "N01", time: "18:00" },
  { id: "N02", time: "18:30" },
  { id: "N03", time: "19:00" },
  { id: "N04", time: "19:30" },
  { id: "N05", time: "20:00" },
  { id: "N06", time: "20:30" },
  { id: "N07", time: "21:00" },
  { id: "N08", time: "21:30" },
  { id: "N09", time: "22:00" },
];

const TrainingCalenderSession = () => {
  const data = useSelector((state) => state.trainingCalendar.traningPrograms);
  const chose = useSelector((state) => state.trainingCalendar.chose);
  const isLoading = useSelector((state) => state.trainingCalendar.isLoading);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[500px]">
          <Loading />
        </div>
      ) : (
        <>
          <SessionTime chose={chose} time={morning} data={data} session="morning" timeRange={[8, 12]} />
          <SessionTime chose={chose} time={noon} data={data} session="noon" timeRange={[13, 17]} />
          <SessionTime chose={chose} time={night} data={data} session="night" timeRange={[18, 22]} />
        </>
      )}
    </>
  );
};

export default TrainingCalenderSession;
