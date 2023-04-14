import { useRouter } from "next/router";
import { useState } from "react";

const AddingCat = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    image: "",
    creation_date: new Date().toISOString().substring(0, 10),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      };
      const res = await fetch(
        "https://ecommerunid.sistemasdelcaribe.com/insert_categorie",
        options
      );
      const data = await res.json();
      console.log(data);
      // Aquí puedes agregar código para mostrar una notificación de éxito o redirigir al usuario a otra página.
    } catch (error) {
      console.log(error);
      // Aquí puedes agregar código para mostrar una notificación de error al usuario.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center"
        >
          <div className="form-container alabel text-center">
            <label>Category Name:</label>
            <input
              placeholder="New Category"
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-container alabel text-center">
            <label>Category Image:</label>
            <input
              placeholder="Image URL"
              type="text"
              name="image"
              className="form-control"
              value={form.image}
              onChange={handleChange}
              required
            />
          </div>
          <div className="container boton_añadir">
            <button type="submit" className="btn btn-danger" id="bottomSpace">
              {isLoading ? "Adding..." : "Add"}
            </button>
            <button
              type="button"
              className="btn btn-dark"
              id="bottomSpace"
              onClick={() => router.back()}
            >
              Go back
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddingCat;