import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

export default function RichEditor({ value, onChange, placeholder }) {
    return (
        <SimpleEditor
            content={value}
            onContentChange={onChange}
            placeholder={placeholder}
        />
    );
}