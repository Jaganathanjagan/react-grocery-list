import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

// Set REACT_APP_API_URL in Netlify to your hosted API URL, ending in /items.
// Local development falls back to JSON Server on port 3500.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3500/items';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Could not load items (HTTP ${response.status})`);
        }
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setFetchError(`Could not connect to the API. Check that the API URL is configured and the server is running. ${err.message}`);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchItems();
    return () => controller.abort();
  }, []);

  const addItem = async (item) => {
    const trimmedItem = item.trim();
    if (!trimmedItem) return;

    const myNewItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      checked: false,
      item: trimmedItem
    };

    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myNewItem)
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result?.error) {
      setFetchError(result.error);
      return;
    }

    setItems((previousItems) => [...previousItems, result]);
    setFetchError(null);
  };

  const handleCheck = async (id) => {
    const currentItem = items.find((item) => String(item.id) === String(id));
    if (!currentItem) return;

    const updatedItem = { ...currentItem, checked: !currentItem.checked };
    const updateOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checked: updatedItem.checked })
    };

    const result = await apiRequest(`${API_URL}/${encodeURIComponent(id)}`, updateOptions);
    if (result?.error) {
      setFetchError(result.error);
      return;
    }

    setItems((previousItems) =>
      previousItems.map((item) =>
        String(item.id) === String(id) ? updatedItem : item
      )
    );
    setFetchError(null);
  };

  const handleDelete = async (id) => {
    const result = await apiRequest(
      `${API_URL}/${encodeURIComponent(id)}`,
      { method: 'DELETE' }
    );

    if (result?.error) {
      setFetchError(result.error);
      return;
    }

    setItems((previousItems) =>
      previousItems.filter((item) => String(item.id) !== String(id))
    );
    setFetchError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedItem = newItem.trim();
    if (!trimmedItem) return;
    addItem(trimmedItem);
    setNewItem('');
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: 'red' }}>Error: {fetchError}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
