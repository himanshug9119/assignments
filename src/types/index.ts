export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Car {
  _id: string;
  userId: string;
  title: string;
  description: string;
  images: string[];
  tags: {
    carType: string;
    company: string;
    dealer: string;
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}