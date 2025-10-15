'use client';

import { languagesAvailable, projectStates } from '@/constant';
import { TProject } from '@/db/schema';
import {
  createProject,
  IProjectDataSave,
  updateProjects,
} from '@/lib/actions/projects';
import uploadImage from '@/lib/uploadImage';
import { TLanguage } from '@/types/globals';
import { motion } from 'framer-motion';
import { Fullscreen, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CustomScrollbar } from '../CustomScrollbar';
import CustomSelect, { Option } from '../CustomSelect';
import HandlerImageUpload from '../HandlerImageUpload';
import styles from './newProjectForm.module.css';
import ResizableDialog from './resizeble-dialog';
import TagSelector from './TagsSelector';

// interface IProjectForm {
//   project?: TProject[];
//   type: 'new' | 'edit';
// }
type IProjectForm =
  | {
      type: 'new';
      project?: undefined;
    }
  | {
      type: 'edit';
      project: TProject;
    };

const ProjectForm = (props: IProjectForm) => {
  const { project, type } = props;

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(type === 'edit' ? project.title : '');
  const [description, setDescription] = useState(
    type === 'edit' ? project.content : '',
  );
  const [currentMarkdown, setCurrentMarkdown] = useState<string>(
    type === 'edit' ? project.content : '',
  );
  const [tags, setTags] = useState<string[]>(
    type === 'edit' ? project.tags : [],
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // const [fullPageEditor, setFullPageEditor] = useState<boolean>(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<Option | null>(null);
  const [projectState, setProjectState] = useState<Option | null>(null);

  const maxLength = 250;

  const saveProject = async () => {
    try {
      setLoading(true);
      if (!file) {
        alert('Please upload an image before saving the project.');
        return;
      }
      if (!language) {
        alert('Please select the language before saving the project.');
        return;
      }
      if (!projectState) {
        alert('Please select the state before saving the project.');
        return;
      }
      const imageUrlUpload = await uploadImage(file);
      console.log('this is the imageUrlUpload', imageUrlUpload);
      const content: IProjectDataSave = {
        title: title,
        description: description,
        tags: tags,
        language: language.value as TLanguage,
        imageUrl: imageUrlUpload,
        content: currentMarkdown,
        enabled: projectState.value === 'true',
      };
      console.log('this is the content to save', content);
      await createProject(content);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(
        'And error ocurre in the save project, check the console for more info',
      );
      if (error instanceof Error) {
        console.error('this is the error message', error.message);
      } else {
        console.error('this is the error message', error);
      }
    }
  };

  const updateProject = async () => {
    try {
      setLoading(true);
      let contentToUpdate: Partial<IProjectDataSave> = {};
      if (file != null) {
        const imageUrlUpload = await uploadImage(file);
        contentToUpdate.imageUrl = imageUrlUpload;
      }
      if (title != project?.title) {
        contentToUpdate.title = title;
      }
      if (description != project?.description) {
        contentToUpdate.description = description;
      }
      if (tags != project?.tags) {
        contentToUpdate.tags = tags;
      }
      if (language != null && language.value != project?.language) {
        contentToUpdate.language = language.value as TLanguage;
      }
      if (
        projectState != null &&
        projectState.value != (project?.enabled ? 'true' : 'false')
      ) {
        contentToUpdate.enabled = projectState.value === 'true';
      }
      if (currentMarkdown != project?.content) {
        contentToUpdate.content = currentMarkdown;
      }
      if (project?.id !== undefined) {
        await updateProjects(project.id, contentToUpdate);
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error('Project ID is undefined.');
      }
      setLoading(false);
    } catch (error) {
      alert(
        'And error ocurre in the save project, check the console for more info',
      );
      setLoading(false);
      if (error instanceof Error) {
        console.error('this is the error message', error.message);
        console.error(error);
      } else {
        console.error('this is the error message', error);
      }
    }
  };

  const MotionLoader = motion.create(LoaderCircle);

  useEffect(() => {
    if (type === 'edit' && project) {
      setTitle(project.title);
      setDescription(project.description);
      setCurrentMarkdown(project.content);
      setTags(project.tags);
      const language = languagesAvailable.find(
        (element) => element.value === project.language,
      );
      language && setLanguage(language);
      const state = projectStates.find(
        (element) => element.value === (project.enabled ? 'true' : 'false'),
      );
      state && setProjectState(state);
    }
  }, [type, project]);

  return (
    <>
      <CustomScrollbar height="calc(100dvh - 2rem)">
        <div className={styles.container}>
          {/* Imagen */}
          <section className={styles.formGroup}>
            <label className={styles.label}>Thumbnail Image</label>
            <HandlerImageUpload
              onImageUpload={setFile}
              defaultImageUrl={type === 'edit' ? project.imageUrl : undefined}
            />
          </section>

          {/* Título */}
          <section className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter project title"
              className={styles.input}
              value={title}
              // defaultValue={type === 'edit' ? project.title : undefined}
              onChange={(e) => setTitle(e.target.value)}
            />
          </section>

          <TagSelector
            callback={setTags}
            defaultTags={type === 'edit' ? project.tags : undefined}
          />

          <section className={styles.formGroup}>
            <label htmlFor="language" className={styles.label}>
              Language
            </label>
            <CustomSelect
              options={languagesAvailable}
              value={language}
              onChange={(option) => setLanguage(option)}
              placeholder="Select a language"
            />
          </section>

          <section className={styles.formGroup}>
            <label htmlFor="project-state" className={styles.label}>
              Project State
            </label>
            <CustomSelect
              options={projectStates}
              value={projectState}
              onChange={(option) => setProjectState(option)}
              placeholder="Select the state"
            />
          </section>

          {/* Descripción */}
          <section className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className={styles.textArea}
              value={description}
              // defaultValue={type === 'edit' ? project.description : undefined}
              maxLength={maxLength}
              placeholder="Write a description of your project..."
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
            <div className={styles.counter}>
              {description.length}/{maxLength}
            </div>
          </section>
          <section className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>
              Content
            </label>
            <textarea
              id="content"
              name="content"
              className={styles.textArea}
              value={currentMarkdown}
              // defaultValue={type === 'edit' ? project.content : undefined}
              // defaultValue={type === 'edit' ? project.content : undefined}
              placeholder="Write a description of your project..."
              onChange={(e) => setCurrentMarkdown(e.target.value)}
              rows={30}
            />
            <div className={styles.counter}>
              <button
                className={styles.fullScreenBtn}
                onClick={() => setShowPreviewDialog(!showPreviewDialog)}
              >
                <Fullscreen />
              </button>
            </div>
          </section>

          <section className={styles.formGroup}>
            <button
              className={styles.saveBtn}
              onClick={type === 'edit' ? updateProject : saveProject}
              disabled={loading}
            >
              Save Project{' '}
              {loading && (
                <MotionLoader
                  size={20}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: 'linear',
                  }}
                  style={{ transformOrigin: 'center' }}
                />
              )}
            </button>
          </section>
        </div>
      </CustomScrollbar>
      <ResizableDialog
        showPreviewDialog={showPreviewDialog}
        setShowPreviewDialog={setShowPreviewDialog}
        currentMarkdown={currentMarkdown}
      />
    </>
  );
};

export default ProjectForm;
