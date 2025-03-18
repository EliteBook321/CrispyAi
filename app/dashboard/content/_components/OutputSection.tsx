"use client";
import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
 


interface Props {
    aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
    const editorRef = useRef<Editor | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            const editorInstance = editorRef.current.getInstance();
            editorInstance.setMarkdown(aiOutput);

            console.log("Generated HTML:", editorInstance.getHTML());
        }
    }, [aiOutput]);

    const handleCopy = async () => {
        // Ensure code runs only on the client-side
        if (typeof window === "undefined") return;
      
        if (editorRef.current) {
          const htmlText = editorRef.current.getInstance().getHTML(); // Get HTML content
          
          try {
            const blob = new Blob([htmlText], { type: "text/html" });
            const clipboardItem = new ClipboardItem({ "text/html": blob });
      
            await navigator.clipboard.write([clipboardItem]); // Write to clipboard
            
            alert("Copied with formatting!");
          } catch (err) {
            console.error("Failed to copy:", err);
            alert("Failed to copy. Please try again.");
          }
        }
      };
      
      
    

    return (
        <div className="bg-white shadow-lg border rounded-lg">
            <div className="flex justify-between items-center p-5">
                <h2 className="font-medium text-lg">Your Result</h2>
                <Button className="flex gap-2" onClick={handleCopy}>
                    <Copy className="w-4 h-4" /> Copy
                </Button>
            </div>
            <Editor
                ref={editorRef}
                initialValue="Your result will appear here"
                initialEditType="wysiwyg"
                 previewStyle="vertical"
                useCommandShortcut={true}
                height="600px"
            />
        </div>
    );
}

export default OutputSection;





