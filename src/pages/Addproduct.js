import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Spin, Upload } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import {
    createDocOfCollection,
    getAllDocFromCollection,
    getDocFromCollection,
    updateDocOFCollection
} from "../actions/CommonAction";
import { toast } from "react-toastify";
import customAlerts from "../alerts";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { array, object, string } from "yup";

const { Dragger } = Upload;

const Addproduct = () => {

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    let { id } = useParams()

    useEffect(() => {
        if (id) getAndSetValues()
    }, [id]);

    const productSchemaTemplate = ()=>{

    }

    Object.keys(form).map((item) => {
        productSchemaTemplate[item] = string(item + "this Field is required").required(
          item + "this Field is required"
        );
    })

    let productSchema = object({
      ...productSchemaTemplate
    });

    const getAndSetValues = () => {
        setLoading(true)
        getDocFromCollection("department", id)
          .then((data) => {
            console.log(data, "rrrrrr");
            setForm(Object.fromEntries(Object.entries(data).reverse()));
          })
          .finally(() => {
            setLoading(false);
          });

    }
    const valueChangeHandler = (event) => {
        let { name, value } = event.target
        setForm({ ...form, [name]: value })
    }

    const onClickProductHandler = () => {
        setLoading(true)
        if (id) {
            productSchema
              .validate(form, { abortEarly: false })
              .then(() => {
                updateDocOFCollection("department", id, { ...form })
                  .then(() => {
                    toast.success("Updated successfully", {
                      position: toast.POSITION.BOTTOM_CENTER,
                    });
                  })
                  .catch(() => {
                    toast.error("Updated fails", {
                      position: toast.POSITION.BOTTOM_CENTER,
                    });
                  })
                  .finally(() => {
                    setLoading(false);
                  });

                setLoading(false);
              })
              .catch((errors) => {
                setLoading(false);
                console.log(errors, "errors");
                for (let error of errors.inner) {
                  toast.error(error?.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                  });
                }
              });
        }
    }

    const formMarkup = Object.keys(form).map((item) => (
        <CustomInput
          onChng={valueChangeHandler}
          type="text"
          label={item}
          name={item}
          value={form[item]}
        />
    ));

    return (
      <div>
        <h3 className="mb-4 title">{id}</h3>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center "
            style={{ minHeight: "70vh" }}
          >
            <Spin style={{ minHeight: "100%", width: "100%" }} />
          </div>
        ) : (
          <div>
            <div>{formMarkup}</div>
            <div className="d-flex gap-3 flex-column">
              <button
                onClick={onClickProductHandler}
                className="btn btn-success border-0 rounded-3 my-5"
              >
                { "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
};

export default Addproduct;