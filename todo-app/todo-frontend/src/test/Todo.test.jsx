import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Todo from './Todo'

describe('Todo Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test todo',
    done: false
  };
  
  const mockDelete = vi.fn();
  const mockComplete = vi.fn();

  test('renders todo text', () => {
    render(<Todo todo={mockTodo} onDelete={mockDelete} onComplete={mockComplete} />);
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<Todo todo={mockTodo} onDelete={mockDelete} onComplete={mockComplete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  test('calls onComplete when complete button is clicked', () => {
    render(<Todo todo={mockTodo} onDelete={mockDelete} onComplete={mockComplete} />);
    fireEvent.click(screen.getByText('Complete'));
    expect(mockComplete).toHaveBeenCalledWith(1);
  });

  test('shows line-through style when todo is done', () => {
    const doneTodo = { ...mockTodo, done: true };
    render(<Todo todo={doneTodo} onDelete={mockDelete} onComplete={mockComplete} />);
    const todoText = screen.getByText('Test todo');
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });
});