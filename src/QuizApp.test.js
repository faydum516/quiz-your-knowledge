import { render, screen } from '@testing-library/react';
import QuizApp from './QuizApp';

test('renders learn react link', () => {
  render(<QuizApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
