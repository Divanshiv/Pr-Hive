import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Dummy buyer user
const DUMMY_BUYERS = [
  {
    id: 1,
    email: "buyer@test.com",
    password: "buyer123",
    name: "Test Buyer",
    role: "buyer"
  }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const user = DUMMY_BUYERS.find(
      (u) => u.email === email && u.password === password
    );
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, error: "Invalid email or password" };
  };

  const signup = (email, password, name) => {
    // Check if user already exists
    if (DUMMY_BUYERS.find((u) => u.email === email)) {
      return { success: false, error: "User already exists" };
    }

    // Create new user (in a real app, this would go to a backend)
    const newUser = {
      id: DUMMY_BUYERS.length + 1,
      email,
      name,
      role: "buyer"
    };
    
    // For demo purposes, we don't actually save new signups to DUMMY_BUYERS
    // as it's a const. In real implementation, this would create a backend record.
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      signup, 
      logout,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);