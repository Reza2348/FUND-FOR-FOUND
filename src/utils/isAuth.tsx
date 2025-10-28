const saveToken = (token: string): void => {
  if (typeof window !== "undefined" && token) {
    localStorage.setItem("token", token);
  }
};

const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("token");
  }
  return false;
};

export { saveToken, removeToken };
