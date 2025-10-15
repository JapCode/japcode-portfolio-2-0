import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdown.module.css';

interface IMDRenderProps {
  content: string;
}

const MDRender = (props: IMDRenderProps) => {
  const { content } = props;
  return (
    <div className="markdown-body ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MDRender;
