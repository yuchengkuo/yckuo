import Layout from "components/Layout";
import { getAllProjectsPath, getProjectData } from "lib/projects";
import { Container } from "theme-ui";

const ProjectTemplate = ({ projectData }) => {
  return (
    <Layout>
      <Container>
        <h1>{projectData.title}</h1>
        <p>{projectData.subtitle}</p>
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getAllProjectsPath();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const projectData = await getProjectData(params.slug);
  return {
    props: {
      projectData,
    },
  };
}

export default ProjectTemplate;
