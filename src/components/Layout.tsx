import * as React from "react";
import NavMenu from "./NavMenu";

export type LayoutProps = React.PropsWithChildren<{}>;

export const Layout = (props: LayoutProps) => {
  return (
    <div className="App">
      <NavMenu />
      {props.children}
    </div>
  );
};

export default Layout;
