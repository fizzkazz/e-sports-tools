import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { Member } from "./member";
import { AutoSizedText } from "./AutoSizedText";

const MultipleCardView: FC = () => {
  const [searchParams] = useSearchParams();

  const leftParams = searchParams.get("left");
  const rightParams = searchParams.get("right");
  if (!leftParams || !rightParams) {
    return <></>;
  }

  const extractMembers = (rawMembers: string) => {
    const members = JSON.parse(atob(rawMembers)) as Member[];
    return members.filter((m) => m.name !== "");
  };

  const leftMembers = extractMembers(leftParams);
  const rightMembers = extractMembers(rightParams);

  return (
    <>
      <div className="flex justify-center items-center bg-black scroll-background">
        {leftMembers.map((member) => (
          <div key={member.name}>{_CardView({ ...member })}</div>
        ))}
        {rightMembers.map((member) => (
          <div key={member.name}>{_CardView({ ...member })}</div>
        ))}
      </div>
      <img
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2/3 z-50"
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

const _CardView: FC<Member> = ({
  name,
  url,
  variant,
}: {
  name: string;
  url: string;
  variant: keyof typeof cardViewVariants | null;
}) => {
  const imageUrl = url === "" ? "default_avatar.png" : url;
  return (
    <div className="relative h-screen flex justify-center">
      <img src={imageUrl} alt="Image" />
      <AutoSizedText
        text={name}
        className={`absolute top-5 left-0 w-full z-5 p-2 text-white text-center -skew-y-6 text-5xl drop-shadow-2xl ${
          cardViewVariants[variant ?? "red"].bg
        }`}
      ></AutoSizedText>
    </div>
  );
};

export default MultipleCardView;
