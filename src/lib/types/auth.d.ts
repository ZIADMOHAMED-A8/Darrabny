export type AuthResponse = {
  message: string;
  user: {
    token?: string;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    isVerfied: boolean;
  };
};

export type ApiError = {
  error: string;
};
