import type { ToolText } from "./translations";

const tools: Record<string, ToolText> = {
  "comprimir-pdf": {
    slug: "compress-pdf",
    name: "Compress PDF",
    h1: "Compress a PDF and reduce its size",
    tagline: "Shrink your PDF by choosing the exact balance between size and quality.",
    seoTitle: "Compress PDF online free and reduce size | BreadPDF",
    seoDescription:
      "Reduce PDF file size directly in your browser with four compression modes and size comparison. Fast, private, and no files uploaded to servers.",
    ctaLabel: "Compress PDF",
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf"],
    howItWorks: [
      "Pick the PDF you want to shrink.",
      "Choose a level: lossless, light, balanced or maximum.",
      "Compare the before and after size and download the result.",
    ],
    faq: [
      {
        q: "Does compressing a PDF degrade visual quality?",
        a: "It depends on the chosen mode. In 'Lossless' mode, nothing is recompressed: internal PDF structures are streamlined while text and vectors remain untouched. In Light, Balanced, and Strong modes, pages are rendered as images with optimized resolution to achieve substantial file size reduction.",
      },
      {
        q: "What is the difference between the four compression levels?",
        a: "'Lossless' preserves selectable text and the native structure; 'Light' provides modest size reduction with maximum visual fidelity; 'Balanced' is the recommended setting for general email sharing; and 'Strong' achieves the smallest possible size for platforms with strict upload limits.",
      },
      {
        q: "What happens if the compressed file ends up larger than the original?",
        a: "BreadPDF incorporates an automatic safeguard: if image-based compression would yield a larger file (common with pure text PDFs), the system discards the increase and applies structural lossless optimization to ensure your file never gains weight.",
      },
      {
        q: "Can I check how much file size was saved before downloading?",
        a: "Yes. Once processing finishes, BreadPDF displays the original size, the final generated size, and the exact percentage of space saved so you can review the result before saving.",
      },
      {
        q: "Can text still be selected and copied after balanced or strong compression?",
        a: "In Light, Balanced, and Strong modes, pages are processed as optimized images, which flattens selectable text. If you need text to remain copyable or searchable with Ctrl+F, always select 'Lossless' mode.",
      },
      {
        q: "Are my files uploaded to an external server?",
        a: "No. All PDF compression and page processing runs locally in your browser memory via JavaScript. Confidential documents never leave your computer or phone.",
      },
    ],
    options: {
      level: {
        label: "Compression level",
        help: "Lossless keeps text selectable; the other levels rasterise the pages.",
        choices: {
          balanced: "Balanced — recommended",
          target_2mb: "Target ≤ 2 MB (Resume, job portals)",
          target_5mb: "Target ≤ 5 MB (Moodle, Campus Virtual)",
          target_10mb: "Target ≤ 10 MB (Legal filing, government)",
          lossless: "Lossless — restructure without rasterizing",
          light: "Light — highest visual clarity",
          strong: "Maximum — extreme reduction",
        },
      },
    },
  },
  "unir-pdf": {
    slug: "merge-pdf",
    name: "Merge PDF",
    h1: "Merge several PDFs into one document",
    tagline: "Combine files in any order and download a single PDF.",
    seoTitle: "Merge PDF online, in your own order | BreadPDF",
    seoDescription:
      "Combine two or more PDFs into one document, reorder the files before processing and download the result instantly from your browser.",
    ctaLabel: "Merge PDF",
    keywords: ["merge pdf", "combine pdf", "join pdf"],
    howItWorks: [
      "Add the PDFs you want to combine.",
      "Reorder them with the arrows in the list.",
      "Download the final document.",
    ],
    faq: [
      {
        q: "How many files can I merge at once?",
        a: "There is no artificial limit in the tool. Merging runs entirely inside your device's browser memory, so you can join two or dozens of documents as long as your system has sufficient RAM available.",
      },
      {
        q: "How do I control the order of the merged documents?",
        a: "In the file list you can drag or use the arrows to arrange documents in your exact preferred sequence before clicking 'Merge PDF'. The final document strictly follows that order from top to bottom.",
      },
      {
        q: "Are links, hyperlinks, and selectable text preserved?",
        a: "Yes. Pages are imported vectorially with their native objects, embedded fonts, and layer structures intact, keeping text sharp, selectable, and high-fidelity without forced degradation.",
      },
      {
        q: "Can I merge PDF files with different page sizes (A4, Letter, Landscape)?",
        a: "Yes. Each added page retains its original dimensions and orientation (portrait or landscape) within the combined final document.",
      },
      {
        q: "What filename will the downloaded merged PDF have?",
        a: "By default, the unified file is named 'breadpdf-documento-unido.pdf', ready to be saved in your downloads folder or renamed on your machine.",
      },
      {
        q: "Are my documents uploaded to an external server?",
        a: "No. Merging runs 100% locally in your browser using JavaScript. Files are never transmitted over the internet nor stored in the cloud.",
      },
    ],
  },
  "dividir-pdf": {
    slug: "split-pdf",
    name: "Split PDF",
    h1: "Split a PDF into several documents",
    tagline: "Split page by page or by custom page ranges you define.",
    seoTitle: "Split PDF online by pages or ranges | BreadPDF",
    seoDescription:
      "Split a PDF into separate documents: one page per file or custom ranges like 1-3, 4-8. Everything runs in your browser with no sign-up.",
    ctaLabel: "Split PDF",
    keywords: ["split pdf", "separate pdf", "cut pdf"],
    howItWorks: [
      "Upload the PDF you want to split.",
      "Choose to extract every page or enter custom ranges.",
      "Download the generated documents.",
    ],
    faq: [
      {
        q: "How do I specify page intervals or custom ranges?",
        a: "In custom ranges mode, type page numbers or ranges separated by commas (for example: '1-3, 4, 5-9'). Each interval creates a distinct PDF document containing those exact pages.",
      },
      {
        q: "Can I split the PDF into one separate file for each page?",
        a: "Yes. Select 'One page per file' in the mode selector. If your PDF has 10 pages, you will receive 10 individual, sequentially numbered PDF files.",
      },
      {
        q: "How are the split PDF files named?",
        a: "Each downloaded file takes the original document's base name and appends the page number or range (for example: 'document-pagina-1.pdf' or 'document-1-3.pdf').",
      },
      {
        q: "Is my original uploaded PDF file modified or replaced?",
        a: "Not at all. Your original file remains untouched on your device; the tool only creates and saves new copies of the designated pages.",
      },
      {
        q: "Is visual quality or text selectability lost when splitting?",
        a: "No. Splitting directly copies the native vector content and streams from each page, preserving fonts, images, text, and vector graphics at 100% original fidelity.",
      },
      {
        q: "Are my documents sent to remote servers for splitting?",
        a: "No. The entire page separation and packaging process takes place locally and privately inside your browser. No file data is uploaded to remote servers.",
      },
    ],
    options: {
      mode: { label: "Mode", choices: { each: "One page per file", ranges: "Custom ranges" } },
      ranges: { label: "Ranges", help: "Only used in ranges mode. Example: 1-3, 4, 5-9" },
    },
  },
  "pdf-a-jpg": {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    h1: "Convert PDF to JPG",
    tagline: "Every page of your PDF becomes a sharp JPG image.",
    seoTitle: "Convert PDF to JPG with adjustable quality | BreadPDF",
    seoDescription:
      "Turn the pages of a PDF into JPG images, choosing resolution and quality. Everything happens in your browser, with no upload.",
    ctaLabel: "Convert to JPG",
    keywords: ["pdf to jpg", "pdf to image", "convert pdf to jpg"],
    howItWorks: [
      "Upload your PDF.",
      "Adjust resolution and quality if you need to.",
      "Download the images one by one.",
    ],
    faq: [
      {
        q: "How do I convert a PDF into JPG images?",
        a: "Select your PDF file, choose your preferred resolution scale and JPG quality sliders if desired, then click 'Convert to JPG'. Each page will render and produce an individual downloadable image.",
      },
      {
        q: "Are all pages of the document converted?",
        a: "Yes. The converter automatically iterates through every page of the PDF from start to finish, generating a numbered JPG file for each one.",
      },
      {
        q: "What do the resolution and quality settings adjust?",
        a: "'Resolution' applies a rendering multiplier to page dimensions (from 1x up to 4x for extreme sharpness), while 'JPG quality' adjusts image compression (40% to 100%) to balance crispness with compact file size.",
      },
      {
        q: "What happens to the PDF text, fonts, and graphics?",
        a: "The rendering engine draws every visible element exactly as laid out, consolidating vector text, illustrations, and photos into a high-definition JPG image.",
      },
      {
        q: "Can I download converted pages individually?",
        a: "Yes. Each converted page outputs its own file bearing the original PDF name plus the page number (for example: 'document-01.jpg', 'document-02.jpg').",
      },
      {
        q: "Are my files uploaded to external servers during conversion?",
        a: "No. The entire image rendering process is executed 100% locally in your web browser engine. Your document contents are never transmitted across the network.",
      },
    ],
    options: {
      scale: { label: "Resolution", help: "Multiplier over the original page size." },
      quality: { label: "JPG quality" },
    },
  },
  "jpg-a-pdf": {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    h1: "Convert JPG to PDF",
    tagline: "Turn your images into a tidy PDF that's ready to send.",
    seoTitle: "Convert JPG to PDF online in A4 or custom fit | BreadPDF",
    seoDescription:
      "Convert JPG or PNG images into a single PDF document, choosing A4 with margins or fit to photo. Reorder images directly in your browser.",
    ctaLabel: "Create PDF",
    keywords: ["jpg to pdf", "image to pdf", "png to pdf"],
    howItWorks: [
      "Add your JPG or PNG images.",
      "Reorder them and pick the page size.",
      "Download the resulting PDF.",
    ],
    faq: [
      {
        q: "Can I add multiple images at once?",
        a: "Yes. You can select and upload as many images as you need in a single batch to combine them into one comprehensive PDF document.",
      },
      {
        q: "Can I mix JPG and PNG image formats together?",
        a: "Yes. The tool natively supports both JPEG/JPG and PNG files, allowing you to combine different image types freely into the same resulting PDF.",
      },
      {
        q: "How do I organize the order of photos in the PDF?",
        a: "In the preview list, drag or use the arrow controls to arrange photos in your desired sequence. The topmost image will become page 1 of your PDF.",
      },
      {
        q: "What is the difference between 'A4 with margins' and 'Fit to image'?",
        a: "'A4 with margins' proportionally scales each photo onto a standard A4 page with a clean border, ideal for printing. 'Fit to image' sets each page dimensions to the exact pixel size of the image.",
      },
      {
        q: "Can I convert images with different sizes or aspect ratios?",
        a: "Yes. When choosing A4, each image fits proportionally without distortion. In 'Fit to image' mode, each individual page adopts the respective dimensions of each photo.",
      },
      {
        q: "Are my photos uploaded to the cloud or external servers?",
        a: "No. All image embedding and PDF generation runs 100% client-side in your browser via JavaScript. Private photos never leave your device.",
      },
    ],
    options: {
      pageSize: {
        label: "Page size",
        choices: { a4: "A4 with margins", image: "Fit to the image" },
      },
    },
  },
  "rotar-pdf": {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    h1: "Rotate pages in a PDF",
    tagline: "Rotate the whole document or only the pages you list.",
    seoTitle: "Rotate PDF online and save the rotation | BreadPDF",
    seoDescription:
      "Rotate PDF pages by 90, 180 or 270 degrees, across the whole document or on specific pages, and save the result permanently.",
    ctaLabel: "Rotate PDF",
    keywords: ["rotate pdf", "turn pdf pages", "flip pdf"],
    howItWorks: [
      "Upload the PDF.",
      "Choose the rotation and the pages.",
      "Download the rotated PDF.",
    ],
    faq: [
      {
        q: "Is the rotation saved permanently in the file?",
        a: "Yes. The rotation angle is written directly into the PDF page dictionary metadata. When opened in Adobe Acrobat, a browser, or any viewer, it appears permanently rotated.",
      },
      {
        q: "Can I rotate only specific pages or ranges?",
        a: "Yes. In the 'Pages' field you can list individual page numbers or ranges separated by commas (for example: '1, 3-5'). Leaving it empty rotates all pages in the PDF.",
      },
      {
        q: "Which rotation angles are supported?",
        a: "You can rotate pages 90° clockwise, 180° (for upside-down pages), or 90° counter-clockwise (270°).",
      },
      {
        q: "Does rotating modify or recompress document content?",
        a: "No. Rotation only changes the geometric orientation flag of the selected pages. Text, embedded fonts, vectors, and photos remain at their exact original quality.",
      },
      {
        q: "What will the downloaded rotated file be named?",
        a: "The file downloads automatically keeping the original name with a '-rotado.pdf' suffix so you don't accidentally overwrite your source file.",
      },
      {
        q: "Does rotation happen locally in my browser?",
        a: "Yes. All processing executes 100% client-side on your device using JavaScript. Your file is never uploaded to remote servers.",
      },
    ],
    options: {
      angle: {
        label: "Rotation",
        choices: { "90": "90° clockwise", "180": "180°", "270": "90° counter-clockwise" },
      },
      pages: {
        label: "Pages",
        help: "Empty rotates all pages. Example: 1, 3-5",
        placeholder: "all pages",
      },
    },
  },
  "extraer-paginas-pdf": {
    slug: "extract-pdf-pages",
    name: "Extract pages",
    h1: "Extract pages from a PDF",
    tagline: "Keep only the pages you actually need.",
    seoTitle: "Extract pages from PDF to a new file | BreadPDF",
    seoDescription:
      "Select and extract specific pages or ranges from a PDF into a new standalone document, keeping the original intact.",
    ctaLabel: "Extract pages",
    keywords: ["extract pdf pages", "separate pdf pages"],
    howItWorks: ["Upload the PDF.", "List the pages to keep.", "Download the new document."],
    faq: [
      {
        q: "How do I specify which pages to extract?",
        a: "In the 'Pages to extract' field, enter page numbers separated by commas or ranges with hyphens (for example: '1, 4-6, 10'). Only the pages you specify will be compiled into the new document.",
      },
      {
        q: "In what order do extracted pages appear in the new PDF?",
        a: "The processor collects your selected pages and organizes them in natural ascending order to preserve the chronological reading flow of the original document.",
      },
      {
        q: "What is the difference between extracting pages and splitting a PDF?",
        a: "'Extract pages' produces a single new PDF document containing only your chosen pages. 'Split PDF', on the other hand, divides the file into multiple individual documents.",
      },
      {
        q: "Is the original PDF altered or does it lose pages?",
        a: "No. Your original file on your computer or phone remains unchanged. The tool creates and downloads a brand new PDF without overwriting the source.",
      },
      {
        q: "Are visual quality, fonts, and graphics preserved?",
        a: "Yes. Selected pages are copied natively at the vector level with all fonts, graphics, and text intact, without recompression or loss of quality.",
      },
      {
        q: "Is the file processed privately inside my browser?",
        a: "Yes. Extraction happens entirely inside your browser via JavaScript. No files or personal data are ever uploaded to external servers.",
      },
    ],
    options: { pages: { label: "Pages to extract", help: "Example: 1, 4-6, 10" } },
  },
  "eliminar-paginas-pdf": {
    slug: "delete-pdf-pages",
    name: "Delete pages",
    h1: "Delete pages from a PDF",
    tagline: "Remove the pages you don't need and keep the rest untouched.",
    seoTitle: "Delete pages from PDF and save online | BreadPDF",
    seoDescription:
      "Delete unwanted pages from a PDF and download a clean document with re-indexed pages, without installing software or uploading files.",
    ctaLabel: "Delete pages",
    keywords: ["delete pdf pages", "remove pdf pages"],
    howItWorks: ["Upload the PDF.", "List the pages to delete.", "Download the result."],
    faq: [
      {
        q: "Can I delete every page from a PDF?",
        a: "No. A valid PDF file must retain at least one page. If you attempt to delete all pages, the tool will ask you to adjust your selection.",
      },
      {
        q: "How do I indicate which pages to remove?",
        a: "In the 'Pages to delete' field, enter page numbers or ranges separated by commas (for example: '2, 7-9'). Those specific pages will be removed and the rest retained.",
      },
      {
        q: "What happens to the page numbering of remaining pages?",
        a: "The resulting document automatically re-indexes starting sequentially from page 1, ensuring a clean and continuous reading experience without blank gaps.",
      },
      {
        q: "Does deleting pages reduce the PDF file size?",
        a: "Yes. Removing full pages strips their dedicated graphics, fonts, and contents from the final file, resulting in a lighter overall PDF.",
      },
      {
        q: "Is my original source file affected?",
        a: "No. Your file on your device remains unaltered. The tool downloads a new document with the '-sin-paginas.pdf' suffix without overwriting your original.",
      },
      {
        q: "Are pages deleted privately in my browser?",
        a: "Yes. Page removal and PDF assembly takes place entirely in your browser's local memory without uploading files to any external server.",
      },
    ],
    options: { pages: { label: "Pages to delete", help: "Example: 2, 7-9" } },
  },
  "extraer-texto-pdf": {
    slug: "extract-pdf-text",
    name: "Extract text",
    h1: "Extract the text from a PDF",
    tagline: "Get all the document text as a plain text file.",
    seoTitle: "Extract text from PDF to TXT online | BreadPDF",
    seoDescription:
      "Copy and extract clean plain text from a PDF into a formatted .txt file page by page. 100% private in your browser.",
    ctaLabel: "Extract text",
    keywords: ["extract pdf text", "pdf to txt", "copy pdf text"],
    howItWorks: ["Upload the PDF.", "BreadPDF walks through the pages.", "Download the text file."],
    faq: [
      {
        q: "What format is the extracted text downloaded in?",
        a: "Text is saved as a clean plain text file with a .txt extension (UTF-8 encoding), universally compatible with any text editor like Notepad, Word, or TextEdit.",
      },
      {
        q: "Is page separation maintained in the text file?",
        a: "Yes. Each page of the PDF is marked in the output text with a clear header (for example: '--- Página 1 ---') defining the content of each page.",
      },
      {
        q: "Does it work with scanned PDFs or image-only documents?",
        a: "This tool extracts native digital text embedded in the PDF. For scanned documents or photos where text is part of an image, optical character recognition (OCR) is required.",
      },
      {
        q: "Are tables, bold fonts, or images included in the text file?",
        a: "No. The .txt file extracts clean alphanumeric characters and words in plain text. It does not carry images, font styles, or layout formatting.",
      },
      {
        q: "Can I extract text from a password-protected PDF?",
        a: "If the document requires a password to open, unlock it first using BreadPDF's unlock tool so the reader engine can access its text content.",
      },
      {
        q: "Is my document analyzed privately and securely?",
        a: "Yes. Text parsing and extraction runs entirely in your browser memory via pdf.js. Your document never leaves your machine or touches external servers.",
      },
    ],
  },
  "pdf-a-webp": {
    slug: "pdf-to-webp",
    name: "PDF to WebP",
    h1: "Convert PDF to WebP images",
    tagline: "Convert PDF pages to modern WebP format, sharp and up to 70% lighter.",
    seoTitle: "Convert PDF to WebP online free | BreadPDF",
    seoDescription:
      "Transform every page of your PDF into next-generation WebP images. High visual quality, superior compression, and 100% processed in your browser.",
    ctaLabel: "Convert to WebP",
    keywords: ["pdf to webp", "convert pdf webp", "extract webp from pdf"],
    howItWorks: [
      "Upload your PDF file.",
      "Select rendering resolution.",
      "Download converted pages in ultralight WebP format.",
    ],
    faq: [
      {
        q: "What advantages does WebP offer over JPG or PNG?",
        a: "WebP is a modern image format designed for the web that delivers up to 70% better compression than JPG while preserving impeccable photographic sharpness, making it ideal for fast websites and digital presentations.",
      },
      {
        q: "Are all pages of the PDF converted to WebP?",
        a: "Yes. Each document page is rendered individually and outputs a standalone .webp image file ready for download.",
      },
      {
        q: "What resolution do the generated WebP images have?",
        a: "You can adjust the rendering scale between 1x (standard screen resolution) and up to 4x for ultra-sharp images with crisp text and graphic details.",
      },
      {
        q: "Are WebP images supported by modern browsers and systems?",
        a: "Yes. WebP is universally supported across all modern browsers (Chrome, Safari, Edge, Firefox) and major operating systems including Windows, macOS, Android, and iOS.",
      },
      {
        q: "How are the downloaded WebP images named?",
        a: "Each downloaded image uses your original PDF file name followed by '-pagina-X.webp' for easy sorting and archiving.",
      },
      {
        q: "Is my PDF uploaded to an external server for WebP conversion?",
        a: "No. Conversion happens entirely client-side inside your web browser engine. Your files never leave your computer or mobile device.",
      },
    ],
    options: {
      scale: { label: "Resolution", help: "Multiplier over original page size." },
    },
  },
  "pdf-a-word": {
    slug: "pdf-to-word",
    name: "PDF to Word",
    h1: "Convert PDF to editable Word",
    tagline: "Extract text content and basic structure from your PDF to an editable .docx file in your browser.",
    seoTitle: "Convert PDF to Word (.docx) editable online | BreadPDF",
    seoDescription:
      "Convert text and paragraphs from a PDF into an editable Word (.docx) document in your browser. 100% private and sign-up free.",
    ctaLabel: "Convert to Word",
    keywords: ["pdf to word", "pdf to docx", "editable pdf conversion", "turn pdf to word"],
    howItWorks: [
      "Upload the PDF document you want to convert.",
      "The in-memory engine extracts text by grouping lines and paragraphs.",
      "Download your editable .docx file instantly.",
    ],
    faq: [
      {
        q: "Can I edit the generated file in Microsoft Word or Google Docs?",
        a: "Yes. The tool outputs a standard .docx document fully compatible with Microsoft Word, LibreOffice Writer, and Google Docs.",
      },
      {
        q: "What types of documents work best with this conversion?",
        a: "It works best with continuous text documents such as reports, contracts, essays, and letters. In these documents, paragraphs flow cleanly for straightforward word processing.",
      },
      {
        q: "What are its limitations compared to professional desktop software?",
        a: "Because it runs entirely inside the browser without a proprietary typesetting server, documents with complex multi-column newspaper layouts, borderless nested tables, or floating text boxes will be linearized and may require manual formatting adjustments.",
      },
      {
        q: "Are exact fonts and embedded images preserved?",
        a: "Text is exported using clean, universal standard typography. Complex decorative graphics are omitted in this beta version to prioritize speed, privacy, and text fidelity.",
      },
      {
        q: "Does it work with scanned PDFs or image-only files?",
        a: "Not directly. For scanned documents where text is not selectable, you should first process the file with BreadPDF's 'PDF OCR' tool to recognize characters before converting them to Word.",
      },
      {
        q: "Are my documents uploaded to external servers?",
        a: "No. All text parsing and .docx file generation takes place 100% locally in your browser memory using client-side JavaScript. Your files never leave your machine.",
      },
    ],
  },
  "word-a-pdf": {
    slug: "word-to-pdf",
    name: "Word to PDF",
    h1: "Convert Word to PDF",
    tagline: "Turn .docx files into standard PDF documents ready to share or print.",
    seoTitle: "Convert Word to PDF online in your browser | BreadPDF",
    seoDescription:
      "Convert Word documents (.docx) to PDF while preserving paragraphs, headings, and clean structure. 100% private in your browser.",
    ctaLabel: "Convert to PDF",
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf", "turn docx to pdf"],
    howItWorks: [
      "Upload your Word file (.docx or .doc).",
      "The local processor interprets the content and lays it out in A4 format.",
      "Download your final PDF document immediately.",
    ],
    faq: [
      {
        q: "Which Word versions are supported?",
        a: "It supports modern .docx files (Word 2007 and newer). For older legacy binary (.doc) files, we recommend saving them as .docx first for optimal compatibility.",
      },
      {
        q: "Which document elements are transferred into the PDF?",
        a: "The engine extracts complete text, headings, paragraph breaks, and lists, laying them out on standard A4 pages with consistent margins and clean typography.",
      },
      {
        q: "Will the layout look identical to Microsoft Word?",
        a: "The client-side engine prioritizes textual integrity and readability. Elaborate graphical layouts, custom multi-level headers, or proprietary fonts are rendered using universal standard typefaces to guarantee cross-device compatibility.",
      },
      {
        q: "What page dimensions and margins does the generated PDF use?",
        a: "By default, it produces standard vertical A4 pages with 50-point margins and automatic line wrapping to prevent text clipping.",
      },
      {
        q: "Is my Word file uploaded to any server for conversion?",
        a: "No. File parsing and PDF compilation occur 100% locally in your browser via client-side JavaScript libraries. No text is ever transmitted over the network.",
      },
    ],
  },
  "reordenar-paginas-pdf": {
    slug: "reorder-pdf-pages",
    name: "Reorder PDF Pages",
    h1: "Reorder PDF pages visually",
    tagline: "Rearrange the order of PDF pages by dragging and dropping them easily.",
    seoTitle: "Reorder PDF Pages Online Free | BreadPDF",
    seoDescription:
      "Change the page order of your PDF document visually with live page thumbnails. Drag pages into your preferred sequence and download instantly.",
    ctaLabel: "Save New Order",
    keywords: ["reorder pdf pages", "rearrange pdf pages", "move pdf pages"],
    howItWorks: [
      "Upload your PDF file.",
      "Drag and drop the page thumbnails to put them in your exact desired order.",
      "Click 'Save New Order' and download your reorganized document.",
    ],
    faq: [
      {
        q: "How do I change the page order?",
        a: "When you upload a document, an interactive thumbnail grid displays all pages. Simply click and drag any page to its new position.",
      },
      {
        q: "Does reordering degrade visual quality or remove selectable text?",
        a: "No. Reordering runs natively at the vector level, preserving embedded fonts, vector artwork, and sharpness without modification.",
      },
      {
        q: "Can I rotate or delete pages while reordering?",
        a: "Yes. The interactive workspace provides individual buttons on each page card to rotate or delete specific pages prior to saving.",
      },
      {
        q: "Are my documents uploaded to a server to reorder them?",
        a: "No. Page reordering executes 100% locally in your browser via JavaScript. Your files stay strictly on your device.",
      },
      {
        q: "Is there a limit on how many pages I can reorder?",
        a: "There is no artificial page limit. You can organize documents with dozens of pages according to your browser's available memory.",
      },
    ],
  },
  "aplanar-pdf": {
    slug: "flatten-pdf",
    name: "Flatten PDF",
    h1: "Flatten PDF forms and annotations",
    tagline: "Turn interactive form fields and widgets into permanent, non-editable text and graphics.",
    seoTitle: "Flatten PDF Online Free and Lock Form Fields | BreadPDF",
    seoDescription:
      "Consolidate fillable form fields and interactive annotations into static document content. Lock filled values securely before sharing.",
    ctaLabel: "Flatten PDF",
    keywords: ["flatten pdf", "lock pdf form", "flatten fillable pdf", "non editable pdf"],
    howItWorks: [
      "Upload the PDF containing interactive form fields or annotations.",
      "The in-browser engine consolidates field values into static page graphics.",
      "Download your flattened PDF ready for formal submission or printing.",
    ],
    faq: [
      {
        q: "What does flattening a PDF actually do?",
        a: "Flattening locks interactive form fields (AcroForms), text inputs, checkboxes, and signatures, converting them into standard non-editable page graphics so values cannot be altered.",
      },
      {
        q: "Can a flattened form be edited again afterwards?",
        a: "No. Once flattened, form fields lose their interactive definitions and become static graphical content, ensuring filled data remains tamper-proof.",
      },
      {
        q: "Does text remain crisp and selectable?",
        a: "Yes. Completed text appearances are rendered vectorially within the page stream, retaining high typographical clarity.",
      },
      {
        q: "Does flattening reduce PDF file size?",
        a: "In files with heavy interactive structures, it often slightly reduces file size by stripping dynamic widget dictionaries.",
      },
      {
        q: "Do my entered form details ever leave my device?",
        a: "No. Flattening occurs entirely inside your local browser memory with zero network uploads.",
      },
    ],
  },
  "eliminar-metadatos-pdf": {
    slug: "remove-pdf-metadata",
    name: "Remove PDF Metadata",
    h1: "Remove hidden metadata and properties from PDF",
    tagline: "Wipe hidden author, software, dates, and sensitive document properties.",
    seoTitle: "Remove PDF Metadata Online and Clean File Properties | BreadPDF",
    seoDescription:
      "Strip hidden personal data from your PDF such as author, creation tool, revision timestamps, and document properties 100% privately.",
    ctaLabel: "Clean Metadata",
    keywords: ["remove pdf metadata", "clean pdf properties", "strip author from pdf"],
    howItWorks: [
      "Select the PDF you wish to sanitize.",
      "The system purges author, title, subject, application creator, and date fields.",
      "Download a clean PDF copy with zero traces of personal or system details.",
    ],
    faq: [
      {
        q: "Which metadata fields are purged?",
        a: "All standard document information dictionary fields are cleared: Title, Author, Subject, Keywords, Creator, Producer, and Creation/Modification timestamps.",
      },
      {
        q: "Does this affect visible page text or images?",
        a: "Not at all. Visible text, images, tables, and layouts remain untouched. Only invisible background properties are sanitized.",
      },
      {
        q: "Why should I clean metadata before distributing a PDF?",
        a: "Metadata can inadvertently reveal your full name, local computer username, software versions, and exact modification dates.",
      },
      {
        q: "Are my files uploaded to a remote server for cleaning?",
        a: "No. Reading and rewriting the PDF header takes place directly in your web browser with no remote communication.",
      },
      {
        q: "How does this differ from redacting a PDF?",
        a: "'Remove Metadata' cleans invisible file properties. 'Redact PDF' permanently blacks out and removes visible sensitive text or graphics on the page.",
      },
    ],
  },
  "pdf-a-png": {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    h1: "Convert PDF pages to PNG images",
    tagline: "Turn PDF pages into sharp, lossless PNG images with high resolution.",
    seoTitle: "Convert PDF to PNG Online Free in High Quality | BreadPDF",
    seoDescription:
      "Transform every page of your PDF into crisp, lossless PNG images without compression artifacts. Fast, private, and browser-powered.",
    ctaLabel: "Convert to PNG",
    keywords: ["pdf to png", "convert pdf to png", "extract png from pdf"],
    howItWorks: [
      "Upload your PDF file.",
      "Select your preferred rendering scale or resolution.",
      "Download your pages in high-fidelity PNG format.",
    ],
    faq: [
      {
        q: "What is the difference between PDF to PNG and PDF to JPG?",
        a: "PNG is a lossless format that delivers crisp text edges and superior graphic precision without the compression artifacts common in JPG.",
      },
      {
        q: "How are multi-page documents downloaded?",
        a: "Each page renders as a separately numbered PNG file ready for individual download and saving on your device.",
      },
      {
        q: "Can I choose the output resolution?",
        a: "Yes. You can choose between Standard (1x) or High Definition (2x) depending on whether you need images for web sharing or printing.",
      },
      {
        q: "Is the page background rendered white?",
        a: "Yes, PDF pages are rendered over a solid white canvas background to guarantee universal readability in any image viewer.",
      },
      {
        q: "Is my PDF uploaded to any external server?",
        a: "No. Rendering executes directly on your browser's Canvas engine without sending any file data to remote servers.",
      },
    ],
    options: {
      scale: {
        label: "Image resolution",
        choices: {
          "1": "Standard (72-96 DPI) — Lightweight",
          "2": "High Definition (150-200 DPI) — Recommended",
          "3": "Maximum Sharpness (300 DPI) — Print",
        },
      },
    },
  },
  "png-a-pdf": {
    slug: "png-to-pdf",
    name: "PNG to PDF",
    h1: "Convert PNG images to PDF document",
    tagline: "Combine PNG images and screenshots into a single structured PDF document.",
    seoTitle: "Convert PNG to PDF Online Free in Order | BreadPDF",
    seoDescription:
      "Merge one or multiple PNG images into a single PDF document. Fit to A4 with neat margins or keep original dimensions with complete privacy.",
    ctaLabel: "Convert to PDF",
    keywords: ["png to pdf", "convert png to pdf", "combine png into pdf"],
    howItWorks: [
      "Select one or more PNG files from your device.",
      "Choose whether to fit images into standard A4 pages with margins or keep original dimensions.",
      "Download your consolidated PDF document instantly.",
    ],
    faq: [
      {
        q: "Can I upload multiple PNG images at once?",
        a: "Yes. You can select multiple PNG files, and they will be arranged consecutively in the resulting PDF.",
      },
      {
        q: "Are transparent PNG backgrounds preserved?",
        a: "Yes. BreadPDF's engine embeds PNG images natively into the PDF preserving their alpha transparency channel without forced conversion to JPEG.",
      },
      {
        q: "What page sizing options are available?",
        a: "You can choose 'Fit to A4' (with balanced page margins) or 'Original image dimensions' so each PDF page matches the source image size.",
      },
      {
        q: "Is there a limit on how many images I can merge?",
        a: "You can combine dozens of images as long as your device's browser memory supports them.",
      },
      {
        q: "Are my pictures uploaded to external servers?",
        a: "No. All PDF generation happens locally inside your browser memory with zero cloud transfer.",
      },
    ],
    options: {
      pageSize: {
        label: "Page size",
        choices: {
          a4: "Fit to A4 page (with margins)",
          fit: "Original image dimensions",
        },
      },
    },
  },
  "redimensionar-pdf": {
    slug: "resize-pdf",
    name: "Resize PDF Pages",
    h1: "Resize and normalize PDF pages to A4",
    tagline: "Standardize your PDF page dimensions to A4, US Letter, or Legal.",
    seoTitle: "Resize PDF Pages Online to A4 or Letter | BreadPDF",
    seoDescription:
      "Normalize documents with mixed page sizes or adapt print formats to standard A4, Letter, or Legal while preserving proportions without distortion.",
    ctaLabel: "Resize Pages",
    keywords: ["resize pdf", "change pdf page size", "convert pdf to a4"],
    howItWorks: [
      "Upload your PDF file.",
      "Select your target page standard (A4, Letter, Legal, or A3).",
      "Download your standardized document with proportionally scaled, centered pages.",
    ],
    faq: [
      {
        q: "How does content adapt to the new page dimensions?",
        a: "Page content is scaled proportionally and centered on the new canvas, ensuring no text is cropped and no aspect ratios are stretched.",
      },
      {
        q: "What happens to landscape (horizontal) pages?",
        a: "The engine automatically senses page orientation. If an incoming page is landscape, the target sheet orients horizontally to match.",
      },
      {
        q: "Which standard page sizes are supported?",
        a: "You can standardize to A4 (210 × 297 mm), US Letter (216 × 279 mm), Legal (216 × 356 mm), and A3 (297 × 420 mm).",
      },
      {
        q: "Does resizing degrade text sharpness?",
        a: "No. Vector paths, embedded fonts, and graphics scale with mathematical precision inside the target page boundaries.",
      },
      {
        q: "Are my files processed privately?",
        a: "Yes. All dimensional scaling runs locally within your browser without sending files to remote servers.",
      },
    ],
    options: {
      size: {
        label: "Target page size",
        choices: {
          a4: "A4 (210 × 297 mm) — European / International standard",
          letter: "US Letter (216 × 279 mm) — American standard",
          legal: "Legal (216 × 356 mm) — Legal documents",
          a3: "A3 (297 × 420 mm) — Large format / blueprints",
        },
      },
    },
  },
  "editar-metadatos-pdf": {
    slug: "edit-pdf-metadata",
    name: "Edit PDF Metadata",
    h1: "Edit PDF Document Metadata",
    tagline: "Update title, author, subject, and keywords directly in your browser.",
    seoTitle: "Edit PDF Metadata Online for Free | BreadPDF",
    seoDescription:
      "Modify title, author, subject, and keywords in your PDF file with 100% client-side privacy. No files are sent to remote servers.",
    ctaLabel: "Save Metadata",
    keywords: ["edit pdf metadata", "change pdf author", "update pdf title", "pdf properties"],
    howItWorks: [
      "Upload your PDF document.",
      "Fill in or edit title, author, subject, and keywords.",
      "Click Save Metadata to download the updated PDF.",
    ],
    faq: [
      {
        q: "Which metadata fields can be updated?",
        a: "You can update the standard document information dictionary: Title, Author, Subject, and Keywords.",
      },
      {
        q: "Does this affect page contents or visual layouts?",
        a: "Not at all. Visual text, images, and embedded vector graphics remain completely intact. Only document properties are updated.",
      },
      {
        q: "Are my documents uploaded to any server?",
        a: "No. Everything runs locally in your browser memory via client-side JavaScript.",
      },
    ],
    options: {
      title: {
        label: "Document title",
        placeholder: "e.g. Annual Report 2026",
      },
      author: {
        label: "Author",
        placeholder: "e.g. Company or Author name",
      },
      subject: {
        label: "Subject",
        placeholder: "e.g. Financial performance summary",
      },
      keywords: {
        label: "Keywords (comma-separated)",
        placeholder: "finance, report, balance",
      },
    },
  },
  "anadir-texto-pdf": {
    slug: "add-text-to-pdf",
    name: "Add Text to PDF",
    h1: "Add Text and Annotations to a PDF",
    tagline: "Insert custom text, notes, or typography at your chosen position and page.",
    seoTitle: "Add Text to PDF Online for Free | BreadPDF",
    seoDescription:
      "Type and add text overlays to any PDF page with font size, color, and positioning controls. Fast, private, and no signup required.",
    ctaLabel: "Insert Text & Download",
    keywords: ["add text to pdf", "type on pdf", "insert text into pdf", "write on pdf"],
    howItWorks: [
      "Upload your PDF file.",
      "Type your text, adjust horizontal and vertical coordinates, size, and color.",
      "Preview the result and download your modified PDF.",
    ],
    faq: [
      {
        q: "Can I add text to specific pages or all pages?",
        a: "Yes. You can choose to place text on all pages, the first page, the last page, or selected pages.",
      },
      {
        q: "Can I adjust font size and text color?",
        a: "Yes. Use the sliders for font size (pt), page coordinates (percentage), and the color picker for text color.",
      },
      {
        q: "Is the text embedded into the output PDF?",
        a: "Yes. The text is drawn directly into the PDF content stream with vector sharpness for crisp viewing and printing.",
      },
      {
        q: "Is it safe to process confidential documents?",
        a: "Completely safe. Processing happens on your device without sending any document data across the network.",
      },
    ],
    options: {
      text: {
        label: "Text to insert",
        placeholder: "Type text here...",
      },
      fontSize: {
        label: "Font size",
      },
      xPercent: {
        label: "Horizontal position (%)",
      },
      yPercent: {
        label: "Vertical position (%)",
      },
    },
  },
  "insertar-paginas-pdf": {
    slug: "insert-pages-pdf",
    name: "Insert Pages into PDF",
    h1: "Insert Pages from Another PDF into a Document",
    tagline: "Add pages from a second PDF at an exact position inside your base document.",
    seoTitle: "Insert Pages into PDF Online for Free at Exact Position | BreadPDF",
    seoDescription:
      "Insert pages from another PDF at the beginning, end, or specific point of your document. Fast, private, and no signup needed.",
    ctaLabel: "Insert Pages & Download",
    keywords: ["insert pages into pdf", "add pages to pdf", "combine pages into pdf", "paste pages in pdf"],
    howItWorks: [
      "Upload your base PDF document and the PDF containing the pages to insert.",
      "Choose the target insertion position: start, after cover, or at the end.",
      "Preview the combined page sequence and download your merged PDF.",
    ],
    faq: [
      {
        q: "How is this different from 'Merge PDF'?",
        a: "Merge PDF appends whole documents sequentially one after another. 'Insert Pages' lets you place the pages of a second document at an exact point inside the base file.",
      },
      {
        q: "Can I insert a multi-page PDF all at once?",
        a: "Yes. All pages from the secondary PDF will be inserted consecutively at your selected target position.",
      },
      {
        q: "Are hyperlinks, text, and vector graphics preserved?",
        a: "Yes. Pages are copied faithfully with original fonts, vectors, and image resolutions intact.",
      },
      {
        q: "Do I need an account or subscription?",
        a: "No. You can use the tool right away with zero limits, completely free and anonymously.",
      },
      {
        q: "Are my documents kept private?",
        a: "Yes. Processing executes exclusively inside your local browser via JavaScript without cloud uploads.",
      },
    ],
    options: {
      position: {
        label: "Insertion position",
        choices: {
          end: "At the end of base document",
          start: "At the beginning (page 1)",
          "after-first": "After cover page (page 2)",
        },
      },
    },
  },
  "optimizar-pdf-para-impresion": {
    slug: "optimize-pdf-for-print",
    name: "Optimize PDF for Print",
    h1: "Optimize PDF for Print and Grayscale Conversion",
    tagline: "Convert your PDF to grayscale to save color toner and speed up printing.",
    seoTitle: "Optimize PDF for Print Online Free to Grayscale | BreadPDF",
    seoDescription:
      "Transform your PDF to true grayscale for cost-effective monochrome printing. Sharp, private, and runs directly in your browser.",
    ctaLabel: "Optimize for Print",
    keywords: ["optimize pdf for print", "grayscale pdf", "print pdf monochrome", "save toner pdf"],
    howItWorks: [
      "Select the PDF you intend to print.",
      "Choose your target resolution quality (standard for reading or high-definition for intricate graphics).",
      "Download your optimized grayscale PDF ready for your printer.",
    ],
    faq: [
      {
        q: "Why convert a PDF to grayscale before printing?",
        a: "Many color printers mix color inks to create blacks and grays when a PDF contains RGB/CMYK elements. Grayscale normalization guarantees only black ink is used.",
      },
      {
        q: "How does the grayscale conversion work technically?",
        a: "Each page is rendered at high definition calculating the perceptual luminance of each pixel, reconstructing a sharp monochrome PDF.",
      },
      {
        q: "Does it preserve fine text sharpness?",
        a: "Yes. High-resolution rendering ensures sharp contrast and clean letter edges both on screen and on physical paper.",
      },
      {
        q: "Does grayscale conversion reduce file size?",
        a: "For PDFs containing high-resolution color photos or complex backgrounds, discarding three color channels typically lowers file weight.",
      },
      {
        q: "Is document privacy maintained?",
        a: "Yes. Conversion is handled entirely locally on your machine without transmitting pages to third-party servers.",
      },
    ],
    options: {
      dpi: {
        label: "Print rendering quality",
        choices: {
          "2": "High Definition (~150-200 DPI) — Recommended",
          "1": "Quick Draft (~96 DPI) — Lighter file",
        },
      },
    },
  },
  "webp-a-pdf": {
    slug: "webp-to-pdf",
    name: "WebP to PDF",
    h1: "Convert WebP images to PDF online",
    tagline: "Convert WebP images into a crisp, unified PDF document.",
    seoTitle: "Convert WebP to PDF online free and in order | BreadPDF",
    seoDescription:
      "Turn one or multiple WebP images into a single PDF file without quality loss. Fast, private in your browser, and no files uploaded to servers.",
    ctaLabel: "Convert to PDF",
    keywords: ["webp to pdf", "convert webp to pdf", "webp images to pdf", "combine webp into pdf"],
    howItWorks: [
      "Select one or multiple WebP images from your device.",
      "Choose whether to fit images onto standard A4 pages with margins or preserve original dimensions.",
      "Download your unified PDF document instantly.",
    ],
    faq: [
      {
        q: "Can I convert multiple WebP images into a single PDF document?",
        a: "Yes. You can select multiple WebP files at once and they will be arranged into consecutive pages inside the resulting PDF.",
      },
      {
        q: "Is there any visual quality loss when converting WebP to PDF?",
        a: "No. The engine decodes the original pixels directly in your browser and embeds them with full fidelity without unnecessary recompression artifacts.",
      },
      {
        q: "What page size options are available?",
        a: "You can choose 'Fit to A4 page' (with proportional margins) or 'Original image size' to match each page to the exact image dimensions.",
      },
      {
        q: "Can I reorder images before generating the PDF?",
        a: "Yes. You can organize the sequence of pages directly in the upload panel before converting.",
      },
      {
        q: "Are my WebP photos uploaded to cloud servers?",
        a: "No. The entire decoding and PDF compilation process runs 100% locally in your device's memory using client-side JavaScript and Canvas.",
      },
    ],
    options: {
      pageSize: {
        label: "Page size",
        choices: {
          a4: "Fit to A4 page (with margins)",
          fit: "Original size of each image",
        },
      },
    },
  },
  "markdown-a-pdf": {
    slug: "markdown-to-pdf",
    name: "Markdown to PDF",
    h1: "Convert Markdown to PDF online",
    tagline: "Turn Markdown (.md) files into clean, beautifully structured PDF documents.",
    seoTitle: "Convert Markdown to PDF online free and clean | BreadPDF",
    seoDescription:
      "Transform your Markdown (.md) notes and documents into elegant PDFs with headings, paragraphs, lists, quotes, and code blocks rendered instantly.",
    ctaLabel: "Convert to PDF",
    keywords: ["markdown to pdf", "convert md to pdf", "export markdown to pdf", "md document to pdf"],
    howItWorks: [
      "Upload your Markdown (.md or .markdown) file.",
      "The engine parses headings, lists, quotes, and typography blocks into clean pages.",
      "Download your beautifully formatted PDF ready to print, present, or share.",
    ],
    faq: [
      {
        q: "What Markdown syntax elements are supported?",
        a: "The tool renders headings (#, ##, ###), standard paragraphs, bold text (**), blockquotes (>), bullet lists (* or -), numbered lists, and fenced code blocks with monospace font.",
      },
      {
        q: "How does page-splitting work for long documents?",
        a: "The converter calculates available vertical space on standard A4 pages and breaks paragraphs naturally with clean margins.",
      },
      {
        q: "Is it suitable for exporting AI responses from ChatGPT or Claude?",
        a: "Yes. It provides the ideal workflow to convert AI summaries, documentation, and notes exported from Notion or Obsidian into shareable PDFs.",
      },
      {
        q: "Are code blocks preserved with proper formatting?",
        a: "Yes. Code snippets delimited by triple backticks (```) are rendered in shaded background boxes with Courier monospace typography.",
      },
      {
        q: "Are my notes or text files transmitted to external servers?",
        a: "No. All text parsing and PDF vector layout are executed entirely inside your browser with complete privacy.",
      },
    ],
  },
  "powerpoint-a-pdf": {
    slug: "powerpoint-to-pdf",
    name: "PowerPoint to PDF",
    h1: "Convert PowerPoint to PDF online",
    tagline: "Convert .pptx presentations into widescreen PDF slides (Beta preview).",
    seoTitle: "Convert PowerPoint to PDF online free (.pptx) | BreadPDF",
    seoDescription:
      "Transform PowerPoint slides (.pptx) into a widescreen PDF document directly in your browser. Fast, 100% private, and no files uploaded to external servers.",
    ctaLabel: "Convert to PDF",
    keywords: ["powerpoint to pdf", "convert pptx to pdf", "pptx to pdf online", "slides to pdf"],
    howItWorks: [
      "Upload your PowerPoint presentation (.pptx) file.",
      "The in-browser engine parses slides, typography, and text blocks.",
      "Download your clean 16:9 widescreen PDF presentation.",
    ],
    faq: [
      {
        q: "What visual fidelity should I expect from this conversion?",
        a: "This tool is in beta preview and runs completely on the client side in your browser. It extracts text runs, headings, paragraphs, and slide hierarchy into 16:9 widescreen pages using universal fonts. It does not replicate animations or intricate proprietary Microsoft Office SmartArt layouts.",
      },
      {
        q: "Which PowerPoint file versions are supported?",
        a: "It supports modern presentations in .pptx format (PowerPoint 2007 and newer). For legacy binary .ppt files, we recommend saving them as .pptx first.",
      },
      {
        q: "Are slides saved in widescreen or A4 proportions?",
        a: "The PDF is rendered natively in standard 16:9 widescreen proportions (960 × 540 pt), ideal for digital displays, laptops, and tablets.",
      },
      {
        q: "Why is it labeled as a Beta Preview?",
        a: "Because PowerPoint's OpenXML specification includes hundreds of complex proprietary shapes and macros. To ensure complete transparency, we clearly disclose that this is a client-side structural conversion rather than claiming 100% Office layout reproduction.",
      },
      {
        q: "Are my slides uploaded to any external servers?",
        a: "No. Reading the internal presentation XML and compiling the output PDF takes place entirely in your browser's local memory.",
      },
    ],
  },
  "svg-a-pdf": {
    slug: "svg-to-pdf",
    name: "SVG to PDF",
    h1: "Convert SVG to PDF online",
    tagline: "Turn SVG vector graphics into crisp, high-definition PDF documents.",
    seoTitle: "Convert SVG to PDF online free in high resolution | BreadPDF",
    seoDescription:
      "Convert SVG vector files into sharp PDF documents preserving curves, paths, and visual proportions directly in your browser with complete privacy.",
    ctaLabel: "Convert to PDF",
    keywords: ["svg to pdf", "convert svg to pdf", "vector to pdf", "export svg to pdf"],
    howItWorks: [
      "Upload your SVG vector graphic (.svg) file.",
      "Choose whether to fit into a standard A4 page or match the exact graphic dimensions (viewBox).",
      "Download your high-definition PDF document immediately.",
    ],
    faq: [
      {
        q: "How does the SVG to PDF conversion work technically?",
        a: "The tool interprets the SVG XML markup and native viewBox proportions, rendering the visual curves and typography at 2.5x high definition and embedding it into an uncompressed standard PDF page.",
      },
      {
        q: "Does it support both portrait and landscape orientations?",
        a: "Yes. When choosing A4, the system measures the aspect ratio of the graphic and automatically initializes the page in portrait or landscape format to match the SVG.",
      },
      {
        q: "Can I retain the exact dimensions of my original artwork?",
        a: "Yes. Selecting 'Original graphic size (viewBox)' ensures the PDF page is created with the exact point dimensions declared in your SVG canvas.",
      },
      {
        q: "Are gradients and CSS fills preserved?",
        a: "Yes. The browser's native rendering engine accurately rasterizes and renders standard SVG gradients, clip-paths, and styling without missing definitions.",
      },
      {
        q: "Are my vector graphics transmitted over the internet?",
        a: "No. All XML parsing, canvas rendering, and PDF assembly are performed locally inside your device memory with zero cloud uploads.",
      },
    ],
    options: {
      pageSize: {
        label: "Page size",
        choices: {
          a4: "Fit to standard A4 (with clean margins)",
          viewbox: "Original graphic size (viewBox)",
        },
      },
    },
  },

  "extraer-imagenes-pdf": {
    slug: "extract-pdf-images",
    name: "Extract Images from PDF",
    h1: "Extract embedded images from a PDF",
    tagline: "Get the photographs and images embedded in your PDF as individual PNG files.",
    seoTitle: "Extract Images from PDF Online Free: Separate Pictures & Photos | BreadPDF",
    seoDescription:
      "Extract embedded pictures and photographs from your PDF at original quality. Separate images from PDF into individual PNG files or a ZIP archive 100% in your browser.",
    ctaLabel: "Extract images",
    keywords: ["extract images from pdf", "extract images from pdf online", "separate images from pdf", "extract image from pdf online free", "get photos from pdf", "export pdf images"],
    howItWorks: [
      "Upload the PDF you want to extract images from.",
      "The engine scans each page for embedded XObject image resources.",
      "Download individual PNG images or a ZIP archive if multiple images are found.",
    ],
    faq: [
      {
        q: "What type of images does this tool extract?",
        a: "It extracts rasterized images embedded as XObject resources in the PDF: JPEG photographs, PNG graphics, or RGBA color images. It does not extract vector elements or formatted text.",
      },
      {
        q: "Why are no images showing up in my PDF?",
        a: "Some PDFs contain only text and vectors without any embedded raster images. It is also possible that images are stored in a non-standard internal format that the extractor cannot recover as individual objects.",
      },
      {
        q: "What format are the extracted images saved in?",
        a: "Images are exported as PNG files at the original resolution of the embedded object. If more than one image is found, they are automatically packaged in a ZIP archive.",
      },
      {
        q: "What is the difference between 'Extract images' and 'PDF to PNG'?",
        a: "'PDF to PNG' converts each full PDF page into a screen image, including text and vectors. 'Extract images' recovers only the individual image objects embedded inside the PDF, which may be separate photographs distinct from the page layout.",
      },
      {
        q: "Are my files uploaded to an external server?",
        a: "No. The document analysis and image extraction run entirely in your browser memory using pdf.js. No data ever leaves your device.",
      },
    ],
  },

  "dividir-pdf-por-tamano": {
    slug: "split-pdf-by-size",
    name: "Split PDF by Size",
    h1: "Split a PDF into parts by maximum file size in MB",
    tagline: "Fragment large documents while respecting an approximate size limit per part.",
    seoTitle: "Split PDF by size in MB online free | BreadPDF",
    seoDescription:
      "Split a large PDF into fragments with a size limit in MB per part. Ideal for email attachments or platforms with file size restrictions. 100% in your browser.",
    ctaLabel: "Split by size",
    keywords: ["split pdf by size", "split pdf mb", "fragment pdf size", "split pdf email attachment"],
    howItWorks: [
      "Upload the PDF you need to split.",
      "Choose the approximate maximum size in MB for each part.",
      "Download the numbered parts or a ZIP archive if there are more than three.",
    ],
    faq: [
      {
        q: "Is the size of each part exact?",
        a: "It is approximate. A PDF is composed of whole pages that cannot be split mid-page. The engine estimates how many pages fit within the target MB and adjusts accordingly, but the actual result may vary slightly depending on the content of each page.",
      },
      {
        q: "How is this different from 'Split PDF'?",
        a: "'Split PDF' divides the document into specific page ranges or intervals you define. 'Split PDF by Size' automatically splits by a maximum MB per fragment, without requiring you to know the exact page count.",
      },
      {
        q: "How many parts does it create?",
        a: "The number of parts depends on the size of the original file and the MB limit you set. There is no artificial cap on the number of fragments; the process continues until the entire document is covered.",
      },
      {
        q: "Is any quality lost when splitting the PDF?",
        a: "No. Pages are copied in full with their original vector content, images, and fonts — no recompression or quality degradation occurs.",
      },
      {
        q: "Are my files uploaded to a server?",
        a: "No. The splitting process runs in your browser memory using pdf-lib. Your documents are never transmitted to an external server.",
      },
    ],
    options: {
      maxMb: {
        label: "Approximate maximum size per part",
      },
    },
  },

  "eliminar-paginas-en-blanco": {
    slug: "remove-blank-pages-pdf",
    name: "Remove Blank Pages",
    h1: "Remove blank pages from a PDF",
    tagline: "Automatically detect and remove empty pages from scanned documents or forms.",
    seoTitle: "Remove blank pages from PDF online free | BreadPDF",
    seoDescription:
      "Automatically detect and remove blank or empty pages from your PDF. Ideal for scanned documents, forms, and reports. 100% private and browser-based.",
    ctaLabel: "Remove blank pages",
    keywords: ["remove blank pages pdf", "delete empty pages pdf", "strip blank pages pdf"],
    howItWorks: [
      "Upload the PDF with blank or nearly empty pages.",
      "The analyser renders each page at low resolution and measures the white-pixel ratio.",
      "Pages exceeding the threshold are removed and you download the cleaned PDF.",
    ],
    faq: [
      {
        q: "How does the tool detect blank pages?",
        a: "It renders each page at reduced scale (0.4×) with pdf.js and analyses the percentage of pixels with very high brightness (R, G, B > 240). If that percentage exceeds the configured threshold, the page is considered blank.",
      },
      {
        q: "Can it remove pages with very little content that are not completely white?",
        a: "Yes. By lowering the sensitivity threshold, the detector can also remove pages with minimal content such as faint headers or light watermarks. The default threshold of 97% is intentionally conservative.",
      },
      {
        q: "Can it accidentally remove pages that are not actually blank?",
        a: "At the default threshold (97%), the risk is very low. Pages with visible text or images rarely exceed 90% white pixels. If your document has very light backgrounds or subtle watermarks, adjust the threshold or review the result.",
      },
      {
        q: "Does it work with scanned PDFs?",
        a: "Yes. Detection works on the visual render of each page, so it functions correctly for both vector-text PDFs and image-based scanned documents.",
      },
      {
        q: "Are my files uploaded to a server?",
        a: "No. All analysis and page removal are performed locally in your browser with no external data transmission.",
      },
    ],
    options: {
      threshold: {
        label: "Detection sensitivity",
        help: "Minimum white-pixel percentage to classify a page as 'blank'. Higher value = more conservative.",
      },
    },
  },

  "imagen-a-webp": {
    slug: "image-to-webp",
    name: "Image to WebP",
    h1: "Convert JPG and PNG images to WebP",
    tagline: "Reduce the file size of your images for the web by converting them to the modern WebP format.",
    seoTitle: "Convert image to WebP online free | JPG and PNG | BreadPDF",
    seoDescription:
      "Convert JPG and PNG images to WebP to reduce their weight for the web. Adjust quality and download the result instantly, all in your browser.",
    ctaLabel: "Convert to WebP",
    keywords: ["image to webp", "jpg to webp", "png to webp", "convert to webp", "optimize image web"],
    howItWorks: [
      "Upload one or more JPG or PNG images.",
      "Adjust the WebP quality level (higher quality = larger file).",
      "Download the converted images or a ZIP archive if there are multiple.",
    ],
    faq: [
      {
        q: "What image formats does this tool accept?",
        a: "It accepts JPG/JPEG and PNG images. These are the two most common web image formats and both convert with full fidelity to the WebP format.",
      },
      {
        q: "How much will the image size be reduced?",
        a: "The saving depends on the original image content and the quality setting chosen. WebP generally offers better compression than JPG or PNG at the same visual quality level, but the exact result varies per image. This tool does not guarantee a specific reduction percentage.",
      },
      {
        q: "Is PNG transparency preserved when converting to WebP?",
        a: "Yes. WebP supports an alpha channel (transparency), so PNG images with transparent backgrounds retain that property after conversion.",
      },
      {
        q: "Can I convert multiple images at once?",
        a: "Yes. You can upload multiple JPG and PNG files in a single session. If there are multiple images, the result is automatically packaged as a ZIP file.",
      },
      {
        q: "Are my files uploaded to a server?",
        a: "No. Conversion uses only the browser's native Canvas API locally. No image ever leaves your device.",
      },
    ],
    options: {
      quality: {
        label: "WebP quality",
        help: "Higher quality = larger output file size.",
      },
    },
  },

  "sanear-pdf": {
    slug: "sanitize-pdf",
    name: "Sanitize PDF",
    h1: "Sanitize and clean a PDF of unwanted elements",
    tagline: "Remove embedded JavaScript, automatic actions, and author metadata from PDF documents.",
    seoTitle: "Sanitize PDF online free — remove JavaScript and metadata | BreadPDF",
    seoDescription:
      "Clean your PDF by removing embedded JavaScript, automatic open actions, and author metadata. Ideal before sharing third-party documents.",
    ctaLabel: "Sanitize PDF",
    keywords: ["sanitize pdf", "clean pdf", "remove javascript pdf", "strip pdf metadata", "secure pdf"],
    howItWorks: [
      "Upload the PDF you want to sanitize.",
      "The engine removes JavaScript, automatic actions, and author metadata.",
      "Download the clean PDF ready to share safely.",
    ],
    faq: [
      {
        q: "What elements does this tool exactly remove?",
        a: "It removes: (1) JavaScript embedded in the document catalogue (/JavaScript, /Names entries with scripts), (2) Automatic open actions (/OpenAction, /AA in the catalogue and in individual pages), (3) The XMP metadata stream (/Metadata), and (4) Author information fields from the document info dictionary (Author, Creator, Keywords, Subject).",
      },
      {
        q: "Does it guarantee the PDF is completely safe?",
        a: "No. This tool removes known and standard elements. It cannot guarantee neutralisation of advanced attack vectors, payloads encrypted in non-standard object streams, or vulnerabilities in your PDF viewer. For high-criticality documents in corporate environments, use specialised document sandbox solutions.",
      },
      {
        q: "Is the visual content of the document altered?",
        a: "No. Page content (text, images, vectors) remains intact. Only metadata and scripting elements are removed from the PDF catalogue.",
      },
      {
        q: "When is this useful?",
        a: "It is useful when you receive PDFs from unknown third parties you want to share or distribute, when you need to strip author data before publishing a document, or when you want to ensure the PDF does not execute automatic actions on opening.",
      },
      {
        q: "Are my files uploaded to a server?",
        a: "No. The entire sanitisation process runs locally in your browser using pdf-lib. The document never leaves your device.",
      },
    ],
  },

  "rellenar-formulario-pdf": {
    slug: "fill-pdf-form",
    name: "Fill PDF Form",
    h1: "Fill form fields in a PDF online",
    tagline: "Detect and fill AcroForm fields in any PDF directly in your browser.",
    seoTitle: "Fill PDF form online free without Adobe | BreadPDF",
    seoDescription:
      "Fill text fields, checkboxes, dropdowns, and radio buttons in AcroForm PDFs without installing anything. Export the completed PDF instantly.",
    ctaLabel: "Open form",
    keywords: ["fill pdf form", "complete pdf online", "fill pdf without adobe", "interactive pdf form"],
    howItWorks: [
      "Upload the PDF containing AcroForm fields.",
      "The tool automatically detects all fields: text, checkboxes, dropdowns, and radio buttons.",
      "Fill in the fields and export the completed PDF ready to sign or submit.",
    ],
    faq: [
      {
        q: "What types of PDF forms are supported?",
        a: "Only PDFs containing standard AcroForm fields (the native PDF standard) are supported. XFA forms (Adobe's proprietary technology used by some Adobe LiveCycle-generated PDFs) are not supported. If the PDF has no defined fields, the tool will alert you.",
      },
      {
        q: "What field types can be filled?",
        a: "Supports text fields (single-line and multiline), checkboxes, radio buttons, and dropdown lists. These are the four most common AcroForm field types in standard forms.",
      },
      {
        q: "Does the exported PDF keep the fields editable?",
        a: "Yes. The exported PDF retains AcroForm fields with the values you entered. The form is not automatically flattened, so it remains editable in Adobe Reader or other viewers. To make it non-editable, use BreadPDF's Flatten PDF tool.",
      },
      {
        q: "What if the PDF is password protected?",
        a: "If the PDF is encrypted with form editing restrictions, fields may not be accessible. First unlock the document with BreadPDF's 'Unlock PDF' tool and try again.",
      },
      {
        q: "Are my forms uploaded to an external server?",
        a: "No. Field detection uses pdf.js and value saving uses pdf-lib — both running entirely in your browser memory. Form data never leaves your device.",
      },
    ],
  },

  "marca-de-agua": {
    "slug": "watermark-pdf",
    "name": "Watermark",
    "h1": "Add Watermark to a PDF",
    "tagline": "Stamp every page with text or an image, rotation and opacity control.",
    "seoTitle": "Add Watermark to PDF Online for Free | BreadPDF",
    "seoDescription": "Add custom text or image watermarks to your PDF documents with angle, position, and transparency controls directly in your browser.",
    "ctaLabel": "Apply Watermark",
    "keywords": [
      "watermark pdf",
      "add watermark to pdf",
      "stamp pdf"
    ],
    "howItWorks": [
      "Upload your PDF file.",
      "Configure text, angle, size, opacity, and position.",
      "Download your secured document."
    ],
    "faq": [
      {
        "q": "Can I tile the watermark across the page?",
        "a": "Yes, you can enable tile mode to repeat the watermark across the entire page."
      }
    ]
  },

  "numerar-paginas": {
    "slug": "number-pdf-pages",
    "name": "Number pages",
    "h1": "Number Pages in a PDF",
    "tagline": "Insert page numbers with configurable format, position, and margins.",
    "seoTitle": "Number PDF Pages Online for Free | BreadPDF",
    "seoDescription": "Add clean page numbers to your PDF document in the header or footer. Customize layout, font, numbering format, and exclude cover pages for thesis or reports.",
    "ctaLabel": "Number pages",
    "keywords": [
      "number pdf pages",
      "number pdf pages online",
      "paginate pdf",
      "page numbers pdf",
      "add page numbers to pdf",
      "number pdf pages free"
    ],
    "howItWorks": [
      "Upload your PDF document.",
      "Select format ({n} of {total}) and position.",
      "Download your numbered PDF."
    ],
    "faq": [
      {
        "q": "Can I skip numbering the cover page?",
        "a": "Yes, enable 'Exclude first page' to keep the cover page or introductory pages unnumbered."
      },
      {
        "q": "What page number formats are supported?",
        "a": "BreadPDF supports standard formats including simple numerals ('1, 2, 3'), total count formats ('Page {n} of {total}' / '1/15'), and roman numerals ('i, ii, iii') for academic theses and reports."
      },
      {
        "q": "Where can page numbers be placed on the sheet?",
        "a": "You can position numbers in footers (bottom-center, bottom-right, bottom-left) or headers (top-center, top-right, top-left) with safe margins preventing text overlap."
      },
      {
        "q": "Can I use this tool to count how many pages my PDF has?",
        "a": "Yes. When you load your file, BreadPDF instantly counts and displays the exact total number of pages in the thumbnail grid and format placeholder ({total}), letting you audit total pages before export."
      },
      {
        "q": "Does numbering alter original vector text or formatting?",
        "a": "No. Page numbers are stamped onto a separate, clean vector overlay using standard crisp fonts without modifying or shifting existing document content."
      },
      {
        "q": "Are my documents processed securely?",
        "a": "Yes. All page inspection, numbering, and rendering occur 100% locally in your browser memory via WebAssembly/pdf-lib. Your files are never uploaded to remote servers."
      }
    ]
  },

  "ocr-pdf": {
    "slug": "ocr-pdf",
    "name": "PDF OCR",
    "h1": "Optical Character Recognition (OCR) for PDF",
    "tagline": "Turn scanned documents into files with selectable, searchable text.",
    "seoTitle": "Free Online PDF OCR | Text Recognition BreadPDF",
    "seoDescription": "Apply OCR to scanned PDFs or images directly in your browser. Generate a searchable PDF or extract plain text as .txt.",
    "ctaLabel": "Start OCR",
    "keywords": [
      "ocr pdf",
      "recognize text pdf",
      "scanned pdf to text",
      "searchable pdf"
    ],
    "howItWorks": [
      "Upload your scanned PDF.",
      "Choose document language (English, Spanish, French, etc.).",
      "Download your new PDF with selectable text or a .txt file."
    ],
    "faq": [
      {
        "q": "What is OCR and why is it useful?",
        "a": "OCR (Optical Character Recognition) analyzes scanned page images to identify characters and words, turning them into digital interactive text you can search and copy."
      },
      {
        "q": "Which languages are supported?",
        "a": "It supports 7 primary languages: English, Spanish, Catalan, French, German, Italian, and Portuguese."
      },
      {
        "q": "Is my file uploaded to an external server?",
        "a": "No. The Tesseract engine runs completely client-side in your browser via WebAssembly. Your documents are never uploaded."
      }
    ],
    "options": {
      "lang": {
        "label": "Document language",
        "choices": {
          "spa": "Spanish",
          "eng": "English",
          "cat": "Catalan",
          "fra": "French",
          "deu": "German",
          "ita": "Italian",
          "por": "Portuguese"
        }
      },
      "mode": {
        "label": "Output format",
        "choices": {
          "pdf": "Searchable PDF with text layer",
          "txt": "Plain text file (.txt)"
        }
      }
    }
  },

  "reparar-pdf": {
    "slug": "repair-pdf",
    "name": "Repair PDF",
    "h1": "Repair and Recover Corrupted PDF Files",
    "tagline": "Recover damaged documents by reconstructing their structure and cross-reference table.",
    "seoTitle": "Repair PDF Online for Free | Document Recovery BreadPDF",
    "seoDescription": "Fix PDF files that won't open, have broken structures, or XRef errors. Recover pages and download a clean PDF.",
    "ctaLabel": "Repair PDF",
    "keywords": [
      "repair pdf",
      "fix corrupted pdf",
      "recover damaged pdf",
      "rebuild pdf"
    ],
    "howItWorks": [
      "Upload the damaged or incomplete PDF.",
      "BreadPDF analyzes the binary structure and rescues all readable pages.",
      "Download your sanitized, reconstructed PDF document."
    ],
    "faq": [
      {
        "q": "What errors does this tool fix?",
        "a": "It fixes truncated headers, damaged cross-reference tables (XRef), and detached object streams."
      },
      {
        "q": "Is it safe for my private data?",
        "a": "Completely safe. Structural reconstruction occurs entirely in your browser's local memory."
      }
    ]
  },

  "proteger-pdf": {
    "slug": "protect-pdf",
    "name": "Protect PDF",
    "h1": "Protect PDF with Password and Strong Encryption",
    "tagline": "Add an opening password and encrypt your document with high-strength AES security.",
    "seoTitle": "Protect PDF with Password Online for Free | BreadPDF",
    "seoDescription": "Encrypt and password-protect your PDF files in your browser without uploading them to the internet. Maximum privacy.",
    "ctaLabel": "Protect PDF",
    "keywords": [
      "protect pdf",
      "password pdf",
      "lock pdf",
      "encrypt pdf"
    ],
    "howItWorks": [
      "Upload the PDF document you want to protect.",
      "Enter the opening password the document will require.",
      "Download your locked PDF with robust encryption."
    ],
    "faq": [
      {
        "q": "What kind of protection does this tool add?",
        "a": "It adds a user opening password. Any reader opening the PDF will prompt for the key before decrypting content."
      },
      {
        "q": "Are my password or files sent to any server?",
        "a": "No. Encryption runs 100% locally in your browser via client-side cryptographic libraries."
      }
    ],
    "options": {
      "password": {
        "label": "Protection password",
        "placeholder": "Enter a strong password...",
        "help": "Save your password. Without it, no one can open the file."
      }
    }
  },

  "desbloquear-pdf": {
    "slug": "unlock-pdf",
    "name": "Unlock PDF",
    "h1": "Unlock PDF and Remove Password",
    "tagline": "Remove the password from a PDF you have the key for to open it without restrictions.",
    "seoTitle": "Unlock PDF Online and Remove Password | BreadPDF",
    "seoDescription": "Remove opening passwords from your PDF file by entering the legitimate password once. Download an unlocked, restriction-free PDF.",
    "ctaLabel": "Unlock PDF",
    "keywords": [
      "unlock pdf",
      "remove pdf password",
      "decrypt pdf"
    ],
    "howItWorks": [
      "Upload your password-protected PDF file.",
      "Enter the current document password.",
      "Download the new PDF free of opening passwords."
    ],
    "faq": [
      {
        "q": "Can I unlock a PDF if I forgot or do not have the password?",
        "a": "No. This tool requires the legitimate password to decrypt the document and permanently remove security restrictions."
      }
    ],
    "options": {
      "password": {
        "label": "Current password",
        "placeholder": "Enter document password...",
        "help": "Required to decrypt document data in your browser."
      }
    }
  },

  "firmar-pdf": {
    "slug": "sign-pdf",
    "name": "Sign PDF",
    "h1": "Sign PDF Online for Free and Freehand",
    "tagline": "Draw or upload your electronic signature and place it on any page of your document.",
    "seoTitle": "Sign PDF Online for Free with Your Handwritten Signature | BreadPDF",
    "seoDescription": "Add your graphic signature or mark to any PDF document right inside your browser. 100% private, no file uploads.",
    "ctaLabel": "Sign & Download PDF",
    "keywords": [
      "sign pdf",
      "digital signature pdf",
      "sign document online"
    ],
    "howItWorks": [
      "Upload the PDF you need to sign.",
      "Draw your signature on the interactive canvas or upload an image of your signature.",
      "Place the signature on the desired page and position, then download the signed PDF."
    ],
    "faq": [
      {
        "q": "Is my signature stored on your servers?",
        "a": "No. Signing and rendering runs 100% in your browser using JavaScript and Canvas."
      }
    ]
  },

  "pdf-a-excel": {
    "slug": "pdf-to-excel",
    "name": "PDF to Excel",
    "h1": "Convert PDF to Excel and CSV Online for Free",
    "tagline": "Extract tables and structured data from your PDF into XLSX or CSV spreadsheets.",
    "seoTitle": "Convert PDF to Excel Online for Free | XLSX & CSV in BreadPDF",
    "seoDescription": "Convert tables and tabular data from PDF files into Excel spreadsheets (.xlsx) or CSV format quickly and privately without server uploads.",
    "ctaLabel": "Convert to Excel",
    "keywords": [
      "pdf to excel",
      "convert pdf to xlsx",
      "extract pdf tables",
      "pdf to csv"
    ],
    "howItWorks": [
      "Select or drop the PDF document containing tables or data.",
      "Choose output format: Excel workbook (.xlsx) or comma-separated file (.csv).",
      "Download your spreadsheet ready to edit and analyze."
    ],
    "faq": [
      {
        "q": "Are columns and rows preserved accurately?",
        "a": "Yes. BreadPDF groups text by spatial coordinates and geometric alignment to respect table grids."
      }
    ],
    "options": {
      "format": {
        "label": "Spreadsheet format",
        "choices": {
          "xlsx": "Excel (.xlsx) — Recommended with multiple sheets",
          "csv": "CSV (.csv) — Delimited plain text"
        }
      }
    }
  },

  "comparar-pdf": {
    "slug": "compare-pdf",
    "name": "Compare PDF",
    "h1": "Compare Two PDF Documents Online and Spot Differences",
    "tagline": "Inspect visual changes and text discrepancies between two versions of a PDF file.",
    "seoTitle": "Compare Two PDF Files Online and View Differences | BreadPDF",
    "seoDescription": "Compare two versions of a PDF document side-by-side or with an interactive sliding curtain divider. Detect changes in your browser.",
    "ctaLabel": "Compare documents",
    "keywords": [
      "compare pdf",
      "pdf differences",
      "diff pdf",
      "compare two pdfs"
    ],
    "howItWorks": [
      "Upload the original document (Version A) and modified document (Version B).",
      "Navigate page by page to view automated text difference highlights.",
      "Toggle between side-by-side view or the interactive split slider to inspect every detail."
    ],
    "faq": [
      {
        "q": "What types of differences does the comparator spot?",
        "a": "It performs two complementary checks: a high-fidelity visual render comparison and an automated text flow diff."
      }
    ]
  },

  "resumir-pdf": {
    "slug": "summarize-pdf",
    "name": "Summarize PDF",
    "h1": "Summarize PDF and Extract Key Takeaways",
    "tagline": "Generate executive summaries and key bullet points from long documents directly in your browser.",
    "seoTitle": "Summarize PDF Online and Extract Key Points | BreadPDF",
    "seoDescription": "Extract the most relevant points and sentences from any PDF without sending your document to the cloud or requiring paid accounts.",
    "ctaLabel": "Generate summary",
    "keywords": [
      "summarize pdf",
      "pdf summary",
      "key points pdf",
      "synthesize pdf"
    ],
    "howItWorks": [
      "Upload the PDF document you want to summarize.",
      "Select summary length (bullet points, short overview, or executive summary).",
      "Download your clean synthesized text summary."
    ],
    "faq": [
      {
        "q": "Is the summarization private?",
        "a": "Yes. The linguistic scoring and term frequency algorithm runs 100% locally in your browser."
      }
    ],
    "options": {
      "length": {
        "label": "Summary format",
        "choices": {
          "bullets": "Key highlighted takeaways (Bullet points)",
          "short": "Short summary (3 key ideas)",
          "medium": "Executive summary (5 key ideas)"
        }
      }
    }
  },

  "extraer-datos": {
    "slug": "extract-pdf-data",
    "name": "Extract data",
    "h1": "Extract Structured Data from PDF Documents",
    "tagline": "Automatically detect and extract emails, phone numbers, dates, and currency amounts.",
    "seoTitle": "Extract Structured Data from PDF Online for Free | JSON & CSV BreadPDF",
    "seoDescription": "Extract structured information like emails, amounts, dates, and phone numbers directly in JSON or CSV format.",
    "ctaLabel": "Extract fields",
    "keywords": [
      "extract pdf data",
      "invoice pdf extraction",
      "structured pdf data",
      "pdf to json"
    ],
    "howItWorks": [
      "Upload your PDF document, invoice, or form.",
      "Choose output format: JSON or CSV.",
      "Download clean structured data ready to import into databases or spreadsheets."
    ],
    "faq": [
      {
        "q": "What fields are detected automatically?",
        "a": "Email addresses, telephone numbers, dates in various notations, and monetary figures (EUR, USD)."
      }
    ],
    "options": {
      "format": {
        "label": "Export format",
        "choices": {
          "json": "Structured JSON (Recommended for developers)",
          "csv": "Delimited CSV (Recommended for spreadsheets)"
        }
      }
    }
  },

  "pdf-a-powerpoint": {
    "slug": "pdf-to-powerpoint",
    "name": "PDF to PowerPoint",
    "h1": "Convert PDF to PowerPoint Slides",
    "tagline": "Convert each page of your PDF into a .pptx slide in 16:9 widescreen format.",
    "seoTitle": "Convert PDF to PowerPoint (.pptx) Online for Free | BreadPDF",
    "seoDescription": "Transform PDF presentations into PowerPoint (.pptx) slides ready to present and edit in Microsoft PowerPoint or Google Slides.",
    "ctaLabel": "Convert to PowerPoint",
    "keywords": [
      "pdf to powerpoint",
      "pdf to pptx",
      "convert slides pdf"
    ],
    "howItWorks": [
      "Upload your PDF file.",
      "The engine generates high-definition vector widescreen slides.",
      "Download your presentation file (.pptx) ready to project."
    ],
    "faq": [
      {
        "q": "Is it compatible with PowerPoint and Google Slides?",
        "a": "Yes. It creates standard Office Open XML .pptx files with full application compatibility."
      }
    ]
  },

  "qr-pdf": {
    "slug": "qr-to-pdf",
    "name": "Generate QR to PDF",
    "h1": "Create QR Code for a PDF Online",
    "tagline": "Generate static high-resolution QR codes and download them formatted in print-ready PDF.",
    "seoTitle": "Create QR Code for PDF Online | BreadPDF",
    "seoDescription": "Generate static QR codes for links, menus, or text and download them in a print-ready A4 PDF or transparent PNG.",
    "ctaLabel": "Generate QR Code",
    "keywords": [
      "qr to pdf",
      "generate qr code pdf",
      "print qr code",
      "static qr code"
    ],
    "howItWorks": [
      "Enter the URL, text, or link you want to encode.",
      "Assign an optional title for the printed sheet.",
      "Download your A4-formatted PDF along with individual high-res PNG image."
    ],
    "faq": [
      {
        "q": "Does the QR code expire or require a subscription?",
        "a": "No. As a direct static QR code with no intermediary servers, it never expires and works permanently for free."
      }
    ],
    "options": {
      "text": {
        "label": "QR code content or URL",
        "placeholder": "https://your-site.com or text..."
      },
      "title": {
        "label": "Title on printed PDF sheet",
        "placeholder": "e.g. Restaurant Menu, Wi-Fi Network..."
      }
    }
  },

  "censurar-pdf": {
    "slug": "redact-pdf",
    "name": "Redact PDF",
    "h1": "Redact PDF and Black Out Confidential Data",
    "tagline": "Visually obscure text, names, IDs, or sensitive figures with permanent opaque blocks.",
    "seoTitle": "Redact PDF Online and Black Out Confidential Info | BreadPDF",
    "seoDescription": "Black out or white out confidential text, IDs, and figures in your PDF file with 100% browser-based privacy.",
    "ctaLabel": "Redact document",
    "keywords": [
      "redact pdf",
      "black out pdf",
      "hide confidential pdf data",
      "censor pdf"
    ],
    "howItWorks": [
      "Upload the PDF document containing confidential data.",
      "Enter words, IDs, names, or numbers to obscure separated by commas.",
      "Download your PDF with permanently overlaid redaction blocks."
    ],
    "faq": [
      {
        "q": "Can I choose the redaction block color?",
        "a": "Yes. You can select 'Black block' (the official legal redaction style) or 'White block' for subtle deletions."
      }
    ],
    "options": {
      "terms": {
        "label": "Words, names, or numbers to redact (comma-separated)",
        "placeholder": "e.g. Confidential, 12345678Z, Smith"
      },
      "color": {
        "label": "Redaction block color",
        "choices": {
          "black": "Black block (Official redaction standard)",
          "white": "White block (Clean deletion)"
        }
      }
    }
  },

  "recortar-pdf": {
    "slug": "crop-pdf",
    "name": "Crop PDF",
    "h1": "Crop PDF Page Margins",
    "tagline": "Trim excess blank margins and adjust the viewport frame across all pages.",
    "seoTitle": "Crop PDF Online Free: Trim Margins & Cut Pages | BreadPDF",
    "seoDescription": "Crop PDF pages online and trim white margins with millimeter precision. Adjust crop box for printing or e-readers with 100% private in-browser processing.",
    "ctaLabel": "Crop PDF",
    "keywords": [
      "crop pdf",
      "crop pdf online",
      "trim pdf margins",
      "remove white margins pdf",
      "cut pdf pages",
      "crop pdf free"
    ],
    "howItWorks": [
      "Upload the PDF you want to crop.",
      "Select margin millimeters to trim from the outer edges.",
      "Download the neatly framed PDF."
    ],
    "faq": [
      {
        "q": "Does cropping reduce font size or visual resolution?",
        "a": "No. The vector text and embedded images preserve their native crispness. The tool specifically updates the PDF standard CropBox boundary, concealing excess perimeter whitespace without compressing or rasterizing fonts."
      },
      {
        "q": "How is the crop margin calculated?",
        "a": "The slider lets you define the exact margin to trim in millimeters (from 5 mm up to 50 mm). This measurement is evenly subtracted from all four edges (top, bottom, left, and right) while maintaining a safe visible viewport."
      },
      {
        "q": "Is this tool suited for optimizing PDFs for e-readers (Kindle, Kobo)?",
        "a": "Yes. Trimming 15 mm to 25 mm of empty page borders is ideal for 6-inch and 7-inch e-ink screens, allowing body text to fill the display naturally without requiring manual zoom."
      },
      {
        "q": "Are all pages in the PDF cropped uniformly?",
        "a": "Yes. The selected margin boundary applies consistently across all pages in the document to produce an evenly framed, clean output."
      },
      {
        "q": "Are my files uploaded to external cloud servers?",
        "a": "No. All CropBox adjustments execute 100% locally in your browser memory via WebAssembly/pdf-lib. Your confidential documents never leave your computer."
      }
    ],
    "options": {
      "margin": {
        "label": "Margin to trim from edges"
      }
    }
  },

  "pdf-a-markdown": {
    "slug": "pdf-to-markdown",
    "name": "PDF to Markdown",
    "h1": "Convert PDF to Markdown (.md)",
    "tagline": "Transform your documents into clean structured Markdown for ChatGPT, Claude, and Notion.",
    "seoTitle": "Convert PDF to Markdown Online for Free (.md) | BreadPDF",
    "seoDescription": "Convert PDFs into structured Markdown files with headings, lists, and clean paragraphs ready for AI prompts or Obsidian notes.",
    "ctaLabel": "Convert to Markdown",
    "keywords": [
      "pdf to markdown",
      "pdf to md",
      "convert pdf obsidian",
      "pdf for chatgpt"
    ],
    "howItWorks": [
      "Upload your PDF file.",
      "The parser detects headings, lists, and paragraph hierarchies.",
      "Download your .md file ready for copy-pasting into your LLM or knowledge base."
    ],
    "faq": [
      {
        "q": "Is this ideal for AI prompts?",
        "a": "Yes. Markdown provides optimal context structure for ChatGPT, Claude, or Gemini without garbage characters."
      }
    ]
  },

  "pdf-a-pdfa": {
    "slug": "pdf-to-pdfa",
    "name": "PDF to PDF/A",
    "h1": "Convert PDF to PDF/A for Long-Term Archiving",
    "tagline": "Standardize your PDF under ISO 19005-1 for legal compliance and public administration filings.",
    "seoTitle": "Convert PDF to PDF/A Online for Free | ISO Standard BreadPDF",
    "seoDescription": "Transform your documents into the standard PDF/A long-term preservation format required by tax authorities, courts, and official filings.",
    "ctaLabel": "Convert to PDF/A",
    "keywords": [
      "pdf to pdfa",
      "convert pdf/a",
      "iso 19005-1",
      "archive pdf"
    ],
    "howItWorks": [
      "Upload the PDF file you need to submit or archive.",
      "The engine injects ISO metadata and neutralizes dynamic dependencies.",
      "Download your certified PDF/A document."
    ],
    "faq": [
      {
        "q": "Is it accepted by government and tax authorities?",
        "a": "Yes. It adheres to the closed-format and long-term archiving standards mandated by public administrations."
      }
    ]
  },

  "excel-a-pdf": {
    "slug": "excel-to-pdf",
    "name": "Excel to PDF",
    "h1": "Convert Excel to PDF Online for Free",
    "tagline": "Convert XLSX and XLS spreadsheets into print-ready landscape PDF tables.",
    "seoTitle": "Convert Excel to PDF Online for Free | BreadPDF",
    "seoDescription": "Convert your Excel spreadsheets (.xlsx, .xls) into organized, beautifully laid out PDF documents with 100% client-side privacy.",
    "ctaLabel": "Convert to PDF",
    "keywords": [
      "excel to pdf",
      "convert xlsx to pdf",
      "spreadsheet to pdf"
    ],
    "howItWorks": [
      "Upload your Excel workbook (.xlsx or .xls).",
      "The engine parses every sheet and formats tables in landscape A4 layout.",
      "Download your structured PDF document ready to share or print."
    ],
    "faq": [
      {
        "q": "Are multiple Excel sheets preserved?",
        "a": "Yes. Every worksheet tab is rendered with its respective title and tabular structure."
      }
    ]
  },

};


export default tools;
