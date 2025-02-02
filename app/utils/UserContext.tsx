import { createContext, useState, useContext, ReactNode } from "react";

// Define the user type
export type UserData = {
  hasPhoto: boolean;
  imageUrl: string;
};

// Define the context type
type UserContextType = {
  user: UserData;
  setUser: (user: UserData) => void;
};

// Create context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>({hasPhoto: false, imageUrl: ""});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
