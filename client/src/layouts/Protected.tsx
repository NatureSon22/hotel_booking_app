import AuthorizedStore from "../context/authorizedStore";
import NotAuthorized from "../pages/NotAuthorized";
import useIsAuthorized from "../hooks/authorized";

type Props = {
  children: React.ReactNode;
};

const Protected = ({ children }: Props) => {
  useIsAuthorized();
  const isAuthorized = AuthorizedStore((state) => state.isAuthorized);

  return isAuthorized ? children : <NotAuthorized />;
};

export default Protected;
