import type { Filter, FilterResponse } from '../types';
import { countRules, fetchFilters } from '../utils/api';

chrome.runtime.onMessage.addListener(
	(
		message: { type: string; urls: string },
		sender: chrome.runtime.MessageSender,
		sendResponse: (response: FilterResponse) => void,
	) => {
		if (message.type === 'FETCH_FILTERS') {
			const urls = message.urls.split(',').map((url: string) => url.trim());

			Promise.all(urls.map(fetchFilters))
				.then((filterContents) => {
					const totalCounts = filterContents.reduce(
						(acc, content) => {
							const counts = countRules(content);
							return {
								document: acc.document + counts.document,
								subdocument: acc.subdocument + counts.subdocument,
							};
						},
						{ document: 0, subdocument: 0 },
					);

					const result = {
						totalRules: totalCounts.document + totalCounts.subdocument,
						documentRules: totalCounts.document,
						subdocumentRules: totalCounts.subdocument,
					};

					sendResponse({ filters: result as Filter });
				})
				.catch((error) => {
					console.error('Error fetching filters:', error);
					sendResponse({ filters: null, error: error.message });
				});

			return true;
		}
	},
);
