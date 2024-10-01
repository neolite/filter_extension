import { fetchFilters, countRules } from '../utils/api';
import type { FilterResponse } from '../types';

chrome.runtime.onMessage.addListener((
  message: { type: string; urls: string },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: FilterResponse) => void
) => {
  if (message.type === 'FETCH_FILTERS') {
    const urls = message.urls.split(',').map((url: string) => url.trim());
    
    Promise.all(urls.map(fetchFilters))
      .then(filterContents => {
        const totalCounts = filterContents.reduce(
          (acc, content) => {
            const counts = countRules(content);
            return {
              document: acc.document + counts.document,
              subdocument: acc.subdocument + counts.subdocument,
            };
          },
          { document: 0, subdocument: 0 }
        );

        const result = {
          totalRules: totalCounts.document + totalCounts.subdocument,
          documentRules: totalCounts.document,
          subdocumentRules: totalCounts.subdocument,
        };

        console.log('Filter analysis result:', result);
        sendResponse({filters: result});
      })
      .catch((error) => {
        console.error('Error fetching filters:', error);
        sendResponse({ filters: null, error: error.message });
      });

    return true;
  }
});