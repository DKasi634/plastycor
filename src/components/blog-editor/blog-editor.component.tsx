
import { Editor } from '@tinymce/tinymce-react';
import DomPurify from 'dompurify';

type BlogEditorProps = {
  onChange:(value:string) => void,
  initialContent?:string
}

const BlogEditor= ({onChange, initialContent=""}:BlogEditorProps) => {
  // const [blogContent, setBlogContent] = useState('');
  const handleEditorChange = (content: string) => {
    // setBlogContent(content);
    onChange(content)
  };

  return (
    <Editor
      apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}  // Optional: You can get a free key from TinyMCE
      initialValue={DomPurify.sanitize(initialContent) ||`<p></p>`}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
      }}
    
      onEditorChange={handleEditorChange}
    />
  );
};

export default BlogEditor;
