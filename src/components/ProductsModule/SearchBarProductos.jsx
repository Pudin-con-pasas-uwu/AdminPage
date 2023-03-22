import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/SearchBarProducts.module.css';
import DetaillProducts from '../pages/ProductsModule/[id]';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://ecommerce-unid.000webhostapp.com/products?search=${query}`);
      const data = await response.json();
      const filteredProducts = data.rows.filter(product =>
        product.product_name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSelectedResultIndex(-1);
    router.push(`/ProductsModule/${product.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  useEffect(() => {
    if (query.length >= 1) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className={styles["search-bar-container"]}>
      <input class="form-control me-2" type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search for a detailed product" aria-label="Search"/>
      {results.length > 0 && (
        <ul className={styles["results-list"]}>
          {results.map((result, index) => (
            <li key={result.id} style={{ color: "black" }} onClick={() => handleProductSelect(result)} onMouseOver={() => setSelectedResultIndex(index)} className={selectedResultIndex === index ? styles["selected-result"] : ""}>
              {result.product_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
