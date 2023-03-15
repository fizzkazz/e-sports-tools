import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

const MultipleCardView: FC = () => {
  const [searchParams] = useSearchParams();

  const leftParams = searchParams.get('left');
  const rightParams = searchParams.get('right');
  if (!leftParams || !rightParams) {
    return <></>;
  }

  const extractMembers = (rawMembers: string) => {
    const members = JSON.parse(atob(rawMembers)) as Member[];
    return members.filter((m) => m.name !== '' && m.url !== '');
  };

  const leftMembers = extractMembers(leftParams);
  const rightMembers = extractMembers(rightParams);

  const columns = Math.min(leftMembers.length, 4);
  const rows = Math.ceil(leftMembers.length / columns);

  return (
    <>
      <div className="flex justify-center items-center bg-black">
        {leftMembers.map((member) => _CardView(member))}
        {rightMembers.map((member) => _CardView(member))}
      </div>
      <img
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/5 z-50"
        src="vs.png"
      />
    </>
  );
};

const _CardView: FC<Member> = ({ name, url }) => {
  return (
    <div className="relative w-1/2 h-screen flex justify-center">
      <img src={url} alt="Left Image" />
      <p className="absolute top-5 left-0 w-full z-50 bg-red-900 p-5 text-white text-center -skew-y-6 text-5xl drop-shadow-2xl">
        {name}
      </p>
    </div>
  );
};

export default MultipleCardView;
