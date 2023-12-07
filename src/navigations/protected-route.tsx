import { useHistory } from "react-router";

type PropTypes = {
  children: React.ReactNode;
  isAuthenticated: boolean;
};

const ProtectedRoute: React.FC<PropTypes> = ({ children, isAuthenticated }) => {
  const history = useHistory();

  if (!isAuthenticated) {
    history.replace("/landing");
  } else return <>{children}</>;
};

export default ProtectedRoute;
