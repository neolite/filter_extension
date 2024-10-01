import React from 'react';
import { useEffect, useState } from 'react';
import type { Filter, FilterResponse } from '../types';

const Popup: React.FC = () => {
	const [urls, setUrls] = useState('');
	const [result, setResult] = useState<Filter | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		chrome?.storage?.local?.get(['filterUrls'], (result) => {
			if (result.filterUrls) {
				setUrls(result.filterUrls);
			}
		});
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		chrome.storage.local.set({ filterUrls: urls });

		chrome.runtime.sendMessage(
			{ type: 'FETCH_FILTERS', urls },
			(response: FilterResponse) => {
				setIsLoading(false);
				if (response.error) {
					setError(response.error);
				} else {
					setResult(response.filters);
				}
			},
		);
	};

	return (
		<div>
			<h1>Filter URL Extension</h1>
			<form onSubmit={handleSubmit}>
				<textarea
					value={urls}
					onChange={(e) => setUrls(e.target.value)}
					placeholder='Enter filter URLs, separated by commas'
					rows={5}
					cols={50}
				/>
				<button type='submit' disabled={isLoading}>
					{isLoading ? 'Analyzing...' : 'Analyze Filters'}
				</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{result && (
				<div>
					<h2>Results:</h2>
					<p>Total network rules: {result.totalRules}</p>
					<p>Document rules: {result.documentRules}</p>
					<p>Subdocument rules: {result.subdocumentRules}</p>
				</div>
			)}
		</div>
	);
};

export default Popup;
