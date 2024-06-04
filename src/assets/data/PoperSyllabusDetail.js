import {
  CopyIcon,
  DeleteIcon,
  EditIcon,
  VisibilityOffIcon,
} from "~/components/Icons";

export const PoperMenuData = [
  {
    title: "Edit syllabus",
    icon: <EditIcon />,
  },
  {
    title: "Duplicate syllabus",
    icon: <CopyIcon />,
  },
  {
    title: "De-activate syllabus",
    icon: <VisibilityOffIcon />,
  },
  {
    title: "Delete syllabus",
    icon: <DeleteIcon />,
    color: "gray",
  },
];
