import { Link } from "react-router-dom";

export default function CrudAdminLink() {
  return (
    <div className="admin-container">
      <Link to="/administracion/crud">Crud</Link>
    </div>
  );
}
