import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import s from "../styles/create.module.css";
import { useNavigate } from "react-router-dom";
import create from "../images/create.webp";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../redux/actions";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themes = useSelector((state) => state.articlesReducers.themes);
  const[submited, setSubmited]=useState(false)
  useEffect(()=>{
  if (submited===true) {
    window.location.reload();
  }
     

  },[submited])


  const handleChange = (e, field, minRange, maxRange, validationType) => {
    const imageUrlRegex =
      /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;
    const { value } = e.target;
    let error = null;

    if (validationType === "range" && value.length < minRange) {
      error = {
        type: "minRange",
        message: `${field} must have at least ${minRange} characters`,
      };
    }
    if (validationType === "range" && value.length > maxRange) {
      error = {
        type: "maxRange",
        message: `${field} must have at least ${maxRange} characters`,
      };
    }
    if (validationType === "textRange" && value.length < minRange) {
      error = {
        type: "minRange",
        message: `${field} must have at least ${minRange} characters`,
      };
    }
    if (validationType === "textRange" && value.length > maxRange) {
      error = {
        type: "maxRange",
        message: `${field} must have at least ${maxRange} characters`,
      };
    }
    if (validationType === "imageUrl" && value.length === 0) {
      error = {
        type: "imageUrl",
        message: `You must enter an ${field}`,
      };
    }
    if (validationType === "imageUrl" && !value.match(imageUrlRegex)) {
      error = {
        type: "imageUrl",
        message: `${field} is not a valid image url`,
      };
    }
    if (validationType === "required" && value.length === 0) {
      error = {
        type: "required",
        message: `You must select a ${field}`,
      };
    }
    setError(field, error);
  };

  const handleBack = () => {
    navigate("/articles");
    window.scrollTo(0, { behavior: "smooth" });
  };

  function onSubmit(data) {
    console.log(data);
    if (!data.title || !data.text || !data.image) {
      Swal.fire({
        title: "All fields are required",
        icon: "error",
      });
      return;
    }
    if (!data.theme) {
      Swal.fire({
        title: "You must select a theme",
        icon: "error",
      });
      return;
    }
    if (
      errors.title?.message ||
      errors.text?.message ||
      errors.image?.message
    ) {
      Swal.fire({
        title: "Check your fields",
        icon: "error",
      });
      return;
    }
    if (
      !data.image.match(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim)
    ) {
      Swal.fire({
        title: "Enter a valid url image",
        icon: "error",
      });
      return;
    }
    Swal.fire({
      title: "Are you sure you want to create this article?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(createArticle(data));
        setSubmited(!submited)
        Swal.fire("Saved!", "", "success");
      }
    
    });


  }

  return (
    <div className={s.container}>
      <div className={s.button_container}>
        <button onClick={handleBack} className={s.back}>
          <IoIosArrowBack />
        </button>
      </div>
      <div className={s.wraper}>
        <div
          className={s.left}
          style={{ backgroundImage: `url(${create})` }}
        ></div>
        <div className={s.right}>
          <form action="" className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <h4>Create article</h4>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100%" },
              }}
              autoComplete="on"
            >
              <TextField
                inputProps={{
                  ...register("title", {
                    required: true,
                  }),
                  onChange: (e) => handleChange(e, "title", 4, 45, "range"),
                }}
                autoComplete="on"
                id="filled-textarea"
                label="Title"
                placeholder="Title"
                error={errors.title?.message ? true : false}
                helperText={errors.title && errors.title.message}
              />
              <TextField
                inputProps={{
                  ...register("text", {
                    required: true,
                  }),
                  onChange: (e) =>
                    handleChange(e, "text", 255, 10000, "textRange"),
                }}
                autoComplete="on"
                id="outlined-multiline-static"
                label="Content"
                multiline
                rows={2}
                placeholder="Content"
                error={errors.text?.message ? true : false}
                helperText={errors.text && errors.text.message}
              />
              <TextField
                inputProps={{
                  ...register("image", {
                    required: true,
                  }),
                  onChange: (e) =>
                    handleChange(e, "image", 255, 10000, "imageUrl"),
                }}
                autoComplete="on"
                id="filled-textarea"
                label="Image URL"
                placeholder="Image URL"
                error={errors.image?.message ? true : false}
                helperText={errors.image && errors.image.message}
              />
              <select name="" id="" className={s.select} {...register("theme")}>
                
                      
                {themes &&
                  themes.map((t) => (
                    <option
                      key={t?.idTheme}
                      value={t?.theme}
                      className={s.categories}
                    >
                      {t?.theme}
                    </option>
                  ))}
              </select>
            </Box>
            <input type="submit" value="submit" className={s.create_btn} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
