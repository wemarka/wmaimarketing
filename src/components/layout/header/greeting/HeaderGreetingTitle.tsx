
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
    <h1 className="text-base font-semibold text-white/90 flex items-center gap-1">
      {greeting}{userName && `, ${userName}`}
    </h1>
  );
};

export default HeaderGreetingTitle;
