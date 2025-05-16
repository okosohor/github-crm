import { Project } from 'types/project';
import ProjectCard from './ProjectCard';

interface Props {
  error: boolean,
  projects: Project[],
  loading: boolean,
  removeProject: (projectId : number) => void;
  updateProject:(id: number, data: Project) => void;
}

export default function ProjectTable({error, projects, loading, removeProject, updateProject}:Props) {
  return (
    <div className="md:w-3/4 py-10 px-4">
      {error ? (
        <p className="text-xl text-gray-500 mb-4 w-full text-center">
          Something went wrong, please try again later
        </p>
      ) : loading ? (
        <p className="text-xl text-gray-500 mb-4 w-full text-center">Loading, please wait</p>
      ) : !projects.length ? (
        <div className="w-full h-full flex flex-col justify-center items-center text-center ">
          <span className="text-6xl mb-4">📁</span>
          <p className="text-xl text-gray-500 mb-4">
            It looks like you don’t have any projects yet.
          </p>
          <p className="text-lg text-gray-400 mb-6">Create your first project and get started!</p>
        </div>
      ) : (
        <div className='md:h-full h-[300px] overflow-y-scroll gap-4 flex flex-col pr-6'>
          {projects.map(project => (
            <ProjectCard updateProject={updateProject} removeProject={removeProject} key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
