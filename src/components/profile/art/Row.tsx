import "./row.scss";
import Pixel from "./Pixel";

export default function Row(props: { width: any; selectedColor: any; }) {
  const { width, selectedColor } = props;

  let pixels = [];

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} selectedColor={selectedColor} />);
  }

  return <div className="row">{pixels}</div>;
}
