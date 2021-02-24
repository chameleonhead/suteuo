import * as React from "react";
import NavMenu from "./NavMenu";

export type LayoutProps = React.PropsWithChildren<{}>;

export const Layout = (props: LayoutProps) => {
  return (
    <div className="App">
      <NavMenu />
      <div className="px-4 md:px-10">{props.children}</div>
    </div>
  );
};

export default Layout;
