export const chrome = {
	storage: {
		local: {
			get: jest.fn((keys, callback) => {
				callback({});
			}),
			set: jest.fn(),
		},
	},
	runtime: {
		sendMessage: jest.fn(),
	},
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
(global as any).chrome = chrome;
