import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

function FolderCard(props) {
  let navigate = useNavigate();

  const handleDeleteClick = () => {
    props.onDelete(props.folderName);
  };

  const handleEditClick = () => {
    props.onEdit(props.folderName,props.id);
  };

  const handleClick = () => {
    navigate(`/myFolders/${props.folderName}`);
  };

  return (
    <div className="note" >
      <div onClick={handleClick}>
      <h1>{props.folderName}</h1>
      </div>
      <button onClick={handleDeleteClick}><DeleteIcon /></button>
      <button onClick={handleEditClick}><EditIcon /></button>
    </div>
  );
}

export default FolderCard;
