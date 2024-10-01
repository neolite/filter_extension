export async function fetchFilters(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  }
  
  export function countRules(filterContent: string): { document: number; subdocument: number } {
    const lines = filterContent.split('\n');
    const documentCount = lines.filter(line => line.includes('$document')).length;
    const subdocumentCount = lines.filter(line => line.includes('$subdocument')).length;
    return { document: documentCount, subdocument: subdocumentCount };
  }