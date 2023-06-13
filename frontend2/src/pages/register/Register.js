import "./Register.css";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BsFillPersonDashFill,
  BsPersonVcard,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import InputMask from "react-input-mask";

const Register = () => {
  const navigateTo = useNavigate();

  const goToEmployees = () => {
    navigateTo("/employees");
  };
  const goToCursos = () => {
    navigateTo("/cursos");
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  const initialValues = {
    name: "",
    cpf: "",
    email: "",
    address: "",
    phonenumber: "",
    birthday: "",
    admissiondate: "",
    asodate: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    cpf: Yup.string().required("O CPF é obrigatório"),
    email: Yup.string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    address: Yup.string().required("O endereço é obrigatório"),
    phonenumber: Yup.string().required("O telefone é obrigatório"),
    birthday: Yup.date().required("A data de nascimento é obrigatória"),
    admissiondate: Yup.date().required("A data de admissão é obrigatória"),
    asodate: Yup.date().required("A data de ASO é obrigatória"),
  });

  const onSubmit = (data) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
      return;
    }

    axios
      .post("https://vercel-backend-three.vercel.app/employeeinfo", data, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        console.log("IT WORKED");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="page">
      <div className="header">
        <h1 onClick={goToEmployees}>
          Sonda <br /> Engenharia
        </h1>
        <div className="sidebar">
          <div className="icons-sidebar">
            <BsFillPersonPlusFill />
            <BsFillPersonDashFill />
            <BsPersonVcard onClick={goToCursos} />
          </div>
        </div>
      </div>
      <div className="container">
        <h1> Cadastrar Funcionário</h1>
        <div className="createPostPage">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="formContainer">
              <div className="left-card">
                <Field name="name" placeholder="Nome completo">
                  {({ field }) => (
                    <InputMask
                      id="inputCreatePost"
                      {...field}
                      mask=""
                      maskChar=""
                    />
                  )}
                </Field>
                <ErrorMessage name="name" component="span" />

                <Field name="cpf" placeholder="CPF">
                  {({ field }) => (
                    <InputMask
                      id="inputCreatePost"
                      {...field}
                      mask="999.999.999-99"
                      type="text"
                      maskChar=""
                    />
                  )}
                </Field>
                <ErrorMessage name="cpf" component="span" />

                <Field name="email" placeholder="Email" />
                <ErrorMessage name="email" component="span" />

                <Field name="address" placeholder="Endereço" />
                <ErrorMessage name="address" component="span" />
              </div>

              <div className="right-card">
                <Field name="phonenumber" placeholder="Telefone">
                  {({ field }) => (
                    <InputMask
                      id="inputCreatePost"
                      {...field}
                      mask="(99) 99999-9999"
                      maskChar=""
                    />
                  )}
                </Field>
                <ErrorMessage name="phonenumber" component="span" />

                <Field
                  name="birthday"
                  placeholder="Data de nascimento"
                  type="date"
                />
                <ErrorMessage name="birthday" component="span" />

                <Field
                  name="admissiondate"
                  type="date"
                  placeholder="Data de admissão"
                />
                <ErrorMessage name="admissiondate" component="span" />

                <Field name="asodate" type="date" placeholder="Data de ASO" />
                <ErrorMessage name="asodate" component="span" />
              </div>
              <div className="baixo">
                <button type="submit" className="cadastrar">
                  Cadastrar
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
