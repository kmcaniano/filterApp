import { act, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;



test('loads page with all data', async () => {

  mockedAxios.get.mockResolvedValueOnce({
    data: [{
      firstName: 'Test',
      lastName: 'User',
      company: "ABC"
    },
    {
      firstName: 'Test',
      lastName: 'User2',
      company: "ABC"
    }]
  });

  render(<App />);

  await waitFor(() => {
    let rows = screen.getAllByTestId('user-rows');
    expect(rows.length).toBe(2);
  });

});