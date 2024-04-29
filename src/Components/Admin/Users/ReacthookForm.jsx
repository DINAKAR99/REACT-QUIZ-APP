import React from "react";
import { useForm } from "react-hook-form";

export default function ReacthookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "sss", // Initial value for Name field
      "Employee Id": "", // Initial value for Employee Id field
      Password: "", // Initial value for Password field
      "Confirm Password": "", // Initial value for Confirm Password field
    },
  });
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          type="text"
          className={`form-control ${errors.Name ? "is-invalid" : ""}`}
          placeholder="Name"
          {...register("Name", { required: true })}
        />
        {errors.Name && (
          <div className="invalid-feedback">Name is required</div>
        )}
      </div>
      <div className="form-group">
        <input
          type="number"
          className={`form-control ${
            errors["Employee Id"] ? "is-invalid" : ""
          }`}
          placeholder="Employee Id"
          {...register("Employee Id", { required: true })}
        />
        {errors["Employee Id"] && (
          <div className="invalid-feedback">Employee Id is required</div>
        )}
      </div>
      <div className="form-group">
        <input
          type="password"
          className={`form-control ${errors.Password ? "is-invalid" : ""}`}
          placeholder="Password"
          {...register("Password", {
            required: true,
            minLength: 3,
          })}
        />
        {errors.Password && (
          <div className="invalid-feedback">
            Password must be at least 3 characters long
          </div>
        )}
      </div>
      <div className="form-group">
        <input
          type="password"
          className={`form-control ${
            errors["Confirm Password"] ? "is-invalid" : ""
          }`}
          placeholder="Confirm Password"
          {...register("Confirm Password", { required: true })}
        />
        {errors["Confirm Password"] && (
          <div className="invalid-feedback">Confirm Password is required</div>
        )}
      </div>
      <input type="submit" className="btn btn-primary" />
    </form>
  );
}
