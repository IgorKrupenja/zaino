import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('Test', () => {
  beforeAll(() => {
    // @ts-ignore
    window.matchMedia = () => ({
      addListener: () => {},
      removeListener: () => {},
    });
  });

  test('renders description', () => {
    render(<App />);
    const linkElement = screen.getByText(
      /Hiking and mountaineering equipment app for the meticulous adventurer./i
    );
    expect(linkElement).toBeInTheDocument();
  });
});
