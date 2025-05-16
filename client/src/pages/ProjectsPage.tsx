import API from 'api';
import AddProjectBlock from 'components/AddProjectBlock';
import ProjectTable from 'components/ProjectsTable';
import { useAuthRedirect } from 'hooks/useAuthRedirect';
import { useEffect, useState } from 'react';
import { Project } from 'types/project';

export default function ProjecstPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  useAuthRedirect();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await API.getAllProjects();
        setProjects(response.data);
      } catch (error: any) {
        setError(true);
      }
    };

    getProjects();
    setLoading(false);
  }, []);

  function addProjectToList(project: Project) {
    setProjects(prevState => [...prevState, project]);
  }

  function removeProjectFromList(projectId: number) {
    setProjects(prevState => prevState.filter(project => project.id !== projectId));
  }
  function removeAllProjectsFromList() {
    setProjects([]);
  }
  function updateProject(id: number, data: Project) {
    setProjects(prevState =>
      [...prevState].map(project => {
        if (project.id === id) {
          return data;
        } else {
          return project;
        }
      }),
    );
  }

  return (
    <div className="h-screen px-[2rem] flex flex-col items-center w-screen bg-gradient-to-br from-violet-500 to-blue-500 ">
      <div className="bg-white max-w-[75%] rounded-2xl w-full h-[75vh] m-auto  flex flex-col-reverse md:flex-row">
        <ProjectTable
          updateProject={updateProject}
          removeProject={removeProjectFromList}
          loading={loading}
          error={error}
          projects={projects}
        />
        <AddProjectBlock
          projects={projects}
          updateProject={updateProject}
          removeAllProjectsFromList={removeAllProjectsFromList}
          addProject={addProjectToList}
        />
      </div>
    </div>
  );
}
