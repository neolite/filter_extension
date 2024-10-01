import React from 'react';
import { useStore, FilterResult } from '../store/index';

const Popup: React.FC = () => {
	const store = useStore();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		store.setIsLoading(true);

		chrome.runtime.sendMessage(
			{ type: 'FETCH_FILTERS', urls: store.filterUrls },
			(response: { error?: string; filters?: FilterResult }) => {
				store.setIsLoading(false);
				if (response.error) {
					console.error(response.error);
				} else if (response.filters) {
					store.setFilterResult(response.filters);
				}
			},
		);
	};

	return (
		<div>
			<h1>Filter URL Extension</h1>
			<form onSubmit={handleSubmit}>
				<textarea
					value={store.filterUrls}
					onChange={(e) => store.setFilterUrls(e.target.value)}
					placeholder='Enter filter URLs, separated by commas'
					rows={5}
					cols={50}
				/>
				<button type='submit' disabled={store.isLoading}>
					{store.isLoading ? 'Analyzing...' : 'Analyze Filters'}
				</button>
			</form>
			{store.filterResult && (
				<div>
					<h2>Results:</h2>
					<p>Total network rules: {store.filterResult.totalRules}</p>
					<p>Document rules: {store.filterResult.documentRules}</p>
					<p>Subdocument rules: {store.filterResult.subdocumentRules}</p>
				</div>
			)}
		</div>
	);
};

export default Popup;
