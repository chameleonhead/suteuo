import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

export type LinkProps = {
  to: string;
  children: React.ReactNode;
};

export const Link = (props: LinkProps) => {
  const { to, children } = props;
  return (
    <RouterLink
      to={to}
      children={children}
      className="text-blue-600 hover:text-blue-400 visited:text-purple-600"
    />
  );
};

export default Link;
