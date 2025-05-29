import React, { useEffect, useState } from 'react';
import * as Quill from 'quill';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill';
import QuillCursors from 'quill-cursors';
import html2pdf from 'html2pdf.js';
import TurndownService from 'turndown';
import 'quill/dist/quill.snow.css';
import './App.css';
import './quill_snow.css';
import './code_mirror_css.css';

Quill.register('modules/cursors', QuillCursors);

function Editor({ match }) {
  const [quill, setQuill] = useState(null);
  const docId = match.params.id;

  useEffect(() => {
    const editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
        cursors: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
          ['clean']
        ],
        history: { userOnly: true }
      },
      placeholder: 'Start collaborating...'
    });
    setQuill(editor);

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(docId, ydoc);
    const ytext = ydoc.getText('quill');
    new QuillBinding(ytext, editor, provider.awareness);
  }, [docId]);

  const exportAsPDF = () => {
    const content = document.querySelector('#editor');
    html2pdf().from(content).save('document.pdf');
  };

  const exportAsMarkdown = () => {
    const editorHTML = document.querySelector('#editor').innerHTML;
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(editorHTML);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      <h2>Document ID: {docId}</h2>
      <div>
        <button onClick={exportAsPDF}>Export as PDF</button>
        <button onClick={exportAsMarkdown}>Export as Markdown</button>
      </div>
      <div id="editor" style={{ marginTop: '20px' }} />
    </div>
  );
}

export default Editor;