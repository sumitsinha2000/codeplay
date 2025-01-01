//import React from "react";
import PropTypes from "prop-types";
import { Progress } from "../ui/progress";
import { Wave, Random } from "react-animated-text";
import reactLogo from "@/assets/react.svg";
function Siteloader(props) {
  return (
    <>
      <div className="relative flex h-screen flex-col bg-white text-black">
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden sm:mx-auto sm:max-w-lg">
          <img src={reactLogo} className="h-8 " alt="react Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white  mb-4">
            React Play
          </span>
          <Progress
            value={props.progress}
            className="flex h-1 justify-center w-full "
          />
          <div className="progressTextStyle flex justify-center">
            <Wave
              text="Loading ..."
              effect="pop"
              effectChange="1.2"
              effectDirection="right"
            />
            <Random
              text={`${props.progress}%`}
              effect="verticalFadeOut"
              effectDirection="down"
              speed="3"
            />
          </div>
        </div>
      </div>
    </>
  );
}

Siteloader.propTypes = {
  progress: PropTypes.number,
};

export default Siteloader;
