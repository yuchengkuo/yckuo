import Link from "next/link";
import { LogoSvg } from "./Header";
import NowPlaying from "./NowPlaying";
import { layout } from "@styles/layout";
import { link } from "@styles/link";
import { text } from "@styles/text";
import { box } from "@styles/box";

export default function Footer() {
  return (
    <footer>
      <div className={layout({ variant: "footer" })}>
        <NowPlaying />
        <div
          className={box({ display: "flex", alignItems: "center", mt: "$6" })}
        >
          <Link href="/" passHref>
            <a className={link({ variant: "navLink" })}>
              <LogoSvg />
            </a>
          </Link>
          <p
            className={text({
              css: {
                fontSize: "$3",
                fontWeight: 600,
                color: "$gray1",
                ml: "$2",
              },
            })}
          >
            &#169; 2021 yucheng kuo.
          </p>
          <p
            className={text({
              css: {
                fontSize: "$2",
                fontWeight: 600,
                color: "$gray1",
                ml: "auto",
              },
            })}
          >
            TW
          </p>
        </div>
      </div>
    </footer>
  );
}
