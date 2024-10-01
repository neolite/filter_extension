export interface Filter {
	totalRules: number;
	documentRules: number;
	subdocumentRules: number;
}

export interface FilterResponse {
	filters: Filter | null;
	error?: string;
}
