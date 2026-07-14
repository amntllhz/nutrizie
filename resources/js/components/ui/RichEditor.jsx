import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

export default function RichEditor({ value, onChange, placeholder }) {
    return (
        <div className="panel-editor">
            <SimpleEditor
                content={value}
                onContentChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}