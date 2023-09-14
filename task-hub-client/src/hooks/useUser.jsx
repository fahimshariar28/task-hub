import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useUser = () => {
  const auth = useAuth();
  const { data: user } = useQuery({
    queryKey: ["user", auth?.user?.email],
    enabled: !!auth?.user?.email,
    queryFn: async () => {
      const response = await fetch(
        `https://task-hub-server-self.vercel.app/usersByEmail/${auth?.user?.email}`
      );
      const data = await response.json();
      return data;
    },
  });

  return user;
};
export default useUser;
