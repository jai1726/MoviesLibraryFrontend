import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';

function Note(props) {
  console.log("props",props)
  const handleDeleteClick = () => {
    props.onDelete(props.id);
  };

  const handleEditClick = () => {
    props.onEdit(props.index,props.id);
  };

  return (
    <div className="card m-2" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={props.imageUrl} className="img-fluid rounded-start star-image" alt="Movie Poster" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h4 className="card-title" style={{ color: "green" }}>{props.name}</h4>
            <p className="card-text mt-3">
              <strong>{props.name}</strong> is a <strong>{props.genere}</strong> movie created by <strong>{props.creator}</strong>. It stars <strong>{props.stars}</strong>.
            </p>
            <p className="card-text">
              <small className="text-muted">
                Last updated {props.date}
              </small>
            </p>
            {props.self?
            <p className="card-text">
              {props.private ? <LockIcon titleAccess="Private" /> : <PublicIcon titleAccess="Public" />} {props.private ? "Private" : "Public"}
            </p>
            :""}
          </div>
        </div>
      </div>
      {props.self?
      <div>
        <button className="btn m-1 bg-success" onClick={handleDeleteClick} style={{ width: "10%" }}><DeleteIcon /></button>
        <button className="btn m-1 bg-success" onClick={handleEditClick} style={{ width: "10%" }}><EditIcon /></button>
      </div>
      :""}
    </div>
  );
}

export default Note;
