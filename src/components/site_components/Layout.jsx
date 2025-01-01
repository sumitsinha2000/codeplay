import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import "../../../src/output.css";
const Layout = () => {
  const location = useLocation();
  // List of paths where the Header should not be displayed
  const noHeaderPaths = ["/CountryDB"];

  // Check if the current path matches one of the no-header paths
  const hideHeader = noHeaderPaths.includes(location.pathname);
  return (
    <>
      <div className="relative flex min-h-screen flex-col bg-white">
        <div data-wrapper="" className="">
          <div className="mx-auto w-full min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
            {!hideHeader && <Header headerText="Sumit Sinha" />}
            <main>
              <div className="container mx-auto h-fit min-h-[560px] max-h-[600px] overflow-y-auto overflow-x-hidden">
                <Outlet />{" "}
              </div>
            </main>
            <Footer
              author="Codeplay"
              dateText="2025 Created by Sumit Sinha"
              linkIn="https://www.linkedin.com/in/sumit-s-99668a1b/"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
