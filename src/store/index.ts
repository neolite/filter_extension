import { useState, useEffect } from 'react';

export interface FilterResult {
	totalRules: number;
	documentRules: number;
	subdocumentRules: number;
}

export function useStore() {
	const [filterUrls, setFilterUrls] = useState('');
	const [filterResult, setFilterResult] = useState<FilterResult | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		chrome.storage.local.get(['filterUrls', 'filterResult'], (result) => {
			if (result.filterUrls) setFilterUrls(result.filterUrls);
			if (result.filterResult) setFilterResult(result.filterResult);
		});
	}, []);

	const saveToStorage = (urls: string, result: FilterResult | null) => {
		chrome.storage.local.set({
			filterUrls: urls,
			filterResult: result,
		});
	};

	return {
		filterUrls,
		setFilterUrls: (urls: string) => {
			setFilterUrls(urls);
			saveToStorage(urls, filterResult);
		},
		filterResult,
		setFilterResult: (result: FilterResult) => {
			setFilterResult(result);
			saveToStorage(filterUrls, result);
		},
		isLoading,
		setIsLoading,
	};
}
