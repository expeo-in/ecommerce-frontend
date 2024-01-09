import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { ProductCreate } from "../models/Product";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "./auth-store";
import httpClient from "../services/api-client";

const ProductForm = () => {
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProductCreate>();
  const [status, setStatus] = useState("");
  const [error, setError] = useState<any>();
  const navigate = useNavigate();

  const submitForm = (data: FieldValues) => {
    data.id = 0;

    var formData = new FormData();
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("qty", data.qty);
    formData.append("price", data.price);
    formData.append("isActive", data.isActive);
    formData.append("image", data.image[0]);

    httpClient
      .post("api/products", formData, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        setStatus("Product saved successfully");
        reset();
        //navigate("/products");
      })
      .catch((err: any) => {
        setError(err);
      });
  };

  console.log(user);
  if (user.role != "admin") return <p>Access Denied</p>;

  return (
    <>
      <h2>Product Form</h2>
      {status && (
        <div className="alert alert-primary" role="alert">
          {status}
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
      <form className="col-12 col-md-6" onSubmit={handleSubmit(submitForm)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            {...register("name", { required: true, maxLength: 100 })}
          />
          {errors.name?.type === "required" && (
            <div className="text-danger">Name is required</div>
          )}
          {errors.name?.type === "maxLength" && (
            <div className="text-danger">Maximum length is 100 chars</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            {...register("description", { required: true, maxLength: 250 })}
          ></textarea>
          {errors.description?.type === "required" && (
            <div className="text-danger">Description is required</div>
          )}
          {errors.description?.type === "maxLength" && (
            <div className="text-danger">Maximum length is 250 chars</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="qty" className="form-label">
            Qty
          </label>
          <input
            type="number"
            className="form-control"
            id="qty"
            {...register("qty", { required: true, maxLength: 5 })}
          />
          {errors.qty?.type === "required" && (
            <div className="text-danger">Quantity is required</div>
          )}
          {errors.qty?.type === "maxLength" && (
            <div className="text-danger">Maximum length is 5 chars</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", { required: true, maxLength: 10 })}
          />
          {errors.price?.type === "required" && (
            <div className="text-danger">Price is required</div>
          )}
          {errors.price?.type === "maxLength" && (
            <div className="text-danger">Maximum length is 10 chars</div>
          )}
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="active"
            {...register("isActive")}
          />
          <label className="form-check-label" htmlFor="active">
            Active
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            className="form-control"
            type="file"
            id="image"
            {...register("image")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        <Link to="/admin/products">Back to Products</Link>
      </div>
    </>
  );
};

export default ProductForm;
