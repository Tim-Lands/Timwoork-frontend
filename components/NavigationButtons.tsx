import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useState } from "react";

const NavigationButtons = ({
  nextTitle,
  backTitle,
  nextIcon,
  backIcon,
  onNextClick,
  onBackClick,
  isNextVisible,
  isBackVisible,
}: {
  nextTitle?: string;
  backTitle?: string;
  nextIcon?: string;
  backIcon?: string;
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
      : language == "en"
      ? "chevron_right"
      : "chevron_left",
    onBackClick: onBackClick
      ? onBackClick
      : () => {
          router.back();
        },
    onNextClick: onNextClick,
    isNextVisible: isNextVisible ? isNextVisible : true,
    isBackVisible: isBackVisible ? isBackVisible : true,
  });

  return (
    <div>
      {props.isBackVisible && (
        <button
          onClick={(e) => props.onBackClick(e)}
          type="button"
          className="btn flex-center butt-primary2-out mx-1 butt-md"
        >
          <span className="material-icons-outlined">{props.backIcon}</span>
          <span className="text">{props.backTitle}</span>
        </button>
      )}
      {props.isNextVisible && (
        <button
          onClick={(e) => props.onNextClick(e)}
          type="button"
          className="btn flex-center butt-green ml-auto butt-sm"
        >
          <span className="text">{props.nextTitle}</span>
          <span className="material-icons-outlined">{props.nextIcon}</span>
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
