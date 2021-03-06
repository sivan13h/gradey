import React, { useContext, useState } from "react";
import { Layout, Button, Modal, Spin } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import AddGradeForm from "../../components/AddGradeForm/AddGradeForm";
import EditGradesForm from "../../components/EditGradesForm/EditGradesForm";
import { GradesContext } from "../../context/GradesContext";

import Sidebar from "../../components/Sidebar/Sidebar";
import MainContent from "../../components/MainContent/MainContent";

import "./HomePage.styles.scss";

const { Header, Sider } = Layout;

function HomePage() {
  const { grades } = useContext(GradesContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleClick = (e) => {
    if (e.target.innerText === "Add new grade") {
      setClickedEdit(false);
      showModal();
    } else {
      setClickedEdit(true);
      showModal();
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      {grades.length > 0 ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            breakpoint="md"
            collapsedWidth="0"
          >
            <Sidebar grades={grades} />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <Button
                className="add-button"
                type="primary"
                name="add"
                onClick={handleClick}
                icon={<PlusOutlined />}
              >
                Add new grade
              </Button>
              <Button
                type="secondary"
                onClick={handleClick}
                name="edit"
                icon={<EditOutlined />}
              >
                Edit grades
              </Button>
            </Header>
            <MainContent
              isModalVisible={isModalVisible}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
            <Modal
              title={clickedEdit ? "Edit grade" : "Add grade"}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {!clickedEdit ? <AddGradeForm /> : <EditGradesForm />}
            </Modal>
          </Layout>
        </Layout>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "46%",
            left: "46%",
            textAlign: "center",
          }}
        >
          <Spin size="large" style={{ marginBottom: "1rem" }} />
          <h3>Loading...</h3>
        </div>
      )}
    </>
  );
}

export default HomePage;
