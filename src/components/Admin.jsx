import styles from "./Admin.module.css";
import { Input } from "antd";
import { Button } from "antd";
const { TextArea } = Input;
import { Radio } from "antd";
import { useState } from "react";
import { Select, Space, message, Upload } from "antd";

const options = [
  {
    label: "افزودن دسته بندی",
    value: "addCategory",
  },
  {
    label: "حذف دسته بندی",
    value: "removeCategory",
  },
];

const options2 = [
  {
    label: "افزودن ایتم",
    value: "addItem",
  },
  {
    label: "حذف ایتم",
    value: "removeItem",
  },
  {
    label: "ویرایش ایتم",
    value: "editItem",
  },
];

const Admin = () => {
  const [value1, setValue1] = useState("addCategory");
  const [value2, setValue2] = useState("addItem");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };

  const onChange2 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue2(value);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <div className={styles.container}>
        <h4>توضیحات</h4>
        <TextArea row={4} placeholder="توضیحات" />
        <div className={styles.btnLeft}>
          <Button className={styles.AdminBtn}>تغییر توضیحات</Button>
        </div>
        <h4>دسته بندی</h4>
        <div>
          <Radio.Group
            options={options}
            onChange={onChange1}
            value={value1}
            optionType="button"
          />
        </div>
        {value1 === "addCategory" ? (
          <div>
            <h5>نام دسته بندی</h5>
            <Input placeholder="نام" />
            <Upload {...props}>
              <Button className={styles.AdminBtn}>انتخاب عکس</Button>
            </Upload>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
            >
              {uploading ? "Uploading" : "Start Upload"}
            </Button>
          </div>
        ) : (
          <div>
            <p>انتخاب دسته بندی</p>
            <Select
              defaultValue="lucy"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
              ]}
            />
            <Button>حذف</Button>
          </div>
        )}
        <div>
          <h4>آیتم</h4>
          <p>انتخاب دسته بندی</p>
          <Select
            defaultValue="lucy"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
            ]}
          />
          <Radio.Group
            options={options2}
            onChange={onChange2}
            value={value2}
            optionType="button"
          />
          <div>
            {value2 === "addItem" ? (
              <div>
                <h5>نام آیتم</h5>
                <Input placeholder="نام" />
                <h5>توضیحات</h5>
                <Input placeholder="توضیحات" />
                <h5>قیمت</h5>
                <Input placeholder="تومان" />
              </div>
            ) : value2 === "editItem" ? (
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                ]}
              />
            ) : (
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
