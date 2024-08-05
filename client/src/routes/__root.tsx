import {
  createRootRoute,
  Outlet,
  Link as LinkTo,
} from "@tanstack/react-router";
import { FaMoneyBillAlt } from "react-icons/fa";
import Link from "../components/home/link";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const path = location.pathname;
  return (
    <>
      <nav className="flex items-center justify-center mt-8">
        <LinkTo to={"/"} className="flex items-center gap-4 absolute left-8">
          <h1 className="text-2xl text-rose-500 font-bold">Finance Tracker</h1>
          <span className="text-green-500 text-3xl">
            <FaMoneyBillAlt />
          </span>
        </LinkTo>

        <div className="flex gap-4 items-center">
          <Link
            to="/cards"
            text="Cards"
            active={path === "/cards" ? true : false}
          />
          <Link
            to=""
            text="Transactions"
            active={path === "/transactions" ? true : false}
          />
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Root;
