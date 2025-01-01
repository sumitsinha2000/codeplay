import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
//import { Button, Popover } from "flowbite-react";
import { Button, Drawer } from "flowbite-react";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://graphql.country/graphql",
});

// GraphQL queries
const LIST_CONTINENTS = gql`
  {
    countries {
      edges {
        node {
          region
        }
      }
    }
  }
`;

const LIST_COUNTRIES = gql`
  {
    countries {
      edges {
        node {
          name
          topLevelDomain
          alpha2Code
          alpha3Code
          callingCodes
          capital
          altSpellings
          region
          subregion
          population
          latLng
          demonym
          area
          gini
          timezones
          borders
          nativeName
          numericCode
          currencies {
            edges {
              node {
                name
                code
                symbol
              }
            }
          }
          languages {
            edges {
              node {
                name
              }
            }
          }
          flag
          regionalBlocs {
            edges {
              node {
                name
                acronym
              }
            }
          }
          cioc
        }
      }
    }
  }
`;

function CountryDB() {
  const [selectedContinent, setSelectedContinent] =
    useState("Filter by Region");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [drawerCountry, setDrawerCountry] = useState(null);
  //const [countriesLimit, setCountriesLimit] = useState(10);
  // Fetch continents
  const { data: continentsData, loading: loadingContinents } = useQuery(
    LIST_CONTINENTS,
    { client }
  );

  // Fetch countries
  const { data: countriesData, loading: loadingCountries } = useQuery(
    LIST_COUNTRIES,
    { client }
  );

  // Parse continents and countries data
  // Parse continents and countries data with default values
  const regions =
    continentsData?.countries?.edges
      ?.map((edge) => edge.node.region)
      .filter(
        (region, index, self) => region && self.indexOf(region) === index
      ) || [];

  const countries =
    countriesData?.countries?.edges?.map((edge) => edge.node) || [];

  const filteredCountries = countries.filter((country) => {
    const matchesContinent =
      selectedContinent === "Filter by Region" ||
      country.region === selectedContinent;
    const matchesSearch = country.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesContinent && matchesSearch;
  });
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  const openDrawer = (country) => {
    setDrawerCountry(country);
  };

  const closeDrawer = () => {
    setDrawerCountry(null);
  };
  // Function to format the population
  const formatPopulation = (population) => {
    if (!population) return "N/A";

    if (population >= 1_000_000_000) {
      return (population / 1_000_000_000).toFixed(1) + " Billion";
    } else if (population >= 1_000_000) {
      return (population / 1_000_000).toFixed(1) + " Million";
    } else if (population >= 1_000) {
      return (population / 1_000).toFixed(1) + " Thousand";
    } else {
      return population.toString(); // If less than 1000, just show the number
    }
  };
  return (
    <>
      <div className="bg-black text-primary shadow-lg px-2 py-2">
        <div className="container flex justify-between">
          <h1 className="mt-2 ml-4">
            <a href="." className="imdb-logo mr-4">
              CountryDb
            </a>
            <a href="/" className="text-blue-600 ">
              Back to Codeplay Home
            </a>
          </h1>
          <div className="flex rounded-md bg-white shadow-lg lg:w-[40.125rem] h-10 my-2">
            {/* Custom Select */}
            <div
              className="w-[16.75rem] cursor-pointer select-none rounded-lg bg-white h-full relative"
              onClick={toggleDropdown}
            >
              <div className="flex items-center justify-start gap-2 rounded-lg py-2 pl-3 pr-3 h-full">
                <span>{selectedContinent}</span>
                <input
                  type="text"
                  name="region"
                  disabled={true}
                  className="pointer-events-none hidden select-none"
                />
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  className="rotate-0"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={48}
                    d="M112 184l144 144 144-144"
                  />
                </svg>
              </div>
              {isDropdownVisible && (
                <div
                  className="absolute z-10 mt-1 w-[13.75rem] rounded-lg bg-stone-700 py-[0.625rem] text-white shadow-lg"
                  onBlur={hideDropdown}
                  tabIndex={0} // To enable blur on focus out
                >
                  <div
                    className="py-[0.313rem] pl-6 pr-5 hover:bg-stone-500 cursor-pointer"
                    onClick={() => {
                      setSelectedContinent("Filter by Region");
                      hideDropdown();
                    }}
                  >
                    All Regions
                  </div>
                  {regions.map((region, index) => (
                    <div
                      className="py-[0.313rem] pl-6 pr-5 hover:bg-stone-500 cursor-pointer"
                      key={index}
                      onClick={() => {
                        setSelectedContinent(region);
                        hideDropdown();
                      }}
                    >
                      {region}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search countryDB"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-white py-2 font-semibold focus:outline-none focus:shadow-none focus:ring-0 border-0 focus:ring-white "
            />
            <div className="flex items-center px-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 512 512"
                className="stroke h-5 w-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        {/*<h3 className="mt-4 text-center">
          This Example shows implementation of GraphQL. You can search a country
          name using various filter options and fetch all the related info.
        </h3>*/}
        {loadingContinents || loadingCountries ? (
          <div className="mx-auto flex flex-wrap justify-center gap-6 py-4">
            {/* Skeleton cards */}
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="w-[15.625rem] rounded-lg bg-gray-200 shadow-lg p-4 text-center animate-pulse"
              >
                <div className="h-32 w-full bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-2 mx-auto"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white text-primary">
            <div className="container">
              <div className="mx-auto flex flex-wrap justify-center gap-6 py-4 max-h-[500px] overflow-y-auto overflow-x-hidden">
                {filteredCountries.map((country) => (
                  <div
                    key={country.alpha2Code}
                    className="w-[15.625rem] flex flex-col gap-5 select-none rounded-lg bg-secondary shadow-lg p-4 text-center min-h-[150px] self-center items-center "
                  >
                    <span
                      role="img"
                      aria-label={country.name}
                      className="text-4xl rounded-2xl w-full h-12 min-h-10"
                    >
                      <img
                        src={country.flag}
                        alt={`${country.name} Flag`}
                        className="rounded-2xl object-cover h-[100px] w-full"
                      />
                    </span>
                    <h1 className="text-lg font-bold mt-10">{country.name}</h1>
                    <p className="text-sm text-gray-600">{country.region}</p>

                    <Button onClick={() => openDrawer(country)}>
                      View More
                    </Button>
                  </div>
                ))}
                {drawerCountry && (
                  <Drawer
                    open={Boolean(drawerCountry)}
                    onClose={closeDrawer}
                    position="right"
                    className="w-[30rem]"
                  >
                    <Drawer.Header title={drawerCountry.name} />
                    <Drawer.Items>
                      <div className="w-full bg-white rounded shadow-2xl">
                        <div className="relative bg-gray-200 rounded-t py-4 px-4 xl:px-8">
                          <img
                            src={drawerCountry.flag}
                            alt={`${drawerCountry.name} Flag`}
                          />
                        </div>
                        <div className="relative bg-gray-200 rounded-t py-4 px-4 xl:px-8">
                          <strong> Capital :</strong> {drawerCountry.capital}
                        </div>
                        <div className="w-full h-full px-4 xl:px-8 pt-3 pb-5">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <strong>population:</strong>{" "}
                              {formatPopulation(drawerCountry.population)}
                            </div>
                          </div>
                          <div className="relative font-normal text-xs sm:text-sm flex items-center text-black">
                            <strong>Currencies:</strong>
                            {drawerCountry.currencies.edges.map(
                              ({ node }, idx) => (
                                <div key={idx} className="ml-2">
                                  {node.name} ({node.code}) - {node.symbol}
                                </div>
                              )
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <strong>Area:</strong> {drawerCountry.area} km²
                            </div>
                          </div>
                          <div className="py-6 flex justify-between items-center">
                            <div className="flex items-center">
                              Subregion: {drawerCountry.subregion}
                            </div>
                          </div>
                          <div className="relative font-normal text-xs sm:text-sm flex items-center ">
                            Timezones: {drawerCountry.timezones?.join(", ")}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              Borders: {drawerCountry.borders?.join(", ")}
                            </div>
                            <div className="relative font-normal text-xs sm:text-sm flex items-center text-gray-600"></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              Native Name: {drawerCountry.nativeName}
                            </div>
                            <div className="relative font-normal text-xs sm:text-sm flex items-center text-gray-600"></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              {" "}
                              Regional Blocs:
                              <ul>
                                {drawerCountry.regionalBlocs?.edges?.map(
                                  (bloc, index) => (
                                    <li key={index}>
                                      Name: {bloc.node.name}, Acronym:{" "}
                                      {bloc.node.acronym}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div className="relative font-normal text-xs sm:text-sm flex items-center text-gray-600"></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              Latitude & Longitude:{" "}
                              {drawerCountry.latLng?.join(", ")}
                            </div>
                            <div className="relative font-normal text-xs sm:text-sm flex items-center text-gray-600"></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              Timezones: {drawerCountry.timezones?.join(", ")}
                            </div>
                            <div className="relative font-normal text-xs sm:text-sm flex items-center text-gray-600"></div>
                          </div>

                          <hr className="my-5 border-t border-gray-200" />

                          <div className="flex items-stretch mt-2">
                            <div className="relative w-full"></div>
                          </div>
                        </div>
                      </div>
                    </Drawer.Items>
                  </Drawer>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <CountryDB />
    </ApolloProvider>
  );
}
