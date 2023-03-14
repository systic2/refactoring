let defaultOwner = { firstName: "마틴", lastName: "파울러" };
// 얕은 복사
export function getDefaultOwner() {
  return { ...defaultOwner };
}
