import { ArrowDownIcon } from '../../../components/Icons'
import React from 'react'
// import downSvg from '../resources/arrow_down.svg';

const RowsPerPage = (props) => {

    return (
        <div className="dropdown dropdown-top dropdown-end mr-10">
            <span className="flex items-center gap-4">
                Rows per page
                <label
                    tabIndex={0}
                    className="text-[#285D9A] m-1 flex items-center font-bold cursor-pointer hover:bg-blue-200 rounded-full px-2 py-1 transition-all"
                >
                    {props.rowsPerPage}
                    <ArrowDownIcon />


                </label>
            </span>

            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-20"
            >

                {props.currentTotalElements < 20 ? (
                    <>
                        <li>
                            <a onClick={() => props.setRowsPerPage(props.currentTotalElements)}>
                                {props.currentTotalElements}
                            </a>
                        </li>
                        <li>
                            <a onClick={() => props.setRowsPerPage(props.currentTotalElements / 2)}>
                                {props.currentTotalElements / 2}
                            </a>
                        </li>
                        <li>
                            <a onClick={() => props.setRowsPerPage(props.currentTotalElements - 1)}>
                                {props.currentTotalElements - 1}
                            </a>
                        </li>
                        <li>
                            <a onClick={() => props.setRowsPerPage(props.currentTotalElements + 1)}>
                                {props.currentTotalElements + 1}
                            </a>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <a onClick={() => props.setRowsPerPage(5)}>5</a>
                        </li>
                        <li>
                            <a onClick={() => props.setRowsPerPage(10)}>10</a>
                        </li>
                        <li>
                            <a onClick={() => props.setRowsPerPage(15)}>15</a>
                        </li>
                        <li>
                            <a onClick={() => props.setRowsPerPage(20)}>20</a>
                        </li></>
                )}

            </ul>
        </div>
    )
}

export default RowsPerPage