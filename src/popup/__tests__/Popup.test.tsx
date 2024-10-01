import React from 'react';
import { render, screen } from '@testing-library/react';
import Popup from '../Popup';
import '../../__mocks__/chrome';

describe('Popup', () => {
	it('renders the title', () => {
		render(<Popup />);
		const titleElement = screen.getByText(/Filter URL Extension/i);
		expect(titleElement).toBeTruthy();
	});
});
