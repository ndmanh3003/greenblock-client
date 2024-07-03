import { Outlet } from "react-router-dom";
import cn from "../utils/cn";

type ILayoutProps = {
  isHidden?: boolean;
};

export default function Layout({ isHidden }: ILayoutProps) {
  return <div className="m-5">
    <h1>
      Page Layout
    </h1>
    <span className={cn("text-xs", isHidden ? "hidden" : "")}>Show</span>
    <Outlet />
  </div>
}