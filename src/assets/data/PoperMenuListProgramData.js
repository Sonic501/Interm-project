import {
  CopyIcon,
  DeleteIcon,
  EditIcon,
  VisibilityOffIcon,
  FolderIcon,
} from "~/components/Icons";

export const PoperMenuListProgramData = [
  {
    title: "Training material",
    icon: <FolderIcon />,
  },
  {
    title: "Edit program",
    icon: <EditIcon />,
  },
  {
    title: "Duplicate program",
    icon: <CopyIcon />,
  },
  {
    title: "De-activate program",
    icon: <VisibilityOffIcon />,
  },
  {
    title: "Delete program",
    icon: <DeleteIcon />,
    color: "gray",
  },
];
