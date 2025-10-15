'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Columns2, Scan, ScanEye } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CustomScrollbar } from '../../CustomScrollbar';
import Editor from '../../Editor';
import MDRender from '../../MDRender';
import './project-form.modules.css';

export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [],
    },
  ],
};

interface IEditContentFullPageProps {
  setFullPageEditor: Dispatch<SetStateAction<boolean>>;
}

const EditContentFullPage = (props: IEditContentFullPageProps) => {
  const { setFullPageEditor } = props;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState<string>('');
  const [pending, setPending] = useState(false);
  const [currentMarkdown, setCurrentMarkdown] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

  useEffect(() => {
    const name = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setSlug(name);
  }, [title]);

  async function handleSubmit() {
    // TODO: validate the data

    setPending(true);

    // const result = await createBlogAction({ title, slug, content });

    // if (result?.error) {
    //   toast.error(result.error);
    // }

    setPending(false);
  }
  return (
    <>
      <div className="editContentFullPage-container">
        <div className="editContentFullPage-preview-dialog-btn">
          <button onClick={() => setFullPageEditor(false)}>
            {showPreviewDialog ? 'Close Preview' : 'Open Preview'} <ScanEye />
          </button>
        </div>
        <div className="editContentFullPage-content">
          {/* Editor */}
          <motion.div
            className="editContentFullPage-editor-container"
            animate={{ flex: showPreview ? 0.7 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <CustomScrollbar height="calc(100vh - 2rem)">
              <Editor setMarkdown={setCurrentMarkdown} />
            </CustomScrollbar>
            <div className="editContentFullPage-actions-container">
              <button onClick={() => setShowPreviewDialog(!showPreviewDialog)}>
                {showPreviewDialog ? <Scan /> : <Columns2 />}
              </button>
            </div>
          </motion.div>

          {/* Preview */}
          {showPreview && (
            <motion.div
              className="editContentFullPage-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, flex: 0.29 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CustomScrollbar height="calc(100vh - 2rem)">
                <div
                  style={{
                    paddingInline: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <MDRender content={currentMarkdown} />
                </div>
              </CustomScrollbar>
            </motion.div>
          )}
        </div>
      </div>
      {showPreviewDialog && (
        <AnimatePresence>
          <motion.div
            className="editContentFullPage-preview-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="editContentFullPage-preview-dialog-content">
              <CustomScrollbar height="calc(100vh - 2rem)">
                <MDRender content={currentMarkdown} />
              </CustomScrollbar>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default EditContentFullPage;
