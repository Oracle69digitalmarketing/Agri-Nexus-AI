/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { render, screen } from '@testing-library/react';
import Multichannel from '../Multichannel';

describe('Multichannel Component', () => {
  test('renders the main heading', () => {
    render(<Multichannel />);
    expect(screen.getByText('Multichannel Support')).toBeInTheDocument();
  });

  test('renders the WhatsApp channel information', () => {
    render(<Multichannel />);
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('+123-456-7890')).toBeInTheDocument();
  });

  test('renders the SMS channel information', () => {
    render(<Multichannel />);
    expect(screen.getByText('SMS')).toBeInTheDocument();
    expect(screen.getByText('555-0123')).toBeInTheDocument();
  });

  test('renders the Voice channel information', () => {
    render(<Multichannel />);
    expect(screen.getByText('Voice')).toBeInTheDocument();
    expect(screen.getByText('+123-456-7891')).toBeInTheDocument();
  });

  test('renders the disclaimer text', () => {
    render(<Multichannel />);
    expect(screen.getByText(/standard messaging and call rates may apply/i)).toBeInTheDocument();
  });
});
