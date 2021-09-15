/** @jsxImportSource theme-ui */
import { Button } from "theme-ui";
import Link from "next/link";
import Layout from "@components/Layout";
import Svg from "@components/Svg";
import { layout } from "@styles/layout";
import { text } from "@styles/text";
import { box } from "@styles/box";

const NotFoundPage = () => {
  const num = [];
  for (let i = 0; i < 16; i++) {
    num.push(i);
  }
  return (
    <Layout>
      <div className={layout({ variant: "hero", css: { maxHeight: 1200 } })}>
        <div
          className={box({
            display: "flex",
            justifyContent: "start",
            pt: "$4",
            flexDirection: "column-reverse",
            "@bp1": { pt: "$11" },
            "@bp3": { justifyContent: "space-between", flexDirection: "row" },
          })}
          sx={{
            justifyContent: ["start", null, "space-between"],
            pt: [4, 11, 11],
            flexDirection: ["column-reverse", null, "row"],
          }}
        >
          <div>
            <h1
              className={text({
                css: {
                  fontSize: 80,
                  fontWeight: 400,
                  color: "$green",
                  "@bp1": { fontSize: 200 },
                },
              })}
            >
              404
            </h1>
            <p
              className={text({
                css: { fontSize: "$3", "@bp1": { fontSize: "$4" } },
              })}
            >
              The page does not exist or has been deleted.
            </p>
          </div>
          <div
            className={box({
              display: "grid",
              gridTemplate: "repeat(4, 82px) / repeat(4, 82px)",
              alignItems: "center",
              justifyContent: "center",
              mb: "$4",
              gap: "$3",
              "@bp1": { mb: "$11", gap: "$4" },
              "@bp2": { gap: "$3" },
            })}
            sx={{
              gridTemplate: "repeat(4, 82px) / repeat(4, 82px)",
              alignItems: "center",
              justifyContent: "center",
              mb: [4, 11, null],
              gap: [3, 4, 3],
            }}
          >
            {new Array(16).fill(0).map((i) => (
              <Svg key={i} />
            ))}
          </div>
        </div>
        <Link href="/" passHref>
          <Button as="a" sx={{ mt: 5 }}>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3482 2.75161C13.1232 2.52665 12.818 2.40027 12.4998 2.40027C12.1816 2.40027 11.8764 2.52665 11.6514 2.75161L3.2514 11.1516C3.03282 11.3779 2.91186 11.6811 2.9146 11.9957C2.91733 12.3103 3.04353 12.6113 3.26602 12.8338C3.48851 13.0563 3.78949 13.1825 4.10412 13.1852C4.41876 13.188 4.72188 13.067 4.9482 12.8484L5.2998 12.4968V20.4C5.2998 20.7183 5.42623 21.0235 5.65128 21.2485C5.87632 21.4736 6.18155 21.6 6.4998 21.6H8.8998C9.21806 21.6 9.52329 21.4736 9.74833 21.2485C9.97338 21.0235 10.0998 20.7183 10.0998 20.4V18C10.0998 17.6818 10.2262 17.3765 10.4513 17.1515C10.6763 16.9264 10.9815 16.8 11.2998 16.8H13.6998C14.0181 16.8 14.3233 16.9264 14.5483 17.1515C14.7734 17.3765 14.8998 17.6818 14.8998 18V20.4C14.8998 20.7183 15.0262 21.0235 15.2513 21.2485C15.4763 21.4736 15.7815 21.6 16.0998 21.6H18.4998C18.8181 21.6 19.1233 21.4736 19.3483 21.2485C19.5734 21.0235 19.6998 20.7183 19.6998 20.4V12.4968L20.0514 12.8484C20.2777 13.067 20.5808 13.188 20.8955 13.1852C21.2101 13.1825 21.5111 13.0563 21.7336 12.8338C21.9561 12.6113 22.0823 12.3103 22.085 11.9957C22.0877 11.6811 21.9668 11.3779 21.7482 11.1516L13.3482 2.75161Z"
                fill="#E3E3E3"
              />
            </svg>{" "}
            Take me home
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
