import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
	token: string;
	id: string;
	name: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const userData = localStorage.getItem("userData");
		if (token && userData) {
			const parsedUserData = JSON.parse(userData);
			setUser({
				token,
				id: parsedUserData.id,
				name: parsedUserData.name,
				email: parsedUserData.email,
			});
		}
	}, []);

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userData");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
