import React, { useState } from "react";

const AddItemForm: React.FC = () => {
  const URL = process.env.REACT_APP_API_URL;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !price) {
      setError("Please fill in all fields, including the image.");
      return;
    }

    const formData = new FormData();
    formData.append("item[name]", name);
    formData.append("item[description]", description);
    formData.append("item[price]", price.toString());
    if (image) formData.append("item[image]", image);

    try {
      const response = await fetch(`${URL}/items`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const data = await response.json();
      console.log("Item created:", data);

      setName("");
      setDescription("");
      setPrice(0);
      setImage(null);
      setSuccess("Item added successfully");
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
