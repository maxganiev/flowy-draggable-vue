export const calcSvgLinesZoom = (
  /**@type {String} */ svgClassName,
  /**@type {String | Number} */ currentScaleValue
) => {
  debugger;
  [...document.getElementsByClassName(svgClassName)].forEach((svg) => {
    const zoom =
      currentScaleValue == 1 ? "unset" : "1." + (1 - currentScaleValue).toString().split(".")[1];
    svg.style.zoom = zoom;
    svg.style.transform = `scale(${zoom})`;
  });
};
