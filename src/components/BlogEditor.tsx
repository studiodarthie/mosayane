'use client';

import React, { useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function BlogEditor({ name, initialValue = '' }: { name: string, initialValue?: string }) {
  const editor = useRef(null);
  const [content, setContent] = useState(initialValue);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Commencez à écrire votre article...',
    height: 400,
    toolbarAdaptive: false,
    buttons: ['bold', 'italic', 'underline', 'strikethrough', '|', 'ul', 'ol', '|', 'outdent', 'indent', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'image', 'link', '|', 'align', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize']
  }), []);

  return (
    <div>
      <input type="hidden" name={name} value={content} />
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => {}}
      />
    </div>
  );
}
