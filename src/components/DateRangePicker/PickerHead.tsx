import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import React, { FC } from "react";

interface PickerHeadProps {
  currDate: Date;
  prev: () => void;
  next: () => void;
}

const PickerHead: FC<PickerHeadProps> = ({currDate, prev, next}) => {

  return (
    <div className="w-full flex justify-between items-center">
      <button className="w-[44px] h-[44px] bg-white hover:bg-[#e6e6e6]" onClick={prev}>{`<`}</button>
      <p>{format(currDate, 'yyyy MMMM',{ locale: zhTW })}</p>
      <button className="w-[44px] h-[44px] bg-white hover:bg-[#e6e6e6]" onClick={next}>{`>`}</button>
    </div>
  );
}

export default PickerHead;