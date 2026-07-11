import React from 'react';
import AuriChatPanel from './AuriChatPanel';

// Full-page Auri route. Most interactions happen via the AuriSidebar, but
// the route remains available for focused chat sessions.
function AuriChat({ selectedProduct }) {
  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-fade-in">
      <AuriChatPanel selectedProduct={selectedProduct} />
    </div>
  );
}

export default AuriChat;
