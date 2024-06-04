// import { useState } from "react";

// function FileList() {
//   const [file, setFile] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleConvertToBase64 = () => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       const base64String = reader.result.split(",")[1];
//       // Gửi chuỗi base64String lên API
//     };
//   };

//   const handleDownloadPdf = async () => {
//     const response = await fetch("https://your-api-url.com", {
//       method: "POST",
//       body: JSON.stringify({
//         base64String: "your-base64-string-from-api",
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();
//     const binaryString = window.atob(data.base64String);
//     const bytes = new Uint8Array(binaryString.length);
//     for (let i = 0; i < binaryString.length; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }
//     const blob = new Blob([bytes], { type: "application/pdf" });
//     const pdfUrl = URL.createObjectURL(blob);
//     setPdfUrl(pdfUrl);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleConvertToBase64}>Convert to Base64</button>
//       {pdfUrl && (
//         <div>
//           <a href={pdfUrl} download="file.pdf">
//             Download PDF
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FileList;
