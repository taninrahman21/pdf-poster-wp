import { useState, Fragment } from "react";
import { Dropdown, ColorPicker, Button } from "@wordpress/components";

// import styles from "./styles.module.scss";

/**
 *
 * @props value: (String) --required
 * @props defaultColor: (String)
 * @props onChange: (Function) required
 * @props className: (String)
 * @props disableAlpha: (Boolean)
 * @props boxPosition: 'top left' (String)
 * return rgba color code
 */
const BColor = (props) => {
  const {
    value,
    title = "",
    defaultColor,
    onChange,
    // className,
    disableAlpha,
    boxPosition = "top left",
    globalColors = [],
  } = props;
  const [state, setState] = useState(value);
  return (
    <Dropdown
      position={boxPosition}
      renderToggle={({ isOpen, onToggle }) => {
        return (
          <div style={{ display: "flex" }}>
            {defaultColor && defaultColor != state && (
              <Button
                icon="image-rotate"
                className={"bColorReset"}
                onClick={() => {
                  onChange(defaultColor);
                  setState(defaultColor);
                }}
              />
            )}
            <div className={"BColorButtonContainer"}>
              <button className={"BColorButton"} title={title} onClick={onToggle} aria-expanded={isOpen} style={value ? { backgroundColor: value } : { backgroundColor: "transparent" }} />
            </div>
          </div>
        );
      }}
      renderContent={({ isOpen, onClose }) => (
        <Fragment>
          <ColorPicker
            color={value || ""}
            onChangeComplete={(c) => {
              onChange(`rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`);
              setState(c.hex);
            }}
            disableAlpha={disableAlpha ? disableAlpha : false}
          />
          {globalColors.length > 0 && (
            <div style={{ display: "flex" }} className="globalColors">
              {globalColors.map((color, index) => {
                return (
                  <div key={index} className={"BColorButtonContainer"}>
                    <button
                      className={"BColorButton"}
                      onClick={() => {
                        onChange(color.color);
                        setState(color);
                        onClose;
                      }}
                      aria-expanded={isOpen}
                      style={value ? { backgroundColor: color.color } : { backgroundColor: "transparent" }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </Fragment>
      )}
    />
  );
};

export default BColor;
