/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ content, setContent }) => {
  return (
    <article css={defaultEditorStyle}>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          ckfinder: {
            // Upload the images to the server using the CKFinder QuickUpload command
            // You have to change this address to your server that has the ckfinder php connector
            uploadUrl: "/tmp/images",
          },
        }}
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </article>
  );
};

const defaultEditorStyle = css`
  overflow: hidden;
`;

export default Editor;
