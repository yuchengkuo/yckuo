import useSWR from "swr";
import fetcher from "../utlis/fetcher";
import { Lottie } from "@crello/react-lottie";
// @ts-ignore
import animationData from "../public/sound.json";
import { box } from "@styles/box";
import { text } from "@styles/text";
import { link } from "@styles/link";

export default function NowPlaying() {
  const { data } = useSWR("/api/now-playing", fetcher);

  return (
    <div
      className={box({
        display: "flex",
        alignItems: "center",
        fontSize: "$3",
        fontWeight: 400,
        "& svg": { flexShrink: 0 },
      })}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5ZM12.0439 12.3047C11.9004 12.3047 11.8301 12.2344 11.6895 12.1641C10.6318 11.5283 9.29297 11.1768 7.88086 11.1768C7.10449 11.1768 6.25781 11.3174 5.55176 11.458C5.41113 11.458 5.27051 11.5283 5.2002 11.5283C4.91895 11.5283 4.70801 11.3174 4.70801 11.0361C4.70801 10.752 4.84863 10.541 5.12988 10.541C6.04688 10.3301 6.96387 10.1895 7.95117 10.1895C9.57422 10.1895 11.0566 10.6113 12.3252 11.3174C12.4658 11.458 12.6094 11.5283 12.6094 11.8096C12.4658 12.1641 12.2549 12.3047 12.0439 12.3047ZM12.8174 10.3301C12.6768 10.3301 12.5361 10.2598 12.3955 10.1895C11.1973 9.41309 9.50391 8.98828 7.66992 8.98828C6.75293 8.98828 5.90332 9.13184 5.27051 9.27246C5.12988 9.34277 5.05957 9.34277 4.91895 9.34277C4.56445 9.34277 4.35352 9.05859 4.35352 8.77734C4.35352 8.42578 4.49414 8.28516 4.8457 8.1416C5.69238 7.93066 6.53906 7.71973 7.74024 7.71973C9.71484 7.71973 11.5488 8.21191 13.1016 9.12891C13.3125 9.26953 13.4531 9.4834 13.4531 9.69434C13.3828 10.0459 13.1719 10.3301 12.8174 10.3301ZM13.7344 8.07129C13.5938 8.07129 13.5234 8.00098 13.3125 7.93066C11.9004 7.1543 9.85547 6.66211 7.88086 6.66211C6.89355 6.66211 5.83301 6.80274 4.91602 7.01367C4.77539 7.01367 4.70508 7.08399 4.49414 7.08399C4.07227 7.1543 3.78809 6.80273 3.78809 6.37793C3.78809 5.95605 3.99902 5.74219 4.2832 5.67188C5.41113 5.39062 6.60938 5.25 7.88086 5.25C10.0664 5.25 12.3252 5.74219 14.0889 6.66211C14.2998 6.80274 14.5107 7.01367 14.5107 7.36524C14.4404 7.79004 14.1592 8.07129 13.7344 8.07129Z"
          fill="#1db954"
        />
      </svg>

      {data?.isPlaying ? (
        <>
          <Lottie
            config={{ animationData: animationData, loop: true }}
            width="18px"
            height="18px"
            speed={1.5}
            style={{ marginLeft: "4px", marginRight: "4px", flexShrink: 0 }}
          />
          <div className={box({ display: "flex", overflow: "hidden" })}>
            <p className={text({ css: { whiteSpace: "nowrap" } })}>
              {data.artist || data.show}&nbsp;&nbsp;-&nbsp;&nbsp;
            </p>
            <a
              className={link({
                underline: true,
                css: {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              })}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.title}
            </a>
          </div>
        </>
      ) : (
        <p className={text({ css: { color: "$gray3", mx: "$2" } })}>
          Currently Offline
        </p>
      )}
    </div>
  );
}