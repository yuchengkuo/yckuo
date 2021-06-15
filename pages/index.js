/** @jsxImportSource theme-ui */
import Layout from "../components/Layout";
import { Container } from "theme-ui";
import Hero from "components/Hero";
import ProjectCard from "components/ProjectCard";
import { getAllProjectsData } from "lib/projects";

const Home = ({ allProjectsData }) => {
  return (
    <Layout>
      <Hero />
      <Container
        as="section"
        variant="section"
        sx={{ display: "flex", flexDirection: "column", gap: 11 }}
      >
        {allProjectsData.map((data, i) => (
          <ProjectCard key={i} data={data} />
        ))}
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
