import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import styled from "styled-components";
export const NewTabContext = styled(TabContext)`
  width: 600px;
  max-height: 30px !important;
`;
export const NewTabList = styled(TabList)`
  width: 600px;
  max-height: 30px !important;
  min-height: 30px !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const NewTab = styled(Tab)`
  width: 200px;
  max-height: 30px;
  padding: 0 !important;
  cursor: unset !important;
`;
