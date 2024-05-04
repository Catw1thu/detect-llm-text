import LeftSidebar from "./LeftSidebar";
import PageContent from "./PageContent";

export default function Layout() {
  return (
    <>
      <div className="drawer">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <PageContent />
        <LeftSidebar />
      </div>
    </>
  );
}
