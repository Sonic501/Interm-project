import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function FilterComponet({ handleSort }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClickFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

  };
  
  return (
    <div className="styleFilter" style={{ display: "inline-block" }}>
      <IconButton

        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClickFilter}

      >
        <SortIcon sx={{ color: "white" }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 50 * 7,
            width: "16ch",
          },
        }}
      >
        <MenuItem onClick={handleClose} divider>
          <Stack spacing={0.5}>

            <Typography
              variant="p"
              sx={{
                color: "#141e26",
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "13px",
              }}
              onClick={() => handleSort('Numerical-ace')}
            >
              Sort By ASC

            </Typography>



          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack spacing={0.5}>

            <Typography
              variant="p"
              sx={{
                color: "#141e26",
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "13px",
              }}
              onClick={() => handleSort('Numerical-des')}
            >
              Sort By DESC
            </Typography>



          </Stack>
        </MenuItem>
      </Menu>
    </div>
  );
}