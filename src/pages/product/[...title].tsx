import * as React from "react";
import {
  Layout,
  Row,
  Col,
  Breadcrumb,
  Typography,
  Space,
  Divider,
  Radio,
  Button,
  InputNumber,
  message,
} from "antd";
import { useWindowWidth } from "@react-hook/window-size";

import { ProductResource } from "./../../repositories/";
import Carrousel from "./../../components/Carrousel";
import { Product, ProductVariant } from "./../../types/Products";
import "./../../css/antd-theme.css";

const { Content } = Layout;

const IndexPage = ({ params: { title } }: any) => {

  const width = useWindowWidth();
  const [product, setProduct] = React.useState<Product>();
  const [productVariant, setProductVariant] = React.useState<ProductVariant>();
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleAddToCart = () => {
    message.success(`${productVariant?.name || ''} Added to Cart`);
  };
  const handleAddFavorite = () => {
    message.info(`${productVariant?.name || ''}Added to Favorite`);
  };
  const handleChangeColor = ( event: any ) => {
    const { value }  = event.target ;
    product?.variants.map((variant: ProductVariant) => {
      if(
        variant.option1 === value && 
        variant.option2 === productVariant?.option2 || ''
      ){
        setProductVariant(variant)
      }
    })
  };
  const handleChangeSize = ( event: any ) => {
    const { value }  = event.target ;
    product?.variants.map((variant: ProductVariant) => {
      if(
        variant.option2 === value && 
        variant.option1 === productVariant?.option1 || ''
      ){
        setProductVariant(variant)
      }
    })
  };

  React.useEffect(() => {
    ProductResource.getOne(title || "free-trainer-3-mmw.js")
      .then(({ data }) => {
        setProduct(data);
        setProductVariant(data.variants[0]);
      })
      .catch((err) => {
        // QUEUE ERROR ALERT - TODO
        message.error(`Error Loading, refresh page`);
      });
  }, []);

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 5%", background: "white" }}>
        {/* Breadcrumb */}
        {width > 768 ? (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
            <Breadcrumb.Item>{product?.title}</Breadcrumb.Item>
          </Breadcrumb>
        ) : (
          <div style={{ marginBottom: "10%" }}></div>
        )}

        <Row>
          {/* Left Side  Carrousel*/}
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
            <Carrousel images={product?.images || [""]}></Carrousel>
          </Col>

          {/* Right Side */}
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
            <Space direction="vertical">

              {/* Title & Vendor */}
              <Typography.Text type="secondary">
                {product?.vendor}
              </Typography.Text>
              <Typography.Title level={2}>{product?.title}</Typography.Title>

              {/* Prices  */}
              <Space>
                <Typography.Title level={3}>
                  {`$ ${( productVariant?.price || 100) / 100}.00`}
                </Typography.Title>

                <Typography.Title level={4} type="secondary">
                  {`$ ${(product?.price_max || 100) / 100}.00`}
                </Typography.Title>
              </Space>
              <Divider />

              {/* Color */}
              <Space>
                <Typography.Text type="secondary">Color: </Typography.Text>
                <Radio.Group defaultValue={1} onChange={handleChangeColor} value={productVariant?.option1 || ''}>
                  {product?.options
                    .find((o) => o.name === "Color")
                    ?.values.map((value, i) => (
                      <Radio value={value} key={i}>
                        {value}
                      </Radio>
                    ))}
                </Radio.Group>
              </Space>
              <Divider />

              {/* Size */}
              <Space align="start">
                <Typography.Text type="secondary">Size: </Typography.Text>
                <Radio.Group onChange={handleChangeSize} value={productVariant?.option2 || ''}>
                  {product?.options
                    .find((o) => o.name === "Size")
                    ?.values.map((value, i) => (
                      <Radio.Button
                        value={value}
                        key={i}
                        style={{
                          margin: "0px 5px 5px 0px",
                          border: "2px solid rgba(3, 0, 1, 0.40)",
                          backgroundColor: "rgba(3, 0, 1, 0.01)",
                        }}
                      >
                        {value}
                      </Radio.Button>
                    ))}
                </Radio.Group>
              </Space>
              <Divider />

              {/* Quantity */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Space size={1}>
                  <Button
                    onClick={() => setQuantity(quantity < 2 ? 1 : quantity - 1)}
                  >
                    -
                  </Button>
                  <InputNumber
                    min={1}
                    value={quantity}
                    style={{ width: "65px" }}
                    onChange={setQuantity}
                  />
                  <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                </Space>

                <Space>
                  <Typography.Title type="secondary" level={4}>
                    Total Price:
                  </Typography.Title>
                  <Typography.Title level={4}>
                    $ {(quantity * ( productVariant?.price || 1)) / 100}
                  </Typography.Title>
                </Space>
              </div>

              {/* Add Favorite & Add to Cart Buttons  */}
              <Divider />
              <Row gutter={[16, 12]}>
                <Col xs={24} lg={12}>
                  <Button size="large" block onClick={handleAddFavorite}>
                    Add To Favorite
                  </Button>
                </Col>
                <Col xs={24} lg={12}>
                  <Button
                    size="large"
                    type="primary"
                    onClick={handleAddToCart}
                    style={{
                      backgroundColor: "#000002",
                      borderColor: "#000002",
                    }}
                    block
                  >
                    Add To Cart
                  </Button>
                </Col>
              </Row>
              <Divider />

              {/* Description */}
              <Typography.Text>
                <p
                  dangerouslySetInnerHTML={{
                    __html: product?.description || "",
                  }}
                />
              </Typography.Text>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default IndexPage;
