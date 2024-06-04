import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import delete4everSvg from "./resources/delete_forever.svg";
import duplicateSvg from "./resources/duplicate.svg";
import moreHorizontalSvg from "./resources/more_horizontal.svg";
import pencilSvg from "./resources/pencil.svg";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

const TableBody = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const nav = useNavigate();
  const { permission, token } = useSelector((state) => state.auth);

  function handleMenuClick(event, data) {
    event.preventDefault();
    setShowMenu(true);
    setMenuPosition({ x: event.clientX, y: event.clientY });
  }

  function handleEditClass(data) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2',
      },
      buttonsStyling: false,
    });

    
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to edit ${data.className}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, edit it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          nav(`/class/view_class/${data?.id}`);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', `${data.className} edit process was cancelled`, 'error');
        }
      });
  }

  function handleDupplicateClass(data) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2',
      },
      buttonsStyling: false,
    });

    
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to dupplicate ${data.className}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, dupplicate it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios({
              url: `https://f-m-c-v3.azurewebsites.net/api/class/duplicate/${data.id}`,
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            props.updateQueryParams('page', '0');
            swalWithBootstrapButtons.fire('Duplicated', `${data.className} has been duplicated.`, 'success');
          } catch (error) {
            swalWithBootstrapButtons.fire('Error', `Failed to duplicate ${data.className}: ${error.message}`, 'error');
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', `${data.className} has not been duplicated.`, 'error');
        }
      });
  }
  
  function handleNotRole() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You do not have permission to perform this action!',
    })
  }
  

  function handleDeleteClass(data) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2',
      },
      buttonsStyling: false,
    });
    
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to delete ${data.className}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios({
              url: `https://f-m-c-v3.azurewebsites.net/api/class/delete/${data.id}`,
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
              props.updateQueryParams('page', '0');
              swalWithBootstrapButtons.fire('Deleted', `${data.className} has been deleted.`, 'success');
          } catch (error) {
            swalWithBootstrapButtons.fire('Error', `Failed to delete ${data.className}.`, 'error');
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', `${data.className} has not been deleted.`, 'error');
        }
      });
  }
  

  function getAttendeeColor(attendee) {
    switch (attendee) {
      case "Fresher":
        return "bg-[#285D9A]";
      case "Intern":
        return " bg-[#2D3748]";
      case "Online free-fresher":
        return " bg-[#2F903F] ";
      case "Offline free-fresher":
        return " bg-[#D45B13] ";
      default:
        return "";
    }
  }

  return (
    <tbody>
  {props.dataList?.slice(0, props.rowsPerPage).map((data, index) => (


    <tr key={index} className="hover:bg-slate-100 transition-all">
            
        <td className="font-bold">
          <Link to={`/class/view_class/${data?.id}`} className="px-4 py-4 block cursor-pointer">
            {data.className} 
          </Link>
        </td>
        <td className="px-4 py-4">{data.classCode}</td>
        <td className="px-4 py-4">{new Date(data.dateCreated).toLocaleDateString()}</td>
        <td className="px-4 py-4">{data.creatorName}</td>
        <td className="px-4 py-4">{data.day} days</td>
        <td className={`px-4 py-4 overflow-visible`}>
          <div className={`rounded-full flex items-center justify-center  px-4 h-8 w-fit  text-white overflow-visible ${getAttendeeColor(data.attendeeName)}`}>
            {data.attendeeName}
          </div>
        </td>
        <td className="px-4 py-4">{data.locationName}</td>
        <td className="px-4 py-4">{data.fsuName}</td>
        <td className="px-4 py-4 flex justify-center">
        {permission.syllabusPermission !== "View" && (
          <div className="dropdown dropdown-left">
            <label tabIndex={0} className="m-1">
              <img src={moreHorizontalSvg} alt="SVG" className="h-8 w-8 cursor-pointer" onClick={(event) => handleMenuClick(event, data)} />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="flex items-center" onClick={() => handleEditClass(data)}>
                  <img src={pencilSvg} alt="" />
                  <p>Edit class</p>
                </a>
              </li>
              <li>
                <a className="flex items-center" onClick={() => handleDupplicateClass(data)}>
                  <img src={duplicateSvg} alt="" />
                  <p>Duplicate class</p>
                </a>
              </li>
              <li>
                <a className="flex items-center" onClick={() => handleDeleteClass(data)}>
                  <img src={delete4everSvg} alt="" />
                  <p>Delete class</p>
                </a>
              </li>
            </ul>
          </div>
        )}
        </td>
    </tr>
  ))}
</tbody>
  );
};

export default TableBody;
