
import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";
import axios from "axios";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../PageComponents/header";
import Footer from "../PageComponents/footer";
import Sidebar from "../PageComponents/sidebar";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
} from "lucide-react";



const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}px`,
              };
            },
            parseHTML: element => ({
              fontSize: element.style.fontSize?.replace("px", ""),
            }),
          },
        },
      },
    ];
  },
});

function Journal() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-[764px] p-4 bg-white rounded-b-md outline-none text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-200",
        placeholder: "Type here...",
      },
    },
  });
  
  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      alert("You must be logged in to submit a journal.");
      return;
    }

    const content = editor?.getHTML();
    if (isChecked && content?.trim()) {
      try {
        const response = await axios.post(`${baseURL}/journal`, {
          content: content,
          email: user.email,
        });
        console.log(response.data);
        navigate("/ViewJournal");
      } catch (err) {
        console.error(err);
        alert("Failed to submit journal.");
      }
    } else {
      alert("Please agree to the terms and write something.");
    }
  };


  useEffect(() => {
    const checkTodayEntry = async () => {
      const user = auth.currentUser;
      if (!user?.email) return;

      try {
        const response = await axios.get(`${baseURL}/journal/today`);
        if (response.status === 200 && response.data?.content) {
          navigate("/ViewJournal");
        }
      } catch (err) {
        if (err.response?.status !== 204) {
          console.error("Error checking for today's entry:", err);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, () => {
      checkTodayEntry();
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"
        } bg-[#FAFAFF] min-h-screen`}
      >
        <Header isExpanded={isSidebarExpanded} />
        <div className="p-6 mt-10 mx-20 mt-[100px]">
          {/* Editor */}
          {editor && (
            <div className="border border-gray-300 rounded-md bg-[#f9f9fc] shadow-sm">
              <div className="flex flex-wrap items-center gap-2 px-4 py-4 border-b text-gray-600">
                <button onClick={() => editor.chain().focus().toggleBold().run()}>
                  <Bold size={25} />
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                  <Italic size={25} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <UnderlineIcon size={25} />
                </button>
                {/* Font Size Controls */}
                <div className="flex items-center space-x-2 ml-2">
                  <button
                    onClick={() => {
                      const newSize = Math.max(10, fontSize - 1);
                      setFontSize(newSize);
                      editor
                        .chain()
                        .focus()
                        .setMark("textStyle", { fontSize: newSize })
                        .run();
                    }}
                    className="text-xl"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={fontSize}
                    readOnly
                    className="w-10 h-7 text-center rounded bg-gray-100 border text-sm"
                  />
                  <button
                    onClick={() => {
                      const newSize = fontSize + 1;
                      setFontSize(newSize);
                      editor
                        .chain()
                        .focus()
                        .setMark("textStyle", { fontSize: newSize })
                        .run();
                    }}
                    className="text-xl"
                  >
                    +
                  </button>
                </div>
                <span className="mx-2">|</span>
                <button
                  onClick={() => editor.chain().focus().setTextAlign("left").run()}
                >
                  <AlignLeft size={25} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                >
                  <AlignCenter size={25} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                >
                  <AlignRight size={25} />
                </button>
                <span className="mx-2">|</span>
                <button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List size={25} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered size={25} />
                </button>
                <span className="mx-2">|</span>
                <button onClick={() => editor.chain().focus().undo().run()}>
                  <Undo size={25} />
                </button>
                <button onClick={() => editor.chain().focus().redo().run()}>
                  <Redo size={25} />
                </button>

                
              </div>

              <EditorContent editor={editor} />
            </div>
          )}

          {/* Checkbox */}
          <div className="flex items-center mt-6 space-x-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="h-4 w-4"
            />
            <label className="text-gray-600 text-[25px]">
              You agree to submit this entry. Once submitted, the entry cannot be edited.
            </label>
          </div>

          {/* Submit button */}
          <button
            className="text-[28px] mt-6 px-6 py-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!isChecked || !editor?.getText().trim()}
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Journal;
