import React, { useState, useRef } from 'react';
import  {FaArrowLeft}  from "react-icons/fa";


const MessageBubble = ({ content, isImage, isVideo,isDocument,fileExtension, fileSize,timestamp,replyContent }) => (
  
  <div className={`flex ${isImage ? 'justify-end' : ''}`}>
    <div
      className={`${
        isImage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
      } p-2 rounded-lg`}
    >
      {isImage ? <span className="w-4 h-4 inline-block mr-2"><FaArrowLeft /></span> : null}
      {isDocument && (
        <span className="w-4 h-4 inline-block mr-2"><FaArrowLeft /></span> // Add FontAwesome icon
      )}
      {content}
      {replyContent && (
        <div className="border-t border-gray-300 mt-2 pt-2">
          <p className="font-semibold">Reply:</p>
          <p>{replyContent}</p>
        </div>
      )}
      {/* {isDocument || isImage ||isVideo ? content.split('.')[0] : content} */}
      <div className="text-sm text-gray-400">
            {fileExtension} - {fileSize}
        </div>
        <div className="text-xs text-gray-400">{timestamp}</div>
    </div>
  </div>
);
// const InputField = ({ onSend }) => {
//   const [message, setMessage] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const sendMessage = () => {
//     if (message.trim() !== '' || selectedFile) {
//       onSend({ type: 'text', content: message });
//       setMessage('');
//       setSelectedFile(null);
//     }
//   };

//   const sendImage = () => {
//     if (selectedFile) {
//       onSend({ type: 'image', file: selectedFile });
//       setSelectedFile(null);
//     }
//   };

//   return (
//     <div className="flex">
//       <input
//         type="text"
//         value={message}
//         onChange={handleMessageChange}
//         className="flex-grow border rounded-l-lg p-2"
//         placeholder="Type a message..."
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="hidden"
//         ref={fileInputRef}
//       />
//       <button
//         className="bg-blue-500 text-white px-4 rounded-r-lg"
//         onClick={sendMessage}
//       >
//         Send
//       </button>
//       <button
//         className="bg-gray-300 text-gray-700 px-4 rounded-r-lg ml-2"
//         onClick={() => fileInputRef.current.click()}
//       >
//         Upload
//       </button>
//     </div>
//   );
// };

const InputField = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const documentInputRef = useRef(null);


  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);
  //   fileInputRef.current.value = ''; // Clear the input field value

  //   if (file) {
  //     onSend({ type: 'image', content: file.name }); // Send image filename as message
  //   }
  // };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);
  //   fileInputRef.current.value = '';

  //   if (file) {
  //     onSend({ type: 'image', content: file.name });
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    fileInputRef.current.value = null;
    if (file) {
      // onSend({
      //   type: file.type.includes('image') ? 'image' : 'video',
      //   content: file.name,
      // });
      const fileNameWithoutLastExtension = file.name
      .split('.')
      .slice(0, -1)
      .join('.'); // Remove last extension
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get current upload time in hh:mm format
      onSend({
        type: 'image',
        content: fileNameWithoutLastExtension,
        fileExtension: file.name.split('.').pop(),
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        timestamp: timestamp, // Pass current upload time
      });
    }
    else if (file) {
      const fileNameWithoutLastExtension = file.name
        .split('.')
        .slice(0, -1)
        .join('.'); // Rejoin the parts
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get current upload time in hh:mm format
      onSend({
        type: 'video',
        content: fileNameWithoutLastExtension,
        fileExtension: file.name.split('.').pop(),
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        timestamp: timestamp, // Pass current upload time
      });
    }
  };

  const handleDocumentChange = (e) => {
    const document = e.target.files[0];
    setSelectedDocument(document);
    documentInputRef.current.value = null;

    if (document) {
      const fileNameWithoutLastExtension = document.name
      .split('.')
      .slice(0, -1)
      .join('.'); // Remove last extension
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get current upload time in hh:mm format
      onSend({
        type: 'document',
        content: fileNameWithoutLastExtension,
        fileExtension: document.name.split('.').pop(), // Extract file extension
        fileSize: `${(document.size / 1024).toFixed(2)} KB`, // Convert size to KB
        timestamp: timestamp,
      });
    }
  };

  // const sendImage = () => {
  //   fileInputRef.current.click(); // Trigger file input
  // };

  const sendMessage = () => {
    if (message.trim() !== '' || selectedFile) {
      onSend({ type: 'text', content: message });
      setMessage('');
      setSelectedFile(null);
    }
  };

  const sendImage = () => {
    if (selectedFile) {
      onSend({ type: 'image', file: selectedFile });
      setMessage(''); // Clear message after sending image
      setSelectedFile(null);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent line break
      sendMessage(); // Call the send message function
    }
  };


  return (
    <div className="flex">
      {/* <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        className="flex-grow border rounded-l-lg p-2"
        placeholder="Type a message..."
      /> */}
       <textarea
        type="text"
        placeholder="Type your message..."
        onKeyDown={handleKeyPress}
        onChange={handleMessageChange} // Track input value
        value={message} // Set input value
        className="flex-grow border rounded-l-lg p-2"
      />
      
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleDocumentChange}
        className="hidden"
        ref={documentInputRef}
      />
      <button
        className="bg-blue-500 text-white px-4 rounded-r-lg"
        onClick={sendMessage}
      >
        Send
      </button>
      <button
        className="bg-gray-300 text-gray-700 px-4 rounded-r-lg ml-2"
        onClick={() => fileInputRef.current.click()}
      >
        Upload
      </button>
      <button
        className="bg-gray-300 text-gray-700 px-4 rounded-r-lg ml-2"
        onClick={() => documentInputRef.current.click()}
      >
        Upload Document
      </button>
    </div>

  );
};

const ReplyField = ({ onReply, messages }) => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(-1);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = () => {
    if (selectedMessageIndex !== -1 && replyContent.trim() !== '') {
      onReply(selectedMessageIndex, replyContent);
      setSelectedMessageIndex(-1);
      setReplyContent('');
    }
  };

  return (
    <div className="mt-4">
      <p className="font-semibold mb-2">Reply to Message:</p>
      <select
        value={selectedMessageIndex}
        onChange={(e) => setSelectedMessageIndex(Number(e.target.value))}
        className="border rounded px-2 py-1 mb-2"
      >
        <option value={-1}>Select a message</option>
        {messages.map((message, index) => (
          <option key={index} value={index}>
            {message.content}
          </option>
        ))}
      </select>
      <textarea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="Enter your reply..."
        className="border rounded w-full p-2"
      ></textarea>
      <button
        onClick={handleReplySubmit}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Reply
      </button>
    </div>
  );
};

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  const handleMessageSend = (message) => {
    setMessages([...messages, message]);
  };

  const handleReplySend = (originalMessageIndex, replyContent) => {
    const updatedMessages = [...messages];
    updatedMessages[originalMessageIndex].replyContent = replyContent;
    setMessages(updatedMessages);
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/4 p-4 bg-gray-200">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              content={message.content}
              isImage={message.type === 'image'}
              isVideo={message.type === 'video'}
              isDocument={message.type === 'document'}
              fileExtension={message.fileExtension} // Provide the file extension
              fileSize={message.fileSize}
              timestamp={message.timestamp} // Add timestamp
              replyContent={message.replyContent} // Pass replyContent
            />
          ))}
        </div>
        <InputField onSend={handleMessageSend} />
        <ReplyField onReply={handleReplySend} messages={messages} />
      </div>
    </div>
  );
};

export default ChatApp;
