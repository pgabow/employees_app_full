import { useCurrentQuery } from "../../app/serivices/auth";
import { Spinner } from "../../components/Spinner";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if(isLoading) {
    // return <span>Загрузка...</span>
		return <Spinner/>
  }

  return children
}
