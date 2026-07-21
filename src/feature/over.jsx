import { useDispatch, useSelector } from "react-redux";
import { toggelOver, toggelSidebar } from "../feature/slice/toggelSidebar";

export default function over() {
  const toggel_over = useSelector((state) => state.Sidebar.over);
  const dispatch = useDispatch();
  return (
    toggel_over && (
      <div
        className="fixed md:hidden w-[100vw] h-[100vh] bg-black/50 z-20"
        onClick={() => {
          dispatch(toggelOver());
          dispatch(toggelSidebar());
        }}
      ></div>
    )
  );
}
