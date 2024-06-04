
import React from "react";

const Table = ({data}) => {
    return (
      <div className="h-[200px] bg-white flex justify-center items-center p-3">
      <table className="table-fixed border-none">
        <tbody>
          {data.labels.map((label, index) => (
            <tr key={index}>
              <td className="">
                <div className="flex items-center">
                  <div className=" mr-2 rounded-xl" style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}></div>
                  {label}
                </div>
              </td>
              <td className=" px-4 py-2">({((data.datasets[0].data[index] / data.datasets[0].data.reduce((a, b) => a + b)) * 100).toFixed(2)}%)</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    );
  };
  export default Table;