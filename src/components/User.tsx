import React, { useContext, useState } from "react";
import { UserContext } from "../context/user-context";
import { Button } from "reactstrap";

const User: React.FunctionComponent = (): JSX.Element => {
  const context = useContext(UserContext);
  const [count, setCount] = useState(0);

  return <div>
    {context.user.isloggedin? <p>Logged in</p> : <p>Not logged in</p>}
    <p>Count = {count}</p>
    <Button onClick={() => setCount(count+1)}>+</Button>
  </div>
}

export default User;