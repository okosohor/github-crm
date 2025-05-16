import API from 'api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from 'types/project';
import Button from 'ui/Button';
import Input from 'ui/Input';

interface Props {
  addProject: (project: Project) => void;
  removeAllProjectsFromList: () => void;
  updateProject: (id: number, data: Project) => void;
  projects: Project[];
}

export default function AddProjectBlock({
  addProject,
  removeAllProjectsFromList,
  updateProject,
  projects,
}: Props) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleAddProject() {
    if (!url) {
      setError('Please enter a valid repository URL');
      return;
    }

    try {
      const response = await API.createOrUpdateProject(url);

      if (projects.find(project => project.id === response.data.id)) {
        updateProject(response.data.id, response.data);
      } else {
        addProject(response.data);
      }

      setUrl('');
      setError('');
    } catch (err: any) {
      if (err.response?.data?.message === 'Project not found on GitHub') {
        setError(err.response.data.message);
      } else {
        setError('Failed to add project. Please try again.');
      }
    }
  }

  async function handleRemoveAllProjects() {
    try {
      await API.deleteAllUserProjects();
      removeAllProjectsFromList();
    } catch (error) {
      setError('Something went wrong please try again later');
    }
  }

  function handleLogout() {
    navigate('/');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  }

  return (
    <div className="md:w-1/4 flex min-h-[250px] flex-col border-b-2 md:border-b-0 md:border-l-2 border-gray-400 h-ful gap-2 md:gap-6 p-2 md:p-6">
      <h2 className="text-gray-600 font-bold text-2xl md:text-4xl md:mb-4">Add project</h2>
      <Input
        value={url}
        type="text"
        placeholder="facebook/react"
        name="Repository url"
        handleChange={setUrl}
        error={error}
      />
      <Button fullWidth text="add project" handleClick={handleAddProject} />
      <Button fullWidth text="delete all" handleClick={handleRemoveAllProjects} />
      <Button fullWidth text="logout" handleClick={handleLogout} />
    </div>
  );
}
