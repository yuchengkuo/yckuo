import useSWR from "swr";
import fetcher from "utlis/fetcher";
import Image from "next/image";
import { motion } from "framer-motion";
import classNames from "classnames";
import { box } from "@styles/box";
import { text } from "@styles/text";
import { link } from "@styles/link";

export default function TopAlbums() {
  const { data } = useSWR("/api/top-albums", fetcher);
  const variant = {
    hover: {
      x: 0,
      y: 0,
      opacity: 1,
      rotateZ: 0,
    },
  };

  return data ? (
    <ul
      className={box({
        listStyle: "none",
        gridColumn: 2,
        p: 0,
        mt: "$7",
      })}
    >
      {data.albums.map((album, i) => (
        <motion.li key={i} whileHover="hover" className={box({ mb: "$10" })}>
          <a
            className={link()}
            href={album.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className={box({
                display: "flex",
                height: 120,
                position: "relative",
              })}
            >
              <p
                className={classNames(
                  text({
                    fontSize: "$3",
                    fontWeight: 300,
                    color: "$gray2",
                    mt: "auto",
                    mr: "$3",
                    "@bp1": { mr: "$4" },
                  }),
                  i === 0
                    ? ""
                    : text({
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          backgroundColor: "$gray3",
                          top: -60,
                          width: 1,
                          height: 150,
                        },
                      })
                )}
              >
                0{i + 1}
              </p>

              <div
                className={box({
                  borderRadius: 5,
                  overflow: "hidden",
                  flexShrink: 0,
                })}
              >
                <Image src={album.imageUrl} width={120} height={120} />
              </div>

              <div
                className={box({
                  display: "flex",
                  ml: "$5",
                  flexDirection: "column",
                })}
              >
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ x: -10, y: 10, opacity: 0, rotateZ: 30 }}
                  variants={variant}
                >
                  <path
                    d="M7 17L17 7"
                    stroke="#E3E3E3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 7H17V17"
                    stroke="#E3E3E3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
                <h3
                  className={text({
                    fontSize: "$5",
                    fontWeight: 200,
                    lineHeight: 2,
                    color: "$white",
                    mt: "auto",
                  })}
                >
                  {album.title}
                </h3>
                <p
                  className={text({
                    fontSize: "$3",
                    fontWeight: 300,
                    color: "$gray2",
                  })}
                >
                  {album.artist}
                </p>
              </div>
            </div>
          </a>
        </motion.li>
      ))}
    </ul>
  ) : (
    <div className={box({ gridColumn: 2, p: 0, mt: "$7" })}>
      {new Array(5).fill(0).map((_, i) => (
        <div
          key={i}
          className={box({
            display: "flex",
            mb: "$11",
            height: 120,
            position: "relative",
          })}
        >
          <p
            className={classNames(
              text({
                fontSize: "$3",
                fontWeight: 300,
                color: "$gray2",
                mt: "auto",
                mr: "$3",
                "@bp1": { mr: "$4" },
              }),
              i === 0
                ? ""
                : text({
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      backgroundColor: "$gray3",
                      top: -60,
                      width: 1,
                      height: 150,
                    },
                  })
            )}
          >
            0{i + 1}
          </p>

          <div
            className={box({
              height: 120,
              width: 120,
              backgroundColor: "$green",
              borderRadius: 5,
            })}
          />

          <div
            className={box({
              display: "flex",
              ml: "$5",
              flexDirection: "column",
            })}
          >
            <h3
              className={text({
                fontSize: "$5",
                fontWeight: 200,
                lineHeight: 2,
                color: "$white",
                mt: "auto",
              })}
            >
              Loading...
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
