import React from "react";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/user-context";
import getCookie from "../util/getCookie";
import { useNavigate } from "react-router-dom";

const LoginChecker: React.FunctionComponent = (): JSX.Element => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("token") && !context.user.isLoggedIn) {
      try {
        const resource: string = "http://localhost:8000/user/";
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        const req: RequestInit = {
          headers: headers,
          method: "GET",
          credentials: "include",
          mode: "cors",
        };

        fetch(resource, req).then((response: Response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          return response.json();
        })
        .then((data: any) => {
  
          // Update the context with the user information
          context.updateState({
            user: {
              isLoggedIn: true,
              firstName: data.firstname, // Adjust according to the actual response structure
              lastName: data.lastname,   // Adjust according to the actual response structure
              email: data.email,
              verified: data.verified
            },
          });
  
          navigate('/home');
        })
      } catch {
        console.log("No existing login credentials");
      }
    }
  }, [context, navigate]);

  return <></>
}

export default LoginChecker;