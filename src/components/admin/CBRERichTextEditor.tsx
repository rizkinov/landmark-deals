'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import { useCallback, useRef, useState, useEffect } from 'react'
import { uploadPropertyImage } from '../../lib/storage'
import * as CBRE from '../cbre'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface CBRERichTextEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
}

export function CBRERichTextEditor({
  content = '',
  onChange,
  placeholder = 'Start typing your content...',
  className = ''
}: CBRERichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the default list extensions since we're using custom ones
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc pl-4 space-y-1',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal pl-4 space-y-1',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'ml-2',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-cbre-green underline hover:text-accent-green',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    onFocus: () => {
      setIsFocused(true)
    },
    onBlur: () => {
      setIsFocused(false)
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[200px] w-full',
      },
    },
    // Fix SSR hydration mismatch
    immediatelyRender: false,
  })

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      try {
        editor.commands.setContent(content)
      } catch (error) {
        console.error('Error setting editor content:', error)
        // Fallback to clearing and setting content
        editor.commands.clearContent()
        editor.commands.setContent(content)
      }
    }
  }, [editor, content])

  // Format button component using CBRE styles
  const FormatButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false, 
    children, 
    title 
  }: { 
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
    title?: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-2 min-w-[36px] text-sm font-medium border-r border-t border-b first:border-l first:rounded-l-none last:rounded-r-none transition-colors
        ${isActive 
          ? 'bg-cbre-green border-cbre-green z-10 relative font-semibold' 
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={isActive ? { color: '#17E88F' } : {}}
      title={title}
    >
      {children}
    </button>
  )

  // Image upload handler
  const handleImageUpload = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const addImage = useCallback((url: string) => {
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setUploading(true)
      try {
        // Upload to Supabase storage for persistence
        const url = await uploadPropertyImage(file, `editor-${Date.now()}`)
        addImage(url)
      } catch (error) {
        console.error('Error uploading image:', error)
        // Fallback to data URL if upload fails
        const reader = new FileReader()
        reader.onload = (e) => {
          const url = e.target?.result as string
          addImage(url)
        }
        reader.readAsDataURL(file)
      } finally {
        setUploading(false)
      }
    }
  }, [addImage])

  const openLinkDialog = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    setLinkUrl(previousUrl || '')
    setLinkDialogOpen(true)
  }, [editor])

  const handleLinkSubmit = useCallback(() => {
    if (!linkUrl.trim()) {
      // Remove link if empty
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      // Add or update link
      editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
    }
    setLinkDialogOpen(false)
    setLinkUrl('')
  }, [editor, linkUrl])

  const handleLinkRemove = useCallback(() => {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    setLinkDialogOpen(false)
    setLinkUrl('')
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className={`border border-light-grey bg-white rounded-none ${className}`}>
      {/* Toolbar using CBRE components */}
      <div className="border-b border-light-grey p-3 bg-gray-50">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text formatting */}
          <div className="flex">
            <FormatButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              title="Bold"
            >
              <strong>B</strong>
            </FormatButton>
            <FormatButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              title="Italic"
            >
              <em>I</em>
            </FormatButton>
            <FormatButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              title="Strikethrough"
            >
              <s>S</s>
            </FormatButton>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Headings */}
          <div className="flex">
            <FormatButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              title="Heading 1"
            >
              H1
            </FormatButton>
            <FormatButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              title="Heading 2"
            >
              H2
            </FormatButton>
            <FormatButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              title="Heading 3"
            >
              H3
            </FormatButton>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Lists */}
          <div className="flex">
            <FormatButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              title="Bullet List"
            >
              ●
            </FormatButton>
            <FormatButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              title="Numbered List"
            >
              1.
            </FormatButton>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Alignment */}
          <div className="flex">
            <FormatButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
              title="Align Left"
            >
              <div className="flex flex-col items-start justify-center space-y-px text-xs leading-none h-4 w-4">
                <div className="w-4 h-px bg-current"></div>
                <div className="w-3 h-px bg-current"></div>
                <div className="w-4 h-px bg-current"></div>
                <div className="w-2 h-px bg-current"></div>
              </div>
            </FormatButton>
            <FormatButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
              title="Center"
            >
              <div className="flex flex-col items-center justify-center space-y-px text-xs leading-none h-4 w-4">
                <div className="w-4 h-px bg-current"></div>
                <div className="w-3 h-px bg-current"></div>
                <div className="w-4 h-px bg-current"></div>
                <div className="w-2 h-px bg-current"></div>
              </div>
            </FormatButton>
            <FormatButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
              title="Align Right"
            >
              <div className="flex flex-col items-end justify-center space-y-px text-xs leading-none h-4 w-4">
                <div className="w-4 h-px bg-current"></div>
                <div className="w-3 h-px bg-current"></div>
                <div className="w-4 h-px bg-current"></div>
                <div className="w-2 h-px bg-current"></div>
              </div>
            </FormatButton>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Link and Image */}
          <div className="flex">
            <FormatButton
              onClick={openLinkDialog}
              isActive={editor.isActive('link')}
              title="Add Link"
            >
              🔗
            </FormatButton>
            <FormatButton
              onClick={handleImageUpload}
              title={uploading ? "Uploading..." : "Add Image"}
              disabled={uploading}
            >
              {uploading ? '⏳' : '📷'}
            </FormatButton>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Clear formatting */}
          <FormatButton
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            title="Clear Formatting"
          >
            ✗
          </FormatButton>
        </div>
      </div>

      {/* Editor content */}
      <div className="relative min-h-[300px] p-4">
        <EditorContent 
          editor={editor}
          className="focus-within:outline-none min-h-[250px]"
        />
        {(!content || content === '' || content === '<p></p>') && !isFocused && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none font-calibre">
            {placeholder}
          </div>
        )}
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* CBRE branded styles for editor content */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 200px;
          padding: 0;
        }
        .ProseMirror h1 {
          font-family: var(--font-financier-display), serif;
          color: #003F2D;
          font-size: 2rem;
          font-weight: 700;
          margin: 0.75rem 0 0.5rem 0;
        }
        .ProseMirror h2 {
          font-family: var(--font-financier-display), serif;
          color: #003F2D;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0.6rem 0 0.4rem 0;
        }
        .ProseMirror h3 {
          font-family: var(--font-financier-display), serif;
          color: #003F2D;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.5rem 0 0.3rem 0;
        }
        .ProseMirror p {
          font-family: var(--font-calibre), sans-serif;
          color: #333;
          line-height: 1.6;
          margin: 0.25rem 0;
        }
        .ProseMirror p:first-child {
          margin-top: 0;
        }
        .ProseMirror ul {
          font-family: var(--font-calibre), sans-serif;
          color: #333;
          margin: 0.75rem 0;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .ProseMirror ol {
          font-family: var(--font-calibre), sans-serif;
          color: #333;
          margin: 0.75rem 0;
          padding-left: 1.5rem;
          list-style-type: decimal;
        }
        .ProseMirror ul li, .ProseMirror ol li {
          margin: 0.25rem 0;
          padding-left: 0.25rem;
        }
        .ProseMirror ul li::marker {
          color: #003F2D;
        }
        .ProseMirror ol li::marker {
          color: #003F2D;
          font-weight: 600;
        }
        .ProseMirror a {
          color: #003F2D;
          text-decoration: underline;
        }
        .ProseMirror a:hover {
          color: #17E88F;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0; /* CBRE style - no border radius */
          margin: 1rem 0;
        }
      `}</style>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-financier text-cbre-green">
              {editor?.isActive('link') ? 'Edit Link' : 'Add Link'}
            </DialogTitle>
            <DialogDescription className="font-calibre">
              Enter the URL for the link. Leave empty to remove the link.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-url" className="text-sm font-medium">
                URL
              </Label>
              <Input
                id="link-url"
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleLinkSubmit()
                  }
                }}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            {editor?.isActive('link') && (
              <CBRE.CBREButton
                variant="outline"
                onClick={handleLinkRemove}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Remove Link
              </CBRE.CBREButton>
            )}
            <DialogClose asChild>
              <CBRE.CBREButton variant="outline">
                Cancel
              </CBRE.CBREButton>
            </DialogClose>
            <CBRE.CBREButton
              variant="primary"
              onClick={handleLinkSubmit}
              disabled={!linkUrl.trim() && !editor?.isActive('link')}
            >
              {editor?.isActive('link') ? 'Update' : 'Add'} Link
            </CBRE.CBREButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}