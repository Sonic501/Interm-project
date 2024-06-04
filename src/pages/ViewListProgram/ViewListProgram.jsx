import FilterListIcon from "@mui/icons-material/FilterList";
import { Stack, Table, Typography, Snackbar, TableBody, TableFooter, TablePagination, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { default as TableHead } from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import CustomizedDialogs from "../../pages/ViewListProgram/Common/importForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterComponet from "./FilterTrainingProgram";
import PositionedMenu from "./MenuTrainning";
import { getAllTranningProgramWithName } from "./ViewListProgramService";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";

export const rows = [];

export default function ListTrainingPrograms() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate("/program/view_program/" + id);
  };
  const handlePage = () => {
    navigate("/program/create_program_name");
  };

  const boxSX = {
    "&:hover": {
      cursor: "pointer",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "15px",
    },
  };

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [name, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);

  const fetchDataSearch = async () => {
    const data = await getAllTranningProgramWithName(name, page - 1, rowsPerPage, token);
    if (data) {
      setData(data.content);
      setTotalPages(data.totalPages);
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    fetchDataSearch();
  }, [name, page, rowsPerPage, token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  function handleSearch(event) {
    if (event.key === "Enter" && event.target.value !== "") {
      setKeyword(event.target.value);
      setKeywords([...keywords, event.target.value]);
      setPage(1);
    }
  }

  const [sortMethod, setSortMethod] = useState("");
  const handleSort = (method) => {
    setSortMethod(method);
    switch (method) {
      case "Alphabetical":
        const sortedItems = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setData(sortedItems);
        break;
      case "Numerical-des":
        const sortedItems2 = [...data].sort((a, b) => b.id - a.id);
        setData(sortedItems2);
        break;
      case "Numerical-ace":
        const sortedItems3 = [...data].sort((a, b) => a.id - b.id);
        setData(sortedItems3);
        break;

      default:
        break;
    }
  };
  const handleRemoveKeywords = (keyword, event) => {
    const newKeywords = keywords.filter((item) => item !== keyword);
    setKeywords(newKeywords);
    setKeyword("");
    setPage(1);
  };

  const hoverAdd = {
    "&:hover": {
      textDecoration: "none",
      backgroundColor: "#023E73",
    },
    backgroundColor: "#2D3748",
    color: "#FFFFFF",
    borderRadius: "10px",
    fontWeight: "bold",
  };

  return (
    <div style={{ paddingTop: "20px", flexGrow: "1" }}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={12}>
          <Box>
            <Box sx={{ borderTop: 1, borderColor: "#F5F5F5" }}>
              <div
                className={`py-5 pl-[30px] gap-2.5 inline-flex flex-col justify-center items-start text-white text-left font-medium  pr-[30px] w-full -mt-5 bg-[rgba(45,55,72,1)] font-['Inter']`}
              >
                <div className={`gap-2.5 flex items-start`}>
                  <p className={`text-2xl m-0 tracking-[3.2px] leading-[normal]`}>Training Program</p>
                </div>
              </div>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ display: "flex", flexDirection: "row" }}>
                {/* <SearchPrograms APIData={APIData} setAPIData={setAPIData} /> */}
                <Box sx={{ mt: "17px", pl: 2 }}>
                  <Stack direction="row">
                    <Paper
                      elevation={0}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "30px 0px 30px 20px",
                        border: "1px solid #000000",
                        borderRadius: "10px",
                        width: "300px",
                        height: "35px",
                        boxSizing: "border-box",
                      }}
                    >
                      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                        <SearchOutlined />
                      </IconButton>
                      <InputBase
                        type="text"
                        variant="outlined"
                        onKeyDown={handleSearch}
                        sx={{ ml: 1, flex: 2 }}
                        placeholder="Search By..."
                      />
                    </Paper>
                  </Stack>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "48px 0px 30px 10px",
                    fontSize: "13px",
                    borderRadius: "10px",
                    width: "85px",
                    height: "35px",
                    backgroundColor: "#2D3748",
                    fontWeight: "bold",
                  }}
                >
                  <FilterListIcon sx={{ mr: "5px" }} /> Filter
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "48px",
                    mr: "50px",
                  }}
                >
                  <CustomizedDialogs />

                  <Button sx={hoverAdd} onClick={handlePage}>
                    <AddCircleOutlineIcon sx={{ mr: "5px" }} />
                    Add New
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <ArrayOfKeywords keywords={keywords} handleRemoveKeywords={handleRemoveKeywords} />
          <TableContainer sx={{ filter: "drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.16))" }} component={Paper}>
            <Table aria-label="simple table">
              <TableHead
                sx={{
                  background: "#2D3748",
                  borderRadius: "50px 50px 0px 0px",
                }}
              >
                <TableRow>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }} align="left">
                    ID
                    {/* <FilterComponet sortBy={"NAME"} /> */}
                    <FilterComponet handleSort={handleSort} />
                  </TableCell>
                  <TableCell
                    sx={{ color: "#ffffff", fontWeight: "bold" }}
                    // align="left"
                  >
                    Program Name
                    {/* <FilterComponet sortBy={"NAME"} /> */}
                    <FilterComponet />
                  </TableCell>

                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }} align="left">
                    Create On
                    <FilterComponet style={{ color: "blue" }} />
                    {/* <FilterComponet sortBy={"CREATEDDATE"} /> */}
                  </TableCell>

                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }} align="left">
                    Create By
                    {/* <FilterComponet sortBy={"CREATEDBY"} /> */}
                    <FilterComponet />
                  </TableCell>

                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }} align="left">
                    Duration
                    {/* <FilterComponet sortBy={"DURATION"} /> */}
                    <FilterComponet />
                  </TableCell>

                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }} align="left">
                    Status
                    {/* <FilterComponet sortBy={"STATUS"} /> */}
                    <FilterComponet />
                  </TableCell>

                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }} align="center">
                    {/* <PositionedMenu/> */}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((FPT, index) => (
                  <TableRow key={index} style={{ display: FPT.status ? "table-row" : "none" }}>
                    <TableCell align="left">{FPT.id}</TableCell>
                    <TableCell onClick={() => handleNavigate(FPT.id)} sx={boxSX} align="left">
                      {FPT.name}
                    </TableCell>
                    <TableCell align="left">{FPT.dateCreated}</TableCell>
                    <TableCell align="left">{FPT.creatorName}</TableCell>
                    <TableCell align="left">{FPT.day} days</TableCell>
                    <TableCell align="left">
                      {" "}
                      <button
                        className={
                          FPT.state
                            ? "bg-[#2D3748] rounded-full text-[14px] font-normal text-[#FFFFFF] font-['Roboto'] w-[70px] h-7 "
                            : "bg-[#B9B9B9] rounded-full text-[14px] font-normal text-[#FFFFFF] font-['Roboto'] w-[70px] h-7"
                        }
                      >
                        {FPT.state ? "Active" : "Inactive"}
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <PositionedMenu status={FPT.state} id={FPT.id} fetchDataSearch={fetchDataSearch} name={FPT.name} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            className="Pagination-bar"
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem",
              ".MuiTablePagination-displayedRows, .MuiTablePagination-actions": {
                display: "none",
              },
              ".MuiTablePagination-toolbar": {
                position: "absolute",
                right: 0,
              },
              ".MuiTablePagination-select": {
                fontWeight: "bold !important",
                fontSize: "medium",
                color: "#285D9A",
              },
            }}
          >
            {totalPages > 1 && (
              <Pagination
                sx={{ color: "#285D9A" }}
                color="primary"
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                showLastButton
              />
            )}

            <TablePagination
              component="div"
              count={totalPages}
              page={page - 1}
              rowsPerPageOptions={[1, 5, 10, 25, 50]}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

const ArrayOfKeywords = ({ keywords, handleRemoveKeywords, ...props }) => {
  const className = {
    container: "inline-block mr-1",
    keywordChip:
      "flex justify-around items-center py-1.5 px-15 text-white text-left bg-[#474747] font-inter rounded-xl -mt-10 mb-4",
    keywordsText: "text-sm italic font-normal align-middle mx-2",
  };

  return (
    <div className="ml-9" {...props}>
      {keywords.map((keyword, index) => (
        <div key={index} className={className.container}>
          <div className={className.keywordChip}>
            <p className={className.keywordsText}>{keyword}</p>

            <Close className="w-2 h-2 hover:opacity-80" onClick={(e) => handleRemoveKeywords(keyword)} />
          </div>
        </div>
      ))}
    </div>
  );
};
