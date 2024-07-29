import AuthorizedStore from "../context/authorizedStore";
import NotAuthorized from "../pages/NotAuthorized";
import useIsAuthorized from "../hooks/authorized";

type Props = {
  children: React.ReactNode;
};

const Protected = ({ children }: Props) => {
  const {isLoading} = useIsAuthorized();
  const isAuthorized = AuthorizedStore((state) => state.isAuthorized);

  if (isLoading) return <></>;

  return isAuthorized ? children : <NotAuthorized />;
};

export default Protected;
