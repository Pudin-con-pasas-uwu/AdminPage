import { useRouter } from "next/router";
import { useState } from "react";

var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();
const fechaActual = (`${year}-${month}-${day}`);

const Addingcat = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    image: "example.jpg",
    creation_date: fechaActual,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(form),
      };
      const res = await fetch(
        "https://ecommerce-unid.000webhostapp.com/categories",
        options
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-container alabel">
          <label>Categorie Name:</label>
          <input placeholder="New Categorie" type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>
          <div className="container boton_añadir">
            <button type="submit" className="btn btn-danger" id="bottomSpace">Add</button>
            <button type="button" className="btn btn-dark" id="bottomSpace" onClick={() => router.back()}>Go back</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Addingcat;
