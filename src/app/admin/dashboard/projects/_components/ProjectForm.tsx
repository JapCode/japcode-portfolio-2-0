'use client';

import CalendarPicker from '@/components/CalendarPicker';
import { CustomScrollbar } from '@/components/CustomScrollbar';
import CustomSelect, { Option } from '@/components/CustomSelect';
import Form from '@/components/Form';
import HandlerImageUpload from '@/components/HandlerImageUpload';
import ResizableDialog from '@/components/ProjectForm/resizeble-dialog';
import TagSelector from '@/components/ProjectForm/TagsSelector';
import { languagesAvailable, projectStates } from '@/constant';
import { TProject } from '@/db/schema';
import { useServerAction } from '@/hook/useServerAction';
import {
  createProject,
  IProjectDataSave,
  updateProjects,
} from '@/lib/actions/projects';
import { TLanguage } from '@/types/globals';
import { Fullscreen } from 'lucide-react';
import { useEffect, useState } from 'react';

type ProjectFormProps =
  | {
      type: 'new';
      project?: TProject;
    }
  | {
      type: 'edit';
      project: TProject;
    };

function ProjectForm(props: ProjectFormProps) {
  const { type, project } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [language, setLanguage] = useState<Option | null>(null);
  const [currentMarkdown, setCurrentMarkdown] = useState<string>('');
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [projectState, setProjectState] = useState<Option | null>(null);
  const { execute: save, loading } = useServerAction({
    action: async (data: Partial<IProjectDataSave>) => {
      console.log('execute');
      if (type === 'edit' && project) {
        // For edit, pass project id and data
        await updateProjects(project.id, data);
      } else {
        // For new, pass data only
        if (!file) {
          return;
        }
        await createProject(data as IProjectDataSave);
      }
    },
    onSuccess: () => alert('Saved successfully!'),
  });

  const handlerSubmit = async () => {
    await save({
      title,
      description,
      tags,
      image: file != null ? file : undefined,
      language: language?.value as TLanguage,
      content: currentMarkdown,
      enabled: projectState?.value === 'true',
    });
  };

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
        <Form onSubmit={handlerSubmit}>
          <Form.Container>
            <Form.Section>
              <Form.Label>Thumbnail Image</Form.Label>
              <HandlerImageUpload
                onImageUpload={setFile}
                defaultImageUrl={type === 'edit' ? project.imageUrl : undefined}
              />
            </Form.Section>
            <Form.Section>
              <Form.Input
                label="Title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project title"
              />
            </Form.Section>

            <TagSelector
              callback={setTags}
              defaultTags={type === 'edit' ? project.tags : undefined}
            />
            <Form.Section>
              <Form.Label htmlId="language">Languages</Form.Label>
              <CustomSelect
                options={languagesAvailable}
                value={language}
                onChange={(option) => setLanguage(option)}
                placeholder="Select a language"
              />
            </Form.Section>
            <Form.Section>
              <Form.Label htmlId="project-state">project State</Form.Label>
              <CustomSelect
                options={projectStates}
                value={projectState}
                onChange={(option) => setProjectState(option)}
                placeholder="Select the state"
              />
            </Form.Section>
            <Form.Section>
              <CalendarPicker onChange={() => console.log('change')} />
            </Form.Section>
            <Form.Textarea
              label="Description"
              id="description"
              value={description}
              maxLength={250}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the project"
            />
            <Form.Section>
              <Form.TextareaWithButton
                label="Content"
                value={currentMarkdown}
                onChange={(e) => setCurrentMarkdown(e.target.value)}
                rows={30}
                onTogglePreview={() => setShowPreviewDialog(!showPreviewDialog)}
                icon={Fullscreen}
              />
            </Form.Section>
            <Form.Section>
              <Form.Button>Submit</Form.Button>
            </Form.Section>
          </Form.Container>
        </Form>
      </CustomScrollbar>
      <ResizableDialog
        showPreviewDialog={showPreviewDialog}
        setShowPreviewDialog={setShowPreviewDialog}
        currentMarkdown={currentMarkdown}
      />
    </>
  );
}

export default ProjectForm;
