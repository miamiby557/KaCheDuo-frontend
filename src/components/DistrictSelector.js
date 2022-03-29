import React, {PureComponent} from "react";
import {Cascader} from "antd";
import {convertDistrictToArray} from "../lib/func.js";
import districts from "../lib/pca.js";

class DistrictSelector extends PureComponent {
  render() {
    const { placeholder = "行政区域", value, ...rest } = this.props;
    const selected =
      value && typeof value === "string"
        ? convertDistrictToArray(value)
        : value;
    return (
      <Cascader
        {...rest}
        placeholder={placeholder}
        options={districts}
        value={selected}
        changeOnSelect
        showSearch
      />
    );
  }
}

export default DistrictSelector;
