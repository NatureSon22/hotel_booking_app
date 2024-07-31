import AuthorizedStore from "../context/authorizedStore";
import NotAuthorized from "../pages/NotAuthorized";
import useIsAuthorized from "../hooks/authorized";
import Spinner from "../components/Spinner";

type Props = {
  children: React.ReactNode;
};

const Protected = ({ children }: Props) => {
  const { isLoading } = useIsAuthorized();
  const isAuthorized = AuthorizedStore((state) => state.isAuthorized);

  if (isLoading)
    return (
      <div className="grid flex-1 place-items-center">
        <Spinner />
      </div>
    );

  return isAuthorized ? (
    <div className="flex-1">{children}</div>
  ) : (
    <NotAuthorized />
  );
};

export default Protected;
