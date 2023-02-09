import { useAuthentication } from "../utils/hooks/UseAuthentication";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";

export default function RootNavigation() {
  const { user } = useAuthentication();
  return user ? <UserStack /> : <AuthStack />;
}
