import { FC } from "react";
import { useSearchParams } from "react-router-dom";

const CardView: FC = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <div className="flex justify-center items-center bg-black">
        <div className="w-1/2 h-screen flex justify-center">
          <img
            src={searchParams.get("lefturl") ?? undefined}
            alt="Left Image"
          />
        </div>
        <div className="w-1/2 h-screen flex justify-center">
          <img
            src={searchParams.get("righturl") ?? undefined}
            alt="Right Image"
          />
        </div>
      </div>
      <img
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/5 z-50"
        src="vs.png"
      />
      <p className="absolute top-5 left-0 w-1/2 z-50 bg-red-900 p-5 text-white text-center -skew-y-6 text-5xl drop-shadow-2xl">
        {searchParams.get("leftname")}
      </p>
      <p className="absolute top-5 right-0 w-1/2 z-50 bg-blue-900 p-5 text-white text-center -skew-y-6 text-5xl drop-shadow-2xl">
        {searchParams.get("rightname")}
      </p>
    </>
  );
};

export default CardView;
