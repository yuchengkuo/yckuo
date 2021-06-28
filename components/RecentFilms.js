/** @jsxImportSource theme-ui */
import { transparentize } from "@theme-ui/color";
import { format, parseISO } from "date-fns";
import { Flex, Link } from "theme-ui";

export default function RecentFilms({ films }) {
  const items = films.slice(0, 5).map((film) => ({
    date: film.date.watched,
    title: film.film.title,
    year: film.film.year,
    rating: film.rating.text,
    url: film.uri,
  }));

  return (
    <ul
      sx={{
        listStyleType: "none",
        p: 6,
        backgroundColor: transparentize("text", 0.9),
        borderRadius: 15,
        boxShadow: `inset -0.6px 0.6px 1px #ffffff26`,
        backdropFilter: `blur(30px)`,
        "li:last-child": { mb: 0 },
      }}
    >
      <h3
        sx={{
          fontSize: 2,
          fontWeight: "heading",
          color: "secondaryText",
          mb: 8,
        }}
      >
        Recent log 📽️
      </h3>
      {items.map((item, i) => (
        <li key={i} sx={{ mb: 6 }}>
          <Flex sx={{ flexDirection: "column" }}>
            <Flex>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: [1, 2],
                  fontWeight: 200,
                  mb: 3,
                  textDecoration: "none",
                  color: "text",
                }}
              >
                {item.title}
              </Link>
              <p sx={{ fontSize: 0, m: 0, ml: "auto", letterSpacing: 1 }}>
                {item.rating}
              </p>
            </Flex>
            <Flex>
              <p sx={{ fontSize: 1, fontWeight: 300, m: 0, color: "altText" }}>
                {item.year}
              </p>
              <p sx={{ fontSize: 0, m: 0, ml: "auto", color: "altText" }}>
                {format(parseISO(item.date), "MMM dd")}
              </p>
            </Flex>
          </Flex>
        </li>
      ))}
    </ul>
  );
}
