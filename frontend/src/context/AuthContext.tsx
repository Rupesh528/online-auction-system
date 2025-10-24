import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
	user: any;
	setUser: (user: any) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setUser({ token });
		}
	}, []);

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
