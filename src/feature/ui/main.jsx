import { Outlet } from "react-router-dom";

export default function main() {
  return (
    <div className=" max-w-full h-[100vh]">
      <Outlet />
    </div>
  );
}
