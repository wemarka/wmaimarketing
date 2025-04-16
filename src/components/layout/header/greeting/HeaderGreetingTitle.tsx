
import React from "react";

interface HeaderGreetingTitleProps {
  greeting: string;
  userName: string;
}

const HeaderGreetingTitle: React.FC<HeaderGreetingTitleProps> = ({
  greeting,
  userName
}) => {
  return (
    <h1 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-[#3a7a89] to-[#4a8a99] inline-block text-transparent bg-clip-text">
      {greeting}{userName && `, ${userName}`}
    </h1>
  );
};

export default HeaderGreetingTitle;
