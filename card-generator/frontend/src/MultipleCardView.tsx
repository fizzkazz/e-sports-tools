import { FC } from "react";
import { useSearchParams } from "react-router-dom";

const MultipleCardView: FC = () => {
  const [searchParams] = useSearchParams();

  const leftParams = searchParams.get("left");
  const rightParams = searchParams.get("right");
  if (!leftParams || !rightParams) {
    return <></>;
  }

  const extractMembers = (rawMembers: string) => {
    const members = JSON.parse(atob(rawMembers)) as Member[];
    return members.filter((m) => m.name !== "" && m.url !== "");
  };

  const leftMembers = extractMembers(leftParams);
  const rightMembers = extractMembers(rightParams);

  return (
    <>
      <div className="flex justify-center items-center bg-black">
        {leftMembers.map((member) => _CardView({ ...member, variant: "red" }))}
        {rightMembers.map((member) =>
          _CardView({ ...member, variant: "blue" })
        )}
      </div>
      <img
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/5 z-50"
        src="vs.png"
      />
    </>
  );
};

const cardViewVariants = {
  red: {
    bg: "bg-red-900",
  },
  blue: {
    bg: "bg-blue-900",
  },
  yellow: {
    bg: "bg-yellow-900",
  },
  green: {
    bg: "bg-green-900",
  },
};

interface _CardViewProps extends Member {
  variant: keyof typeof cardViewVariants;
}

const _CardView: FC<_CardViewProps> = ({
  name,
  url,
  variant,
}: {
  name: string;
  url: string;
  variant: keyof typeof cardViewVariants;
}) => {
  return (
    <div className="relative w-1/2 h-screen flex justify-center">
      <img src={url} alt="Left Image" />
      <p
        className={`absolute top-5 left-0 w-full z-5 p-5 text-white text-center -skew-y-6 text-5xl drop-shadow-2xl ${cardViewVariants[variant].bg}`}
      >
        {name}
      </p>
    </div>
  );
};
export default MultipleCardView;
