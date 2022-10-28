import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdf from './diseno.pdf';
const PdfViewer=()=>{
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess=({ numPages })=> {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={'./diseno.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PdfViewer;