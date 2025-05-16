import { Project } from 'types/project';
import CardInfo from './CardInfo';
import DeleteIcon from 'icons/DeleteIcon';
import UpdateIcon from 'icons/UpdateIcon';
import API from 'api';
interface Props {
  project: Project;
  removeProject: (projectId: number) => void;
  updateProject: (id: number, data: Project) => void;
}

export default function ProjectCard({ project, removeProject, updateProject }: Props) {
  const { full_name, url, forks, stars, id, issues, created_at } = project;

  async function handleDeleteProject() {
    try {
      await API.deleteUserProject(id);
      removeProject(id);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate() {
    try {
      const response = await API.createOrUpdateProject(full_name);
      console.log(response);

      updateProject(response.data.id, response.data);
      console.log('Project added', response.data);
    } catch (err: any) {
      console.log('update error');
    }
  }

  const date = new Date(created_at);
  const unixTimestamp = Math.floor(date.getTime() / 1000);

  return (
    <div className="w-full flex flex-col justify-between p-4 border border-gray-400 rounded-xl">
      <div className="flex md:flex-row flex-col md:justify-between md:mb-6">
        <a
          className="font-bold text-xl hover:text-blue-500 text-gray-500"
          target="_blank"
          href={url}
          rel="noreferrer" 
        >
          {full_name}
        </a>
        <div className="flex gap-2 mb-2 md:mb-0">
          <button onClick={handleUpdate} className="text-gray-800 hover:text-green-500">
            <UpdateIcon />
          </button>
          <button onClick={handleDeleteProject} className="text-gray-800 hover:text-red-500">
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:flex-start gap-1">
        <CardInfo text="Forks: " value={forks} />
        <CardInfo text="Stars: " value={stars} />
        <CardInfo text="Issues: " value={issues} />
        <CardInfo text="Created at: " value={unixTimestamp} />
      </div>
    </div>
  );
}
