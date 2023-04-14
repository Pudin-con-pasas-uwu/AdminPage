import Link from "next/link"; 
import React, { useState, useEffect } from 'react';
import axios from "axios";

const CategorySelect = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://ecommerce-unid.000webhostapp.com/products')
      .then(response => {
        setCategories(response.data.rows);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

return (
    <>
        <div className='col-md-4'>
            <label for="formFile" class="form-label" >Select category</label>
            <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">category</label>
                    <select class="form-select" id="inputGroupSelect01" >
                    {categories.map(category => (
                    <option selected key={category.id}>
                      {category.category_id.toString() === '1' ? 'Furyuu' : 
                      category.category_id.toString() === '2' ? 'Nendoroid' :
                      category.category_id.toString() === '3' ? 'Good Smile Company' :
                      category.category_id.toString() === '4' ? 'POP UP PARADE' :
                      category.category_id.toString() === '5' ? 'Taito' :
                      category.category_id.toString() === '6' ? 'Banpresto' :
                      category.category_id.toString() === '7' ? 'Mangas' : 
                      category.category_id.toString() === '8' ? 'Funko' : ''}
                    </option>
                    ))}
                    </select>
            </div>
        </div>

    </>
  );
};

export default CategorySelect;
