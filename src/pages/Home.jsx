import Layout from "../components/site_components/Layout";
//import Hero from "daisyui"
import Examples from "./Examples";
function Home() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="flex justify-center text-5xl font-bold mt-6">
            {" "}
            Welcome to Codeplay
          </h1>
          <Examples />
        </div>
      </section>
    </>
  );
}
export default Home;
