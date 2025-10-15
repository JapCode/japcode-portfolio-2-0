'use client';

import { CustomScrollbar } from '@/components/CustomScrollbar';
import CustomSelect, { Option } from '@/components/CustomSelect';
import Form from '@/components/Form';
import HandlerImageUpload from '@/components/HandlerImageUpload';
import ResizableDialog from '@/components/ProjectForm/resizeble-dialog';
import TagSelector from '@/components/ProjectForm/TagsSelector';
import { languagesAvailable, projectStates } from '@/constant';
import { TBlog } from '@/db/schema';
import { useServerAction } from '@/hook/useServerAction';
import {
  createArticle,
  IArticleDataSave,
  updateArticles,
} from '@/lib/actions/article';
import { TLanguage } from '@/types/globals';
import { Fullscreen } from 'lucide-react';
import { useEffect, useState } from 'react';

type ArticleFormProps =
  | {
      type: 'new';
      article?: TBlog;
    }
  | {
      type: 'edit';
      article: TBlog;
    };

function ArticleForm(props: ArticleFormProps) {
  const { type, article } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [language, setLanguage] = useState<Option | null>(null);
  const [currentMarkdown, setCurrentMarkdown] = useState<string>('');
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [projectState, setProjectState] = useState<Option | null>(null);
  const { execute: save, loading } = useServerAction({
    action: async (data: Partial<IArticleDataSave>) => {
      console.log('execute');
      if (type === 'edit' && article) {
        // For edit, pass article id and data
        await updateArticles(article.id, data);
      } else {
        // For new, pass data only
        if (!file) {
          return;
        }
        await createArticle(data as IArticleDataSave);
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
    if (type === 'edit' && article) {
      setTitle(article.title);
      setDescription(article.description);
      setCurrentMarkdown(article.content);
      setTags(article.tags);
      const language = languagesAvailable.find(
        (element) => element.value === article.language,
      );
      language && setLanguage(language);
      const state = projectStates.find(
        (element) => element.value === (article.enabled ? 'true' : 'false'),
      );
      state && setProjectState(state);
    }
  }, [type, article]);

  return (
    <>
      <CustomScrollbar height="calc(100dvh - 2rem)">
        <Form onSubmit={handlerSubmit}>
          <Form.Container>
            <Form.Section>
              <Form.Label>Thumbnail Image</Form.Label>
              <HandlerImageUpload
                onImageUpload={setFile}
                defaultImageUrl={type === 'edit' ? article.imageUrl : undefined}
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
              defaultTags={type === 'edit' ? article.tags : undefined}
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
              <Form.Label htmlId="project-state">Article State</Form.Label>
              <CustomSelect
                options={projectStates}
                value={projectState}
                onChange={(option) => setProjectState(option)}
                placeholder="Select the state"
              />
            </Form.Section>
            <Form.Textarea
              label="Description"
              id="description"
              value={description}
              maxLength={250}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the article"
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

export default ArticleForm;
