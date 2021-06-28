/** @jsxImportSource theme-ui */
import { Flex, Button } from "theme-ui";
export default function SideMenu({ ids }) {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        position: "fixed",
        left: 60,
        top: 5,
        width: 200,
      }}
    >
      <h4 sx={{ variant: "text.caps" }}>content</h4>
      <ul sx={{ listStyle: "none", p: 0 }}>
        {ids.map((item, i) => (
          <li key={i}>
            <Button
              variant="secondary"
              onClick={() => {
                const article = document.getElementById("article").offsetTop;
                window.scrollTo({
                  top:
                    document.getElementById(item.id).offsetTop + article - 50,
                  behavior: "smooth",
                });
              }}
            >
              {item.title}
            </Button>
          </li>
        ))}
      </ul>
    </Flex>
  );
}
