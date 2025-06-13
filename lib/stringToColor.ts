function stringToColor(str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    // 5-bit shift keeps us in the 32-bit range and is the classic DJB2 variant
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

export default stringToColor;
