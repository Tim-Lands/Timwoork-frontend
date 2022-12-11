import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useState } from "react";

const NavigationButtons = ({
  nextTitle,
  backTitle,
  nextIcon,
  backIcon,
  nextClass,
  backClass,
  onNextClick,
  onBackClick,
  isNextVisible,
  isBackVisible,
}: {
  nextTitle?: string;
  backTitle?: string;
  nextIcon?: string;
  backIcon?: string;
  nextClass?: string;
  backClass?: string;
  onNextClick: Function;
  onBackClick?: Function;
  isNextVisible?: Boolean;
  isBackVisible?: Boolean;
}) => {
  const router = useRouter();
  const { getAll, language } = useAppSelector((state) => state.languages);
  const [props] = useState({
    nextTitle: nextTitle ? nextTitle : getAll("Next"),
    backTitle: backTitle ? backTitle : getAll("Previous"),
    nextIcon: nextIcon
      ? nextIcon
      : language == "ar"
      ? "chevron_left"
      : "chevron_right",
    backIcon: backIcon
      ? backIcon
      : language == "ar"
      ? "chevron_right"
      : "chevron_left",
    onBackClick: onBackClick
      ? onBackClick
      : () => {
          router.back();
        },
    onNextClick: onNextClick,
    isNextVisible: isNextVisible != undefined ? isNextVisible : true,
    isBackVisible: isBackVisible != undefined ? isBackVisible : true,
  });

  console.log(props);

  return (
    <>
      {props.isBackVisible && (
        <button
          onClick={(e) => props.onBackClick(e)}
          type="button"
          className={` btn flex-center butt-primary2-out me-auto butt-md ${backClass}`}
        >
          <span className="material-icons-outlined">{props.backIcon}</span>
          <span className="text">{props.backTitle}</span>
        </button>
      )}
      {props.isNextVisible && (
        <button
          onClick={(e) => onNextClick(e)}
          type="button"
          className={`btn flex-center butt-green ml-auto butt-sm ${nextClass} `}
        >
          <span className="text">{props.nextTitle}</span>
          <span className="material-icons-outlined">{props.nextIcon}</span>
        </button>
      )}
    </>
  );
};

export default NavigationButtons;
