export const registerUser = async (userData) => {
    console.log("Register Data:", userData);
  
    return {
      success: true,
      user: {
        name: userData.name,
        email: userData.email,
        token: "mock-token-123",
      },
    };
  };
  
  export const loginUser = async (userData) => {
    console.log("Login Data:", userData);
  
    if (userData.email === "nandan@test.com" && userData.password === "123456") {
      return {
        success: true,
        user: {
          name: "Nandan",
          email: userData.email,
          token: "mock-token-123",
        },
      };
    } else {
      throw new Error("Invalid credentials");
    }
  };
  