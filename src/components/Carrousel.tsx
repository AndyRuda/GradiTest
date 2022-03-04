import * as React from "react";
import { Image, Row, Col, Radio } from "antd";
import { useWindowWidth } from "@react-hook/window-size";
import "./../css/animations.css"

type Carrousel = {
  images: string[];
};

const Carrousel = ({ images }: Carrousel) => {
  const width = useWindowWidth();
  const [nonSelectecImages, setNonSelectecImages] = React.useState<string[]>(
    []
  );
  const [selectecImage, setSelectecImage] = React.useState<string>("");

  React.useEffect(() => {
    setNonSelectecImages(
      nonSelectecImages.filter((image) => image !== selectecImage)
    );
  }, [selectecImage]);

  React.useEffect(() => {
    const allImages = images;
    setSelectecImage(allImages[0]);
    setNonSelectecImages(allImages.slice(1));
  }, [images]);

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          display: "flex",
          marginBottom: "5%",
        }}
      >
        <Image
          height={width > 768 ? "500px" : "330px"}
          style={{ width: "100%" }}
          preview={false}
          className="fadeIn"
          key={selectecImage}
          src={selectecImage}
          />
      </div>
      {width > 768 ? (
        <Row>
          {nonSelectecImages.map((image, i) => {
            return (
              <Col md={8} key={image + i}>
                <Image
                  key={image + i}
                  height={155}
                  preview={false}
                  onClick={() => {
                    setSelectecImage(image);
                    setNonSelectecImages([...nonSelectecImages, selectecImage]);
                  }}
                  src={image}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row style={{justifyContent: 'center'}}>
          <Radio.Group
            onChange={(e) => {
              setSelectecImage(e.target.value);
              setNonSelectecImages([...nonSelectecImages, selectecImage]);
            }}
            value={selectecImage}
          >
            {images.map((image, i) => (
              <Radio value={image} key={image + i}></Radio>
            ))}
          </Radio.Group>
        </Row>
      )}
    </React.Fragment>
  );
};

export default Carrousel;
