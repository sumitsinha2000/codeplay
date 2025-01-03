//import Layout from "../components/site_components/Layout";
//import Hero from "daisyui"
import reactLogo from "@/assets/react.svg";
function Home() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="flex justify-center text-5xl font-bold mt-6">
            {" "}
            Welcome to Codeplay
          </h1>
          <h1 className="text-3xl mt-5 mb-5 mx-4">
            {" "}
            Curated Examples created for Web and Frontend developers{" "}
          </h1>
          <h2 className="text-2xl text-left font-bold mb-3 mt-5">Lab</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto px-4 text-left justify-start">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Country Database</h2>
                <img
                  src="https://www.vectorlogo.zone/logos/graphql/graphql-ar21.svg"
                  alt=""
                />
                <img src={reactLogo} alt="" />
              </div>
              <p className="text-gray-700 mb-4">
                {" "}
                Public GraphQL API implementation with react and Tailwind CSS
                and Tailwind Flowbite
              </p>
              <p className="flex justify-between flex-nowrap">
                <a
                  href="/CountryDB"
                  target="_blank"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Demo
                </a>
                <a
                  href="/CountryDB"
                  target="_blank"
                  className="text-blue-500 hover:text-blue-700 text-right self-end"
                >
                  Visit Article
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Home;
