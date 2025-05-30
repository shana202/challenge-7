import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogPostItem from '../components/BlogPostItem/BlogPostItem';

describe('BlogPostItem', () => {
  const mockPost = {
    id: '1',
    title: 'Test Blog Title',
    summary: 'This is a summary of the blog post.',
    date: '2023-01-01',
  };

  test('renders the blog title', () => {
    render(<BlogPostItem {...mockPost} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(mockPost.title);
  });

  test('renders the summary', () => {
    render(<BlogPostItem {...mockPost} />);
    expect(screen.getByText(mockPost.summary)).toBeInTheDocument();
  });

  test('renders the formatted date', () => {
    render(<BlogPostItem {...mockPost} />);
    expect(screen.getByText(/Published on/i)).toHaveTextContent('January 1, 2023');
  });

  test('calls onSelect when title is clicked', () => {
    const onSelectMock = jest.fn();
    render(<BlogPostItem {...mockPost} onSelect={onSelectMock} />);

    const clickableTitleWrapper = screen.getByRole('heading', { level: 3 }).parentElement;
    fireEvent.click(clickableTitleWrapper);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(mockPost.id);
  });

  test('does not crash if onSelect is not provided', () => {
    render(<BlogPostItem {...mockPost} />);
    const clickableTitleWrapper = screen.getByRole('heading', { level: 3 }).parentElement;

    expect(() => fireEvent.click(clickableTitleWrapper)).not.toThrow();
  });
});
