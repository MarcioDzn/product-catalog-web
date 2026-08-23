import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Quote,
    Undo,
    Redo,
    Code
} from "lucide-react"

type Props = {
    value: string
    onChange: (value: string) => void
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null
    }

    const buttonClass = (isActive: boolean) =>
        `p-2 rounded-md transition-colors duration-200 ${
            isActive
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`

    return (
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={buttonClass(editor.isActive("bold"))}
                title="Negrito"
            >
                <Bold className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={buttonClass(editor.isActive("italic"))}
                title="Itálico"
            >
                <Italic className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={buttonClass(editor.isActive("strike"))}
                title="Tachado"
            >
                <Strikethrough className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={buttonClass(editor.isActive("code"))}
                title="Código"
            >
                <Code className="h-4 w-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-gray-300"></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={buttonClass(editor.isActive("heading", { level: 1 }))}
                title="Título 1"
            >
                <Heading1 className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={buttonClass(editor.isActive("heading", { level: 2 }))}
                title="Título 2"
            >
                <Heading2 className="h-4 w-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-gray-300"></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive("bulletList"))}
                title="Lista de Marcadores"
            >
                <List className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={buttonClass(editor.isActive("orderedList"))}
                title="Lista Numerada"
            >
                <ListOrdered className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={buttonClass(editor.isActive("blockquote"))}
                title="Citação"
            >
                <Quote className="h-4 w-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-gray-300"></div>

            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
                title="Desfazer"
            >
                <Undo className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
                title="Refazer"
            >
                <Redo className="h-4 w-4" />
            </button>
        </div>
    )
}

export default function RichTextEditor({ value, onChange }: Props) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] px-4 py-3 leading-snug prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0",
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    })

    return (
        <div className="overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}