import React, {useState} from 'react';
import ProjectCard from './ProjectCard';
import ProjectForm from "./ProjectForm";

function ProjectList({ projects,onSave }) {
    const [projectBeingEdited, setProjectBeingEdited] = useState({});
    const handleEdit = (project)=>{
        setProjectBeingEdited(project);
    }
    const cancelEditing=()=>{
        setProjectBeingEdited({});
    }
 return (
     <div className="row">
           {projects.map((project) => (
             <div key={project.id} className="cols-sm">
                 {project === projectBeingEdited ?(
                     <ProjectForm project ={project} onCancel={cancelEditing} onSave={onSave} />
                 ) : (
                     <ProjectCard project={project} onEdit={handleEdit} />
                 )}
                </div>
           ))}
         </div>
    );
}

export default ProjectList;