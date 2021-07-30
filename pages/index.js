/** @jsxImportSource theme-ui */
import { Flex, Container, Button, Themed, Text } from "theme-ui";
import Link from "next/link";
import Hero from "components/Hero";
import Layout from "../components/Layout";
import ProjectCard from "components/ProjectCard";
import { getAllProjectsData } from "utlis/projects";

const Home = ({ allProjectsData }) => {
  return (
    <Layout>
      <Hero />

      <Container id="project" variant="section">
        <Text as="h3" variant="sectionTitle">
          Projects
        </Text>
        <Flex sx={{ flexDirection: "column", gap: 11 }}>
          {allProjectsData.map((data, i) => (
            <ProjectCard key={i} data={data} />
          ))}
        </Flex>
      </Container>

      <Container variant="text">
        <Text as="h3" variant="sectionTitle">
          About
        </Text>
        <Themed.p>
          👋 I&apos;m YuCheng, a thinker and doer who is fascinated by tech,
          design, web, automobiles, music, films and many other things.🚶‍♂️
        </Themed.p>
        <Flex sx={{ flexDirection: ["column", "row"] }}>
          <Link href="/about" passHref>
            <Button as="a" mr={[0, 11]} mb={[5, 0]}>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 7C16.5 8.06087 16.0786 9.07828 15.3284 9.82843C14.5783 10.5786 13.5609 11 12.5 11C11.4391 11 10.4217 10.5786 9.67157 9.82843C8.92143 9.07828 8.5 8.06087 8.5 7C8.5 5.93913 8.92143 4.92172 9.67157 4.17157C10.4217 3.42143 11.4391 3 12.5 3C13.5609 3 14.5783 3.42143 15.3284 4.17157C16.0786 4.92172 16.5 5.93913 16.5 7V7ZM12.5 14C10.6435 14 8.86301 14.7375 7.55025 16.0503C6.2375 17.363 5.5 19.1435 5.5 21H19.5C19.5 19.1435 18.7625 17.363 17.4497 16.0503C16.137 14.7375 14.3565 14 12.5 14V14Z"
                  stroke="#E3E3E3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              More info
            </Button>
          </Link>
          <Link href="https://read.cv/yuchengkuo" passHref>
            <Button
              as="a"
              data-splitbee-event="External Link"
              data-splitbee-event-type="read.cv"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.90707 0.602843C7.30668 0.174018 5.66167 1.12376 5.23284 2.72416L1.60284 16.2715C1.17402 17.8719 2.12376 19.5169 3.72416 19.9457L15.0555 22.982C16.6559 23.4108 18.301 22.4611 18.7298 20.8607L22.3598 7.31331C22.7886 5.71292 21.8389 4.06791 20.2385 3.63908L8.90707 0.602843ZM7.16469 3.2418C7.30763 2.70833 7.85597 2.39175 8.38944 2.5347L19.7208 5.57093C20.2543 5.71387 20.5709 6.26221 20.4279 6.79568L16.7979 20.343C16.655 20.8765 16.1067 21.1931 15.5732 21.0501L4.2418 18.0139C3.70834 17.8709 3.39175 17.3226 3.53469 16.7891L7.16469 3.2418ZM9.77392 4.96062C9.24152 4.81375 8.69086 5.12628 8.54399 5.65868C8.39713 6.19108 8.70966 6.74173 9.24206 6.8886L16.792 8.97134C17.3244 9.11821 17.8751 8.80568 18.0219 8.27328C18.1688 7.74088 17.8563 7.19023 17.3239 7.04336L9.77392 4.96062ZM7.56076 9.09989C7.70762 8.56749 8.25828 8.25496 8.79068 8.40183L16.3406 10.4846C16.873 10.6314 17.1856 11.1821 17.0387 11.7145C16.8918 12.2469 16.3412 12.5594 15.8088 12.4126L8.25882 10.3298C7.72642 10.1829 7.41389 9.63229 7.56076 9.09989ZM7.80753 11.843C7.27513 11.6962 6.72447 12.0087 6.5776 12.5411C6.43073 13.0735 6.74327 13.6242 7.27567 13.771L11.6663 14.9822C12.1987 15.1291 12.7494 14.8166 12.8962 14.2842C13.0431 13.7518 12.7306 13.2011 12.1982 13.0542L7.80753 11.843Z"
                  fill="#E3E3E3"
                />
              </svg>
              Read.CV
            </Button>
          </Link>
        </Flex>
      </Container>

      <Container variant="text">
        <Text as="h3" variant="sectionTitle">
          Contact
        </Text>
        <Themed.p>
          Open to ideas and feedback. Let&apos;s connect (the dots)!
        </Themed.p>
        <Link href="mailto:hey@yuchengkuo.com?subject=Hi!" passHref>
          <Button
            as="a"
            data-splitbee-event="External Link"
            data-splitbee-event-type="mail"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.83335 3.33325H17.1667C18.0834 3.33325 18.8334 4.08325 18.8334 4.99992V14.9999C18.8334 15.9166 18.0834 16.6666 17.1667 16.6666H3.83335C2.91669 16.6666 2.16669 15.9166 2.16669 14.9999V4.99992C2.16669 4.08325 2.91669 3.33325 3.83335 3.33325Z"
                stroke="#E3E3E3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.8334 5L10.5 10.8333L2.16669 5"
                stroke="#E3E3E3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Send mail
          </Button>
        </Link>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const allProjectsData = await getAllProjectsData();
  return {
    props: {
      allProjectsData,
    },
  };
}

export default Home;
