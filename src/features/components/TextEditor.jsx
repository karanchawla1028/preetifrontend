import React, { useEffect, useRef, useState } from "react";

export default function TextEditor({
  value = "<p>Start typing...</p>",
  onChange,
}) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const [html, setHtml] = useState(value);
  const [showPreview, setShowPreview] = useState(true);

  // Crop modal state
  const [cropState, setCropState] = useState({
    open: false,
    src: null,
  });

  // Selection rectangle state inside modal
  const selRef = useRef({
    dragging: false,
    resizing: false,
    startX: 0,
    startY: 0,
    handle: null,
    rect: { left: 50, top: 50, width: 200, height: 150 }, // initial demo values
  });

  // Keep a reference to image dimensions in modal
  const modalImgRef = useRef({
    el: null,
    displayW: 0,
    displayH: 0,
    naturalW: 0,
    naturalH: 0,
  });

  // Initialize content
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = html;
    }
  }, []); // only once

  useEffect(() => {
    if (value !== html) {
      setHtml(value);
      if (editorRef.current) editorRef.current.innerHTML = value;
    }
  }, [value]);

  // keyboard shortcuts for undo/redo
  useEffect(() => {
    const keyHandler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        document.execCommand("undo");
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        document.execCommand("redo");
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, []);

  const updateHtmlState = () => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setHtml(newHtml);
      if (onChange) onChange(newHtml); // 🔥 give parent updated value
    }
  };

  // Generic execCommand wrapper
  const exec = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
    updateHtmlState();
    focusEditor();
  };

  const focusEditor = () => {
    editorRef.current && editorRef.current.focus();
  };

  // Insert table
  const insertTable = () => {
    const rows = parseInt(prompt("Rows", "2"), 10);
    const cols = parseInt(prompt("Cols", "2"), 10);
    if (!rows || !cols) return;
    let t = `<table class="ins-table">`;
    for (let r = 0; r < rows; r++) {
      t += "<tr>";
      for (let c = 0; c < cols; c++) t += "<td>Cell</td>";
      t += "</tr>";
    }
    t += "</table><p></p>";
    exec("insertHTML", t);
  };

  // Handle paste (images)
  const onPaste = (e) => {
    if (
      e.clipboardData &&
      e.clipboardData.files &&
      e.clipboardData.files.length
    ) {
      const file = e.clipboardData.files[0];
      if (file.type.startsWith("image/")) {
        e.preventDefault();
        openCropModalForFile(file);
      }
    }
  };

  // Open crop modal from file input
  const onFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    openCropModalForFile(file);
    e.target.value = "";
  };

  const openCropModalForFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCropState({ open: true, src: reader.result });
      // reset selection defaults when modal opens
      selRef.current.rect = { left: 30, top: 30, width: 200, height: 150 };
    };
    reader.readAsDataURL(file);
  };

  // Modal: when image loads, set display and natural sizes
  const onModalImgLoad = (imgEl) => {
    modalImgRef.current.el = imgEl;
    modalImgRef.current.displayW = imgEl.clientWidth;
    modalImgRef.current.displayH = imgEl.clientHeight;
    modalImgRef.current.naturalW = imgEl.naturalWidth;
    modalImgRef.current.naturalH = imgEl.naturalHeight;

    // ensure selection is within bounds
    const r = selRef.current.rect;
    if (r.left + r.width > modalImgRef.current.displayW) r.left = 10;
    if (r.top + r.height > modalImgRef.current.displayH) r.top = 10;
    selRef.current.rect = r;
  };

  // Mouse handlers for modal selection/resizing
  useEffect(() => {
    const onMove = (e) => {
      if (!cropState.open) return;
      const c = selRef.current;
      if (c.dragging) {
        const nx = e.clientX - c.startX;
        const ny = e.clientY - c.startY;
        // compute new left/top constrained to image bounds
        const imgRect = modalImgRef.current.el.getBoundingClientRect();
        let newLeft = c.rect.left + nx;
        let newTop = c.rect.top + ny;
        // limit
        newLeft = Math.max(
          0,
          Math.min(newLeft, modalImgRef.current.displayW - c.rect.width)
        );
        newTop = Math.max(
          0,
          Math.min(newTop, modalImgRef.current.displayH - c.rect.height)
        );
        c.startX = e.clientX;
        c.startY = e.clientY;
        c.rect.left = newLeft;
        c.rect.top = newTop;
        // trigger re-render by setting state (we'll use a tiny hack: update a dummy state)
        setCropState((s) => ({ ...s }));
      } else if (c.resizing) {
        // handle resizing by which handle is active
        const handle = c.handle; // e.g. 'br','tl','tr','bl','t','b','l','r'
        const imgRect = modalImgRef.current.el.getBoundingClientRect();
        // compute mouse position relative to image
        const px = e.clientX - imgRect.left;
        const py = e.clientY - imgRect.top;
        let r = c.rect;
        // Based on handle update r
        if (handle.includes("r")) {
          const maxW = modalImgRef.current.displayW - r.left;
          r.width = Math.max(10, Math.min(maxW, px - r.left));
        }
        if (handle.includes("l")) {
          const newLeft = Math.max(0, Math.min(r.left + r.width - 10, px));
          r.width = r.width + (r.left - newLeft);
          r.left = newLeft;
        }
        if (handle.includes("b")) {
          const maxH = modalImgRef.current.displayH - r.top;
          r.height = Math.max(10, Math.min(maxH, py - r.top));
        }
        if (handle.includes("t")) {
          const newTop = Math.max(0, Math.min(r.top + r.height - 10, py));
          r.height = r.height + (r.top - newTop);
          r.top = newTop;
        }
        selRef.current.rect = r;
        setCropState((s) => ({ ...s }));
      }
    };

    const onUp = () => {
      selRef.current.dragging = false;
      selRef.current.resizing = false;
      selRef.current.handle = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [cropState.open]);

  // Start dragging selection
  const startDrag = (e) => {
    e.preventDefault();
    selRef.current.dragging = true;
    selRef.current.startX = e.clientX;
    selRef.current.startY = e.clientY;
  };

  // Start resizing via handleName
  const startResize = (e, handleName) => {
    e.preventDefault();
    e.stopPropagation();
    selRef.current.resizing = true;
    selRef.current.handle = handleName; // 'tl','tr','bl','br','t','b','l','r'
  };

  // Confirm crop: compute relative to natural image and draw to canvas, insert to editor
  const confirmCrop = () => {
    const img = modalImgRef.current.el;
    const r = selRef.current.rect;
    // scale factors
    const sx = modalImgRef.current.naturalW / modalImgRef.current.displayW;
    const sy = modalImgRef.current.naturalH / modalImgRef.current.displayH;
    const cropX = Math.round(r.left * sx);
    const cropY = Math.round(r.top * sy);
    const cropW = Math.round(r.width * sx);
    const cropH = Math.round(r.height * sy);
    // draw to canvas
    const c = document.createElement("canvas");
    c.width = cropW;
    c.height = cropH;
    const ctx = c.getContext("2d");
    const imgEl = modalImgRef.current.el;
    // draw using natural size
    const tmpImg = new Image();
    tmpImg.onload = () => {
      ctx.drawImage(tmpImg, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
      const dataUrl = c.toDataURL("image/png");
      insertResizbleImage(dataUrl, Math.min(500, cropW)); // insert with width px
      // close modal
      setCropState({ open: false, src: null });
    };
    tmpImg.src = modalImgRef.current.el.src; // use original dataURL
  };

  // Insert wrapper with resizers into editor
  const insertResizbleImage = (dataUrl, initialWidthPx = 300) => {
    // create wrapper HTML
    // wrapper is contenteditable=false to avoid messing editor caret when interacting
    const wrapperHtml = `
      <div class="resizable-img" contenteditable="false" style="width:${initialWidthPx}px;">
        <img src="${dataUrl}" draggable="false" />
        <div class="resizers">
          <div class="resizer tl" data-h="tl"></div>
          <div class="resizer tr" data-h="tr"></div>
          <div class="resizer bl" data-h="bl"></div>
          <div class="resizer br" data-h="br"></div>
        </div>
      </div>
      <p></p>
    `;
    exec("insertHTML", wrapperHtml);
    // after insertion, attach handlers to the latest inserted wrapper
    // delay a tick to let DOM update
    setTimeout(() => {
      const wrappers = editorRef.current.querySelectorAll(".resizable-img");
      const last = wrappers[wrappers.length - 1];
      if (last) attachResizerHandlers(last);
      updateHtmlState();
    }, 50);
  };

  // Attach resizer drag handlers for a wrapper element
  const attachResizerHandlers = (wrapper) => {
    const img = wrapper.querySelector("img");
    const resizers = wrapper.querySelectorAll(".resizer");
    let startW = 0;
    let startH = 0;
    let startX = 0;
    let startY = 0;
    let currentHandle = null;

    const onDown = (e) => {
      e.preventDefault();
      currentHandle = e.target.dataset.h;
      startW = wrapper.clientWidth;
      startH = img.clientHeight;
      startX = e.clientX;
      startY = e.clientY;
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    };

    const onMove = (ev) => {
      ev.preventDefault();
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      let newW = startW;
      let newH = startH;
      // Based on handle, adjust width/height and keep aspect ratio if corner
      const aspect = img.naturalWidth / img.naturalHeight;
      if (currentHandle === "br") {
        newW = Math.max(30, startW + dx);
        newH = Math.max(30, Math.round(newW / aspect));
      } else if (currentHandle === "bl") {
        newW = Math.max(30, startW - dx);
        newH = Math.max(30, Math.round(newW / aspect));
      } else if (currentHandle === "tr") {
        newW = Math.max(30, startW + dx);
        newH = Math.max(30, Math.round(newW / aspect));
      } else if (currentHandle === "tl") {
        newW = Math.max(30, startW - dx);
        newH = Math.max(30, Math.round(newW / aspect));
      }
      wrapper.style.width = newW + "px";
      img.style.width = "100%";
      updateHtmlState();
    };

    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      currentHandle = null;
    };

    resizers.forEach((r) => r.addEventListener("pointerdown", onDown));
    // cleanup: add a small storage on wrapper to allow removal if needed
    wrapper.__cleanup = () =>
      resizers.forEach((r) => r.removeEventListener("pointerdown", onDown));
  };

  // When editor loads or content changes, ensure any existing wrappers get handlers
  useEffect(() => {
    const node = editorRef.current;
    if (!node) return;
    const wrappers = node.querySelectorAll(".resizable-img");
    wrappers.forEach((w) => {
      if (!w.__cleanup) attachResizerHandlers(w);
    });
  }, [html]);

  // Image position helpers (left / right / center)
  const setImagePosition = (pos) => {
    // find last selected wrapper near caret or last image
    const sel = document.getSelection();
    let wrapper = null;
    if (sel && sel.anchorNode) {
      let node =
        sel.anchorNode.nodeType === 3
          ? sel.anchorNode.parentElement
          : sel.anchorNode;
      // search upwards for .resizable-img or img
      while (node && node !== editorRef.current) {
        if (node.classList && node.classList.contains("resizable-img")) {
          wrapper = node;
          break;
        }
        if (node.tagName === "IMG") {
          // if inside wrapper, find wrapper parent
          if (
            node.parentElement &&
            node.parentElement.classList.contains("resizable-img")
          ) {
            wrapper = node.parentElement;
            break;
          }
        }
        node = node.parentElement;
      }
    }
    // fallback: last wrapper
    if (!wrapper) {
      const all = editorRef.current.querySelectorAll(".resizable-img");
      wrapper = all[all.length - 1];
    }
    if (!wrapper)
      return alert("Select or place cursor near an image to set position.");
    if (pos === "left") {
      wrapper.style.float = "left";
      wrapper.style.margin = "0 12px 12px 0";
    } else if (pos === "right") {
      wrapper.style.float = "right";
      wrapper.style.margin = "0 0 12px 12px";
    } else if (pos === "center") {
      wrapper.style.float = "none";
      wrapper.style.margin = "0 auto 12px auto";
      wrapper.style.display = "block";
    }
    updateHtmlState();
  };

  // Cancel modal
  const cancelCrop = () => {
    setCropState({ open: false, src: null });
  };

  return (
    <div className="editor-final-wrapper">
      <div className="toolbar toolbar-bordered">
        <select
          onChange={(e) => exec("fontName", e.target.value)}
          className="tool-select"
        >
          <option value="">Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </select>

        <select
          onChange={(e) => exec("fontSize", e.target.value)}
          className="tool-select"
        >
          <option value="">Size</option>
          <option value="1">8px</option>
          <option value="2">10px</option>
          <option value="3">12px</option>
          <option value="4">14px</option>
          <option value="5">18px</option>
          <option value="6">24px</option>
          <option value="7">32px</option>
        </select>

        <input
          type="number"
          placeholder="Custom px"
          className="font-input"
          onChange={(e) => {
            const px = e.target.value;
            if (!px) return;
            exec("fontSize", 7);
            const fonts = editorRef.current.querySelectorAll("font[size='7']");
            fonts.forEach((f) => (f.style.fontSize = px + "px"));
          }}
        />

        <input
          type="color"
          className="color-picker"
          title="Text color"
          onChange={(e) => exec("foreColor", e.target.value)}
        />
        <input
          type="color"
          className="color-picker"
          title="Highlight"
          onChange={(e) => exec("hiliteColor", e.target.value)}
        />

        <button type="button" className="tool-btn" onClick={() => exec("bold")}>
          <b>B</b>
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={() => exec("italic")}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={() => exec("underline")}
        >
          <u>U</u>
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={() => exec("strikeThrough")}
        >
          <s>S</s>
        </button>

        <button
          type="button"
          className="tool-btn"
          onClick={() => exec("justifyLeft")}
        >
          Left
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={() => exec("justifyCenter")}
        >
          Center
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={() => exec("justifyRight")}
        >
          Right
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={() => exec("justifyFull")}
        >
          Justify
        </button>

        <button
          type="button"
          className="tool-btn"
          onClick={() => exec("insertUnorderedList")}
        >
          • List
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={() => exec("insertOrderedList")}
        >
          1. List
        </button>

        <button type="button" className="tool-btn" onClick={insertTable}>
          Table
        </button>

        <button type="button" className="tool-btn" onClick={() => exec("undo")}>
          Undo
        </button>
        <button type="button" className="tool-btn" onClick={() => exec("redo")}>
          Redo
        </button>

        <label className="tool-btn image-label">
          Image
          <input type="file" accept="image/*" onChange={onFileInput} />
        </label>

        <input
          className="font-input"
          placeholder="img width px"
          type="number"
          onChange={(e) => {
            const v = e.target.value;
            if (!v) return;
            // set width to last inserted or selected wrapper
            const sel = document.getSelection();
            let wrapper = null;
            if (sel && sel.anchorNode) {
              let node =
                sel.anchorNode.nodeType === 3
                  ? sel.anchorNode.parentElement
                  : sel.anchorNode;
              while (node && node !== editorRef.current) {
                if (
                  node.classList &&
                  node.classList.contains("resizable-img")
                ) {
                  wrapper = node;
                  break;
                }
                node = node.parentElement;
              }
            }
            if (!wrapper) {
              const all = editorRef.current.querySelectorAll(".resizable-img");
              wrapper = all[all.length - 1];
            }
            if (!wrapper)
              return alert("Place cursor near image or select it first.");
            wrapper.style.width = v + "px";
            wrapper.querySelector("img").style.width = "100%";
            updateHtmlState();
          }}
        />

        <button
          type="button"
          className="tool-btn"
          onClick={() => setImagePosition("left")}
        >
          Img Left
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={() => setImagePosition("right")}
        >
          Img Right
        </button>
        <button
          type="button"
          className="tool-btn"
          onClick={() => setImagePosition("center")}
        >
          Img Center
        </button>

        <button
          type="button"
          className="tool-btn"
          onClick={() => exec("removeFormat")}
        >
          Clear
        </button>
        {/* <button className="tool-btn" onClick={() => setShowPreview(s => !s)}>{showPreview ? "Hide Preview" : "Show Preview"}</button> */}
      </div>

      <div
        className="editor editor-bordered"
        contentEditable
        ref={editorRef}
        suppressContentEditableWarning
        // onInput={(e) => setHtml(e.target.innerHTML)}
        onInput={() => updateHtmlState()}
        onPaste={onPaste}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      {/* {showPreview && (
        <>
          <h3 className="preview-title">Preview</h3>
          <div className="preview preview-bordered" dangerouslySetInnerHTML={{ __html: html }} />
        </>
      )} */}

      {/* Crop Modal */}
      {cropState.open && (
        <CropModal
          src={cropState.src}
          onClose={cancelCrop}
          onImgLoad={(imgEl) => onModalImgLoad(imgEl)}
          onConfirm={confirmCrop}
          rectRef={selRef}
        />
      )}
    </div>
  );
}

/* CropModal component (draggable + resizable selection rectangle) */
function CropModal({ src, onClose, onImgLoad, onConfirm, rectRef }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const imgEl = imgRef.current;
    if (!imgEl) return;
    const onLoad = () => {
      onImgLoad(imgEl);
    };
    imgEl.addEventListener("load", onLoad);
    return () => imgEl.removeEventListener("load", onLoad);
  }, [src, onImgLoad]);

  // helper to get rect
  const getRect = () => rectRef.current.rect;

  // start drag
  const onMouseDownSelect = (e) => {
    e.preventDefault();
    rectRef.current.dragging = true;
    rectRef.current.startX = e.clientX;
    rectRef.current.startY = e.clientY;
  };

  // Handle pointer down on resizer
  const onHandleDown = (e, handle) => {
    e.preventDefault();
    e.stopPropagation();
    rectRef.current.resizing = true;
    rectRef.current.handle = handle;
  };

  // Render resizers and selection box coordinates based on rectRef.current.rect
  const rect = getRect();

  return (
    <div className="crop-overlay">
      <div className="crop-modal">
        <div className="crop-header">
          <div>Crop image — drag to select</div>
          <div>
            <button type="button" className="tool-btn small" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="tool-btn small"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>

        <div className="crop-area">
          <img ref={imgRef} src={src} alt="to crop" className="crop-image" />
          {/* selection rectangle */}
          <div
            className="sel-rect"
            style={{
              left: rect.left + "px",
              top: rect.top + "px",
              width: rect.width + "px",
              height: rect.height + "px",
            }}
            onPointerDown={onMouseDownSelect}
          >
            {/* small square handles (Option A) */}
            <div
              className="handle tl"
              onPointerDown={(e) => onHandleDown(e, "tl")}
            ></div>
            <div
              className="handle tr"
              onPointerDown={(e) => onHandleDown(e, "tr")}
            ></div>
            <div
              className="handle bl"
              onPointerDown={(e) => onHandleDown(e, "bl")}
            ></div>
            <div
              className="handle br"
              onPointerDown={(e) => onHandleDown(e, "br")}
            ></div>
            <div
              className="handle t"
              onPointerDown={(e) => onHandleDown(e, "t")}
            ></div>
            <div
              className="handle b"
              onPointerDown={(e) => onHandleDown(e, "b")}
            ></div>
            <div
              className="handle l"
              onPointerDown={(e) => onHandleDown(e, "l")}
            ></div>
            <div
              className="handle r"
              onPointerDown={(e) => onHandleDown(e, "r")}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
